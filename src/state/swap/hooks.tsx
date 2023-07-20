import { Currency, SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import tryParseCurrencyAmount from 'lib/utils/tryParseCurrencyAmount'
import { ParsedQs } from 'qs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { TradeState } from 'state/routing/types'
import { TOKEN_SHORTHANDS } from 'config/constants/tokens'
import { useCurrency } from '../../hooks/Tokens'
import useENS from 'hooks/useENS'
import { isAddress } from '../../utils'
import { AppState } from '../index'
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'
import { SwapState } from './reducer'
import { useCurrencyBalances } from 'lib/hooks/useCurrencyBalance'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { useRouter } from 'next/router'
import { routingApi, useGetRoutesQuery } from '../routing/slice'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { Route } from '@lifi/sdk'
import BigNumber from 'bignumber.js'

export function useSwapState(): AppState['swap'] {
  return useAppSelector((state: AppState) => state.swap)
}

export function useSwapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void
  onSwitchTokens: () => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
} {
  const dispatch = useAppDispatch()
  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      dispatch(
        selectCurrency({
          field,
          currencyId: currency.isToken ? currency.address : currency.isNative ? 'ETH' : '',
        }),
      )
    },
    [dispatch],
  )

  const onSwitchTokens = useCallback(() => {
    dispatch(switchCurrencies())
  }, [dispatch])

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch],
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch],
  )

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
  }
}

const BAD_RECIPIENT_ADDRESSES: { [address: string]: true } = {
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f': true, // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a': true, // v2 router 01
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': true, // v2 router 02
}

// from the current swap inputs, compute the best trade and return it.
export const useDerivedSwapInfo = (): {
  currencies: { [field in Field]: Currency | null }
  currencyBalances: { [field in Field]?: string }
  inputError?: string
  routing: {
    routes: Route[]
    routingState: TradeState
    feeStructure: {
      fee: number
      tier: string
    }
  }
  allowedSlippage: number
} => {
  const { chainId, account } = useWeb3React()

  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyString },
    [Field.OUTPUT]: { currencyId: outputCurrencyString },
    recipient,
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyString)
  const outputCurrency = useCurrency(outputCurrencyString)
  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null

  const relevantTokenBalances = useCurrencyBalances(
    account ?? undefined,
    useMemo(() => [inputCurrency ?? undefined, outputCurrency ?? undefined], [inputCurrency, outputCurrency]),
  )

  //this should not be necessary if the only possible input is the from Token
  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = useMemo(
    () => tryParseCurrencyAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined),
    [inputCurrency, isExactIn, outputCurrency, typedValue],
  )

  const slippage = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })
  const slippageParsed = slippage / 10000

  const queryParams = getQueryParams(chainId, typedValue, inputCurrencyString, inputCurrency?.symbol, inputCurrency?.decimals, outputCurrencyString, outputCurrency?.symbol, slippageParsed, inputCurrency)

  const {
    isLoading,
    isFetching,
    isError,
    data,
  } = useGetRoutesQuery(
    queryParams ?? skipToken,
    //{ pollingInterval: AVERAGE_L1_BLOCK_TIME },
  )

  const error = relevantTokenBalances[0]?.toExact() && (new BigNumber(typedValue).gt(new BigNumber(relevantTokenBalances[0]?.toExact()))) ? 'Insufficient Balance' : ''

  const routingState = useMemo(() => {
    //return empty routes if something is missing
    if (!typedValue) {
      return {
        routingState: TradeState.INVALID,
        routes: [],
        feeStructure: {
          fee: 0,
          tier: '',
        },
      }
    }
    //return loading state if loading
    if ((isLoading || isFetching) && !isError) {
      return {
        routingState: TradeState.LOADING,
        routes: data?.routes ?? [],
        feeStructure: {
          fee: 0,
          tier: '',
        },
      }
    }
    if (isError || !data?.routes || data?.routes?.length === 0) {
      return {
        routingState: TradeState.NO_ROUTE_FOUND,
        routes: [],
        feeStructure: {
          fee: 0,
          tier: '',
        },
      }
    }
    return {
      routingState: TradeState.VALID,
      routes: data?.routes,
      feeStructure: data?.feeStructure,
    }
  }, [data?.feeStructure, data?.routes, isError, isFetching, isLoading, typedValue])

  return useMemo(
    () => ({
      currencies: {
        [Field.INPUT]: inputCurrency,
        [Field.OUTPUT]: outputCurrency,
      },
      currencyBalances: { [Field.INPUT]: relevantTokenBalances[0]?.toExact() },
      typedValue,
      inputError: error,
      routing: routingState,
      allowedSlippage: slippageParsed,
    }),
    [error, inputCurrency, outputCurrency, relevantTokenBalances, routingState, slippageParsed, typedValue],
  )
}

function parseCurrencyFromURLParameter(urlParam: ParsedQs[string]): string {
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam)
    if (valid) return valid
    const upper = urlParam.toUpperCase()
    if (upper === 'ETH') return 'ETH'
    if (upper in TOKEN_SHORTHANDS) return upper
  }
  return ''
}

function parseTokenAmountURLParameter(urlParam: any): string {
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : ''
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT
}

const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

function validatedRecipient(recipient: any): string | null {
  if (typeof recipient !== 'string') return null
  const address = isAddress(recipient)
  if (address) return address
  if (ENS_NAME_REGEX.test(recipient)) return recipient
  if (ADDRESS_REGEX.test(recipient)) return recipient
  return null
}

export function queryParametersToSwapState(parsedQs: any): SwapState {
  let inputCurrency = parsedQs?.inputcurrency ?? parsedQs?.inputCurrency ?? ''
  let outputCurrency = parsedQs?.outputcurrency ?? parsedQs?.outputCurrency ?? ''
  const typedValue = parseTokenAmountURLParameter(parsedQs.exactAmount)
  const independentField = parseIndependentFieldURLParameter(parsedQs.exactField)

  if (inputCurrency === '' && outputCurrency === '' && typedValue === '' && independentField === Field.INPUT) {
    // Defaults to having the native currency selected
    inputCurrency = 'ETH'
  } else if (inputCurrency === outputCurrency) {
    // clear output if identical
    outputCurrency = ''
  }

  const recipient = validatedRecipient(parsedQs.recipient)

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency === '' ? null : inputCurrency ?? null,
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency === '' ? null : outputCurrency ?? null,
    },
    typedValue,
    independentField,
    recipient,
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch(): SwapState {
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const { query } = useRouter()
  const bananaAddress = chainId ? BANANA_ADDRESSES[chainId] : undefined
  const parsedSwapState = useMemo(() => {
    return queryParametersToSwapState(query)
  }, [query])

  useEffect(() => {
    if (!chainId) return
    const inputCurrencyId = parsedSwapState[Field.INPUT].currencyId ?? 'eth'
    const outputCurrencyId = parsedSwapState[Field.OUTPUT].currencyId ?? bananaAddress

    dispatch(
      replaceSwapState({
        typedValue: parsedSwapState.typedValue,
        field: parsedSwapState.independentField,
        inputCurrencyId,
        outputCurrencyId,
        recipient: parsedSwapState.recipient,
      }),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId, parsedSwapState])

  return parsedSwapState
}

export const getQueryParams = (
  chainId: number | undefined,
  typedValue: string | undefined,
  inputCurrencyString: string | null,
  inputCurrencySymbol: string | undefined,
  inputCurrencyDecimals: number | undefined,
  outputCurrencyString: string | null,
  outputCurrencySymbol: string | undefined,
  slippageParsed: number | null,
  inputCurrency: Currency | null) => {
  //return null if any of the required params is missing
  if (!chainId
    || !typedValue
    || !inputCurrencyString
    || !inputCurrencySymbol
    || !inputCurrencyDecimals
    || !outputCurrencyString
    || !outputCurrencySymbol
    || !slippageParsed
    || !inputCurrency
  ) {
    return null
  } else {
    return {
      chainId,
      //improve this
      fromAmount: new BigNumber(typedValue).times(new BigNumber(10).pow(inputCurrency.decimals)).toFixed(0, BigNumber.ROUND_DOWN),
      fromTokenAddress: inputCurrencyString === 'ETH' ? '0x0000000000000000000000000000000000000000' : inputCurrencyString,
      fromTokenSymbol: inputCurrencySymbol,
      fromTokenDecimals: inputCurrencyDecimals,
      toTokenAddress: outputCurrencyString === 'ETH' ? '0x0000000000000000000000000000000000000000' : outputCurrencyString,
      toTokenSymbol: outputCurrencySymbol,
      slippage: slippageParsed,
    }
  }
}
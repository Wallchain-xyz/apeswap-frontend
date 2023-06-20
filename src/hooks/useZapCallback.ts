import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEffect, useMemo, useState } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { isAddress } from '../utils'
import isZero from '../utils/isZero'
import useTransactionDeadline from './useTransactionDeadline'
import { ZapType, ZapV1 } from '@ape.swap/v2-zap-sdk'
import { useWeb3React } from '@web3-react/core'
import useENS from './useENS'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { Percent, Token } from '@ape.swap/sdk-core'
import { useZapContract, useZapV2Contract } from './useContract'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from 'views/V2/AddLiquidityV2/components/Actions'
import { MergedZap } from 'state/zap/actions'
import { TransactionType } from 'state/transactions/types'
import { ADDRESS_THIS, LiquidityPool, NATIVE_ADDRESS, ZapBuilderFrom0xPath } from '@ape.swap/zap-tx-builder'
import { LPType } from '@ape.swap/apeswap-lists'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  contract: Contract
  parameters: any
}

interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall {
  call: SwapCall
  error: Error
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param bestZapOne trade to execute
 * @param bestZapTwo trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */

function useZapV1CallArguments(
  zap: MergedZap,
  zapType: ZapType,
  allowedSlippage: Percent = DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  stakingContractAddress?: string,
  maxPrice?: string,
  stakingPid?: string,
): SwapCall[] {
  const { account, chainId, provider } = useWeb3React()
  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()
  const contract: Contract | null = useZapContract()

  return useMemo(() => {
    if (
      !zap?.currencyIn?.currency ||
      !zap?.pairOut?.pair ||
      !recipient ||
      !provider ||
      !account ||
      !chainId ||
      !deadline
    )
      return []

    if (!contract) {
      return []
    }

    const swapMethods = []

    swapMethods.push(
      ZapV1.zapCallParameters(zap, {
        allowedSlippage: allowedSlippage,
        zapType: zapType,
        stakingContractAddress,
        recipient,
        deadline: deadline.toNumber(),
        maxPrice,
        stakingPid,
      }),
    )

    return swapMethods.map((parameters) => ({ parameters, contract }))
  }, [
    account,
    allowedSlippage,
    chainId,
    deadline,
    provider,
    recipient,
    contract,
    zap,
    stakingContractAddress,
    maxPrice,
    zapType,
    stakingPid,
  ])
}

function useZapV2CallArguments(
  zap: MergedZap,
  zapType: ZapType,
  allowedSlippage: Percent = DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  liquidityPool: LiquidityPool | string,
  stakingContractAddress?: string,
  maxPrice?: string,
  stakingPid?: string,
): SwapCall[] {
  const { account, chainId, provider } = useWeb3React()
  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()
  const contract: Contract | null = useZapV2Contract()

  const [swapMethods, setSwapMethods] = useState<SwapCall[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (
        !zap?.currencyIn?.currency ||
        !zap?.currencyOut1?.outputCurrency.address ||
        !zap?.currencyOut2?.outputCurrency.address ||
        !recipient ||
        !provider ||
        !account ||
        !chainId ||
        !deadline
      ) {
        console.log(zap)
        console.log('return []1')
        return []
      }
      if (!contract) {
        console.log('return []2')
        return []
      }

      console.log('start useZapV2CallArguments')
      const tempSwapMethods: any[] = []
      const { currencyIn, currencyOut1, currencyOut2 } = zap

      const zapBuilder = new ZapBuilderFrom0xPath(provider!, chainId!)
      const inputTokenAddress = (currencyIn.currency as Token).address
      const value = currencyIn.currency.isNative ? currencyIn.inputAmount.toString() : '0'

      //Zap to LP
      let lpRecipient = recipient
      if (zapType != ZapType.ZAP) {
        lpRecipient = ADDRESS_THIS
      }

      let token2 = currencyOut2?.outputCurrency.address
      let token1 = currencyOut1?.outputCurrency.address
      if (token2 < token1) {
        token2 = currencyOut1?.outputCurrency.address
        token1 = currencyOut2?.outputCurrency.address
      }

      const toLP = await zapBuilder.toLP(
        currencyIn.currency.isNative,
        inputTokenAddress,
        currencyIn.inputAmount.toString(),
        token1,
        token2,
        liquidityPool,
        lpRecipient,
      )

      let populatedTx = toLP.populatedTx

      //Zap to TBILL/BOND
      if (zapType == ZapType.ZAP_T_BILL) {
        if (!maxPrice) {
          console.error('Invalid max price')
        }
        if (!stakingContractAddress) {
          console.error('Invalid Staking Contract Address')
        }
        const toBill = await toLP.toBill({
          bill: stakingContractAddress!,
          inputAmount: 0,
          maxPrice: maxPrice!,
          recipient: recipient,
        })
        populatedTx = toBill.populatedTx
      }

      tempSwapMethods.push({ methodName: 'multicall', args: [populatedTx], value })
      setSwapMethods(tempSwapMethods.map((parameters) => ({ parameters, contract })))
    }
    fetchData()
  }, [
    account,
    allowedSlippage,
    chainId,
    deadline,
    provider,
    recipient,
    contract,
    zap,
    stakingContractAddress,
    maxPrice,
    zapType,
    stakingPid,
  ])
  return swapMethods
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useZapCallback(
  zap: MergedZap,
  zapType: ZapType,
  allowedSlippage: Percent = DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  liquidityPool: LiquidityPool | string,
  stakingContractAddress?: string,
  maxPrice?: string,
  poolPid?: string,
  lpType?: LPType,
  // TODO: Fix the any
): { state: SwapCallbackState; callback: any; error: string | null } {
  console.log('ALL ZAP INFO PLS WORK', liquidityPool, zap)
  const { account, chainId, provider } = useWeb3React()
  //TODO: Quick fix check for just gamma bonds
  const useZapV2: boolean = lpType === LPType.GAMMA
  let swapCalls: SwapCall[] = []
  if (useZapV2) {
    swapCalls = useZapV2CallArguments(
      zap,
      zapType,
      allowedSlippage,
      recipientAddressOrName,
      liquidityPool,
      stakingContractAddress,
      maxPrice,
      poolPid,
    )
  } else {
    swapCalls = useZapV1CallArguments(
      zap,
      zapType,
      allowedSlippage,
      recipientAddressOrName,
      stakingContractAddress,
      maxPrice,
      poolPid,
    )
  }
  console.log('swapCalls', swapCalls)

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  return useMemo(() => {
    if (!provider || !account || !chainId) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
      }
      return { state: SwapCallbackState.LOADING, callback: null, error: null }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onZap(): Promise<string> {
        const estimatedCalls = await Promise.all(
          swapCalls.map((call) => {
            const {
              parameters: { methodName, args, value },
              contract,
            } = call
            const options = !value || isZero(value) ? {} : { value }
            return contract.estimateGas[methodName](...args, options)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                }
              })
              .catch((gasError) => {
                console.error('Gas estimate failed, trying eth_call to extract error', call)

                return contract.callStatic[methodName](...args, options)
                  .then((result) => {
                    console.error('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                  })
                  .catch((callError) => {
                    console.error('Call threw error', call, callError)
                    const reason: string = callError.reason || callError.data?.message || callError.message
                    const errorMessage = `The transaction cannot succeed due to error: ${
                      `${reason}. This is probably an issue with one of the tokens you are zapping` ??
                      'Unknown error, check the logs'
                    }.`

                    return { call, error: new Error(errorMessage) }
                  })
              })
          }),
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        const successfulEstimation = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
        )

        if (!successfulEstimation) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
        }

        const {
          call: {
            contract,
            parameters: { methodName, args, value },
          },
          gasEstimate,
        } = successfulEstimation

        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...(value && !isZero(value) ? { value, from: account } : { from: account }),
        })
          .then((response: any) => {
            const inputSymbol = zap?.currencyIn?.currency?.symbol
            const outputSymbol = `${zap?.pairOut?.pair?.token0?.symbol} - ${zap?.pairOut?.pair?.token1?.symbol}`

            const base = `Zap ${inputSymbol} into ${outputSymbol}`
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? recipientAddressOrName
                      : recipientAddressOrName
                  }`
            addTransaction(response, { type: TransactionType.ZAP })
            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value)
              throw new Error(`Swap failed: ${error.message}`)
            }
          })
      },
      error: null,
    }
  }, [zap, provider, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction])
}

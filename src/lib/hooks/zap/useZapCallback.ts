import { Contract } from '@ethersproject/contracts'
import { useEffect, useMemo } from 'react'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import isZero from '../../../utils/isZero'
import useTransactionDeadline from '../../../hooks/useTransactionDeadline'
import { ZapType, ZapV1 } from '@ape.swap/v2-zap-sdk'
import { useWeb3React } from '@web3-react/core'
import useENS from '../../../hooks/useENS'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { Percent } from '@ape.swap/sdk-core'
import { useZapContract } from '../../../hooks/useContract'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from 'views/V2/AddLiquidityV2/components/Actions'
import { MergedZap, ZapStatus } from 'state/zap/actions'
import { setZapError, setZapStatus } from 'state/zap/slice'
import { TransactionType } from 'state/transactions/types'
import { Call, FailedCall, SuccessfulCall, estimateGasForCalls } from 'utils/transactions'
import { isAddress } from 'utils'
import { useAppDispatch, useAppSelector } from 'state/hooks'

/**
 * Returns the swap calls that can be used to make the trade
 * @param bestZapOne trade to execute
 * @param bestZapTwo trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */

function useZapCallArguments(
  zap: MergedZap,
  zapType: ZapType,
  allowedSlippage: Percent = DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  stakingContractAddress?: string,
  maxPrice?: string,
  stakingPid?: string,
): Call[] {
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

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useZapCallback(
  zap: MergedZap,
  zapType: ZapType,
  allowedSlippage: Percent = DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  stakingContractAddress?: string,
  maxPrice?: string,
  poolPid?: string,
): { status: ZapStatus; callback: any; error: string | undefined } {
  const { account, chainId, provider } = useWeb3React()

  const dispatch = useAppDispatch()
  const zapStatus = useAppSelector(state => state.zap.zapStatus)
  const zapError = useAppSelector(state => state.zap.zapError)

  const swapCalls = useZapCallArguments(
    zap,
    zapType,
    allowedSlippage,
    recipientAddressOrName,
    stakingContractAddress,
    maxPrice,
    poolPid,
  )

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  useEffect(() => {
    if (!provider || !account || !chainId) {
      dispatch(setZapStatus(ZapStatus.INVALID))
      dispatch(setZapError('Missing dependencies'))
    } else if (!recipient) {
      if (recipientAddressOrName !== null) {
        dispatch(setZapStatus(ZapStatus.INVALID))
        dispatch(setZapError('Invalid recipient'))
      } else {
        dispatch(setZapStatus(ZapStatus.LOADING))
        dispatch(setZapError(undefined))
      }
    } else {
      dispatch(setZapStatus(ZapStatus.VALID))
      dispatch(setZapError(undefined))
    }
  }, [provider, account, chainId, recipient, recipientAddressOrName, dispatch])


  return useMemo(() => {
    if (zapStatus === ZapStatus.INVALID) {
      return { status: zapStatus, callback: null, error: zapError }
    }

    return {
      status: zapStatus,
      callback: async function onZap(): Promise<string> {
        const estimatedCalls = await estimateGasForCalls(swapCalls)

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
            // TODO: This is not being used
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
      error: undefined,
    }
  }, [zap, account, recipient, recipientAddressOrName, swapCalls, addTransaction, zapStatus, zapError])
}

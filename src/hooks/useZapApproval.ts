import { CurrencyAmount, Percent, Token } from '@ape.swap/sdk-core'
import { useApproval } from 'lib/hooks/useApproval'
import { MergedZap } from '../state/zap/actions'
import { useZapContract } from './useContract'

// wraps useApproveCallback in the context of a swap
export default function useZapApproval(
  zap: MergedZap,
  allowedSlippage: Percent,
  useIsPendingApproval: (token?: Token, spender?: string) => boolean,
) {
  const zapContract = useZapContract()

  const inAmount = zap?.currencyIn?.currency
    ? CurrencyAmount.fromRawAmount(zap?.currencyIn?.currency, zap.currencyIn?.inputAmount)
    : undefined

  const spender = zapContract?.address
  
  return useApproval(inAmount, spender, useIsPendingApproval)
}

import { useSelector } from 'react-redux'
import { CurrencyAmount, Currency } from '@ape.swap/sdk-core'

// Types
import { AppState } from 'state'

// Hooks
import useGetWidoAllowance from './useGetWidoAllowance'
import { useV2Pair } from 'hooks/useV2Pairs'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Constants
const WIDO_NATIVE_TOKEN_ID = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const getInputCurrencyInfo = ({
  currencyA,
  currencyB,
  pair,
}: {
  currencyA: any
  currencyB: any | null
  pair: any | null
}): { address: string; decimals: number } => {
  if (currencyB) {
    const { liquidityToken: { address, decimals } = { address: '', decimals: 18 } } = pair || {}
    return { address, decimals }
  } else if (currencyA.isNative) {
    return { address: WIDO_NATIVE_TOKEN_ID, decimals: currencyA.decimals }
  }
  const { tokenInfo: { address, decimals } = { address: '', decimals: 18 } } = currencyA || {}
  return { address, decimals }
}

const useGetWidoTokenAllowance = ({
  currencyA,
  currencyB,
  toToken,
}: {
  currencyA: any
  currencyB: any
  toToken: string
}) => {
  const [, pair] = useV2Pair(currencyA, currencyB)
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)

  const isNative = currencyA.isNative

  let requiresApproval: boolean = !isNative

  const { address, decimals } = getInputCurrencyInfo({ currencyA, currencyB, pair })

  const { data: widoAllowance, isLoading: isWidoAllowanceLoading } = useGetWidoAllowance({
    fromToken: address,
    toToken,
    isNative,
  })
  const { allowance } = widoAllowance ?? {}

  const amountToApprove = convertToTokenValue(amountInput || '0', decimals).toString()

  if (!isNative && !isWidoAllowanceLoading && !!allowance) {
    // TODO: maybe will need to use useHasPendingApproval?
    requiresApproval = amountToApprove > allowance
  }

  return { requiresApproval, isWidoAllowanceLoading }
}

export default useGetWidoTokenAllowance

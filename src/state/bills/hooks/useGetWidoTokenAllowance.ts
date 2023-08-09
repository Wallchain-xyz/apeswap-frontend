import { useSelector } from 'react-redux'

// Types
import { AppState } from 'state'

// Hooks
import useGetWidoAllowance from './useGetWidoAllowance'
import { useV2Pair } from 'hooks/useV2Pairs'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'
import getCurrencyInfo from 'utils/getCurrencyInfo'

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

  const { address, decimals } = getCurrencyInfo({ currencyA, currencyB, pair })

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

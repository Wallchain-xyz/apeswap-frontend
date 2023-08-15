import { useSelector } from 'react-redux'

// Types
import { AppState } from 'state'

// Hooks
import useGetWidoAllowance from './useGetWidoAllowance'
import useApproveWidoSpender from './useApproveWidoSpender'
import { useV2Pair } from 'hooks/useV2Pairs'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'
import getCurrencyInfo from 'utils/getCurrencyInfo'

const useGetWidoTokenAllowance = ({
  currencyA,
  currencyB,
  toToken = '',
}: {
  currencyA: any
  currencyB?: any
  toToken?: string
}) => {
  const [, pair] = useV2Pair(currencyA, currencyB)
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)

  const isNative = currencyA.isNative
  const { address, decimals } = getCurrencyInfo({ currencyA, currencyB, pair })
  const amountToApprove = convertToTokenValue(amountInput || '0', decimals).toString()

  const isEnabled = !isNative && Number(amountToApprove) > 0 && !!toToken

  const { data: widoAllowance, isLoading: isWidoAllowanceLoading } = useGetWidoAllowance({
    fromToken: address,
    toToken,
    isEnabled,
  })
  const { allowance } = widoAllowance ?? {}

  let requiresApproval: boolean = isNative ? !isNative : isWidoAllowanceLoading

  if (!isNative && !isWidoAllowanceLoading && !!allowance) {
    requiresApproval = Number(amountToApprove) > Number(allowance)
  }

  const { mutate: approveWidoSpender, isLoading: isApproveWidoSpenderLoading } = useApproveWidoSpender({
    currencyA,
    currencyB,
    toToken,
  })

  return { requiresApproval, isWidoAllowanceLoading, approveWidoSpender, isApproveWidoSpenderLoading }
}

export default useGetWidoTokenAllowance

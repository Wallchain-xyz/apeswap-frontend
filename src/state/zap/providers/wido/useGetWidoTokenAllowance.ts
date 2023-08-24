import { useSelector } from 'react-redux'
import { ZapVersion } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Types
import { AppState } from 'state'

// Hooks
import useGetWidoAllowance from './useGetWidoAllowance'
import useApproveWidoSpender from './useApproveWidoSpender'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Constants
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

const useGetWidoTokenAllowance = ({
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
  zapVersion,
  fromChainId,
  toChainId,
}: {
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
  zapVersion: ZapVersion
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}) => {
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)

  const amountToApprove = convertToTokenValue(amountInput || '0', inputTokenDecimals).toString()
  const isNative = inputTokenAddress === WIDO_NATIVE_TOKEN_ID
  const isEnabled = !isNative && Number(amountToApprove) > 0 && !!toTokenAddress && zapVersion === ZapVersion.Wido

  const { data: widoAllowance, isLoading: isWidoAllowanceLoading } = useGetWidoAllowance({
    fromToken: inputTokenAddress,
    toToken: toTokenAddress,
    isEnabled,
    fromChainId,
    toChainId,
  })
  const { allowance } = widoAllowance ?? {}

  let requiresApproval: boolean = isNative ? !isNative : isWidoAllowanceLoading

  if (!isNative && !isWidoAllowanceLoading && !!allowance) {
    requiresApproval = Number(amountToApprove) > Number(allowance)
  }

  const { mutate: approveWidoSpender, isLoading: isApproveWidoSpenderLoading } = useApproveWidoSpender({
    inputTokenAddress,
    inputTokenDecimals,
    toTokenAddress,
  })

  return { requiresApproval, isWidoAllowanceLoading, approveWidoSpender, isApproveWidoSpenderLoading }
}

export default useGetWidoTokenAllowance

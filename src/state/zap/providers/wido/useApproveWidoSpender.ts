import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'

// Hooks
import useGetWidoApprove from './useGetWidoApprove'
import { useSignTransaction } from 'state/transactions/hooks'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

// Types
import { AppState } from 'state'
import { SupportedChainId } from '@ape.swap/sdk-core'

const useApproveWidoSpender = ({
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
  fromChainId,
  toChainId,
}: {
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}) => {
  const queryClient = useQueryClient()
  const { account, provider, isActive } = useWeb3React()

  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)

  const amount = convertToTokenValue(amountInput || '0', inputTokenDecimals).toString()
  const isEnabled =
    isActive &&
    !!inputTokenAddress &&
    !!toTokenAddress &&
    inputTokenAddress !== WIDO_NATIVE_TOKEN_ID &&
    Number(amount) > 0

  const { signTransaction } = useSignTransaction()
  const { data: widoSpenderData } = useGetWidoApprove({
    fromToken: inputTokenAddress,
    toToken: toTokenAddress,
    amount,
    isEnabled,
    fromChainId,
    toChainId,
  })

  const { data, to } = widoSpenderData || {}

  return useMutation({
    mutationFn: () => {
      console.log('Signing Wido permission Tx')
      return signTransaction({ data, to }).then((hash: any) => provider?.waitForTransaction(hash))
    },
    onSuccess: () => {
      // will wait for query invalidation to finish,
      // mutation state will stay loading while related queries update
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WIDO_ALLOWANCE, { account }, { fromToken: inputTokenAddress }, { toTokenAddress }],
      })
    },
  })
}

export default useApproveWidoSpender

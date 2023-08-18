import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'

// Hooks
import useGetWidoApprove from './useGetWidoApprove'
import { useV2Pair } from 'hooks/useV2Pairs'
import useSignTransaction from '../../../bills/hooks/useSignTransaction'

// Utils
import getCurrencyInfo from 'utils/getCurrencyInfo'
import convertToTokenValue from 'utils/convertToTokenValue'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

// Types
import { AppState } from 'state'

const useApproveWidoSpender = ({
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
}: {
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
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

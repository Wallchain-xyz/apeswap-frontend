import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { TransactionType } from 'state/transactions/types'
import { SupportedChainId } from '@ape.swap/sdk-core'

const useApproveWidoSpender = ({
  inputTokenAddress,
  toTokenAddress,
  fromChainId,
  toChainId,
  amountToApprove,
  spenderAddress,
}: {
  inputTokenAddress: string
  toTokenAddress: string
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
  amountToApprove: string
  spenderAddress: string
}) => {
  const queryClient = useQueryClient()
  const { account, isActive } = useWeb3React()

  const isEnabled =
    isActive &&
    !!inputTokenAddress &&
    !!toTokenAddress &&
    inputTokenAddress !== WIDO_NATIVE_TOKEN_ID &&
    Number(amountToApprove) > 0

  const { signTransaction } = useSignTransaction()
  const { data: widoSpenderData } = useGetWidoApprove({
    fromToken: inputTokenAddress,
    toToken: toTokenAddress,
    amount: amountToApprove,
    isEnabled,
    fromChainId,
    toChainId,
  })

  const { data, to } = widoSpenderData || {}

  return useMutation({
    mutationFn: () => {
      console.log('Signing Wido permission Tx')
      return signTransaction({
        dataToSign: { to, data },
        txInfo: { type: TransactionType.APPROVAL, tokenAddress: toTokenAddress, spender: spenderAddress },
      })
    },
    onSuccess: () => {
      // will wait for query invalidation to finish,
      // mutation state will stay loading while related queries update
      return queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.WIDO_ALLOWANCE,
          { account },
          { fromToken: inputTokenAddress },
          { toTokenAddress },
          { amountToApprove },
        ],
      })
    },
  })
}

export default useApproveWidoSpender

import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import { approve, ApproveResult } from 'wido'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

const getWidoApprove = async ({
  chainId,
  fromToken,
  toToken,
  fromChainId,
  toChainId,
  amount,
}: {
  chainId: SupportedChainId
  fromToken: string
  toToken: string
  amount: string
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}): Promise<ApproveResult | null> => {
  try {
    const tokenAllowance = approve({
      chainId: chainId,
      toChainId,
      fromToken,
      toToken,
      amount,
      fromChainId,
    })
    return tokenAllowance
  } catch (e) {
    console.error({ e })
    return null
  }
}

const useGetWidoApprove = ({
  fromToken,
  toToken,
  fromChainId,
  toChainId,
  amount,
  isEnabled,
}: {
  fromToken: string
  toToken: string
  amount: string
  isEnabled: boolean
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}) => {
  const { account = '', chainId = 0 } = useWeb3React()
  return useQuery({
    queryKey: [QUERY_KEYS.WIDO_APPROVAL, { account }, { fromToken }, { toToken }],
    queryFn: () => getWidoApprove({ chainId, toToken, fromToken, amount, fromChainId, toChainId }),
    enabled: isEnabled && !!account && !!chainId,
  })
}

export default useGetWidoApprove

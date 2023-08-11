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
  amount,
}: {
  chainId: SupportedChainId
  fromToken: string
  toToken: string
  amount: string
}): Promise<ApproveResult | null> => {
  try {
    const tokenAllowance = approve({
      chainId: chainId,
      toChainId: chainId,
      fromToken,
      toToken,
      amount,
    })
    return tokenAllowance
  } catch (e) {
    console.error({ e })
    return null
  }
}

const useGetWidoApprove = ({ fromToken, toToken, amount }: { fromToken: string; toToken: string; amount: string }) => {
  const { isActive, account = '0x123', chainId = 137 } = useWeb3React()
  return useQuery({
    queryKey: [QUERY_KEYS.WIDO_APPROVAL, { account }, { fromToken }, { toToken }],
    queryFn: () => getWidoApprove({ chainId, toToken, fromToken, amount }),
    enabled: isActive && !!fromToken && !!toToken && Number(amount) > 0,
  })
}

export default useGetWidoApprove

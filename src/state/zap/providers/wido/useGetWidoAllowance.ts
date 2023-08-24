import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import { TokenAllowanceResult, getTokenAllowance } from 'wido'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

const getWidoAllowance = async ({
  chainId,
  fromToken,
  toToken,
  account,
  fromChainId,
  toChainId,
}: {
  chainId: SupportedChainId
  fromToken: string
  toToken: string
  account: string
  fromChainId?: SupportedChainId
  toChainId: SupportedChainId
}): Promise<TokenAllowanceResult | null> => {
  try {
    const tokenAllowance = getTokenAllowance({
      chainId: chainId,
      fromToken,
      toToken,
      accountAddress: account,
      fromChainId,
      toChainId,
    })
    return tokenAllowance
  } catch (e) {
    console.error({ e })
    return null
  }
}

const useGetWidoAllowance = ({
  toToken,
  fromToken,
  isEnabled,
  fromChainId,
  toChainId,
}: {
  toToken: string
  fromToken: string
  isEnabled: boolean
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}) => {
  const { isActive, account = '', chainId = 0 } = useWeb3React()

  return useQuery({
    queryKey: [QUERY_KEYS.WIDO_ALLOWANCE, { account }, { fromToken }, { toToken }],
    queryFn: () => getWidoAllowance({ chainId, toToken, fromToken, account, fromChainId, toChainId }),
    enabled: isEnabled && !!fromToken && !!toToken && isActive && !!account && !!chainId,
  })
}

export default useGetWidoAllowance

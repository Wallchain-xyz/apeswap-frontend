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
}: {
  chainId: SupportedChainId
  fromToken: string
  toToken: string
  account: string
}): Promise<TokenAllowanceResult | null> => {
  try {
    const tokenAllowance = getTokenAllowance({
      chainId: chainId,
      toChainId: chainId,
      fromToken,
      toToken,
      accountAddress: account,
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
  isNative,
}: {
  toToken: string
  fromToken: string
  isNative: boolean
}) => {
  const { isActive, account = '0x123', chainId = 137 } = useWeb3React()
  return useQuery({
    queryKey: [QUERY_KEYS.WIDO_ALLOWANCE, { account }, { fromToken }, { fromToken }],
    queryFn: () => getWidoAllowance({ chainId, toToken, fromToken, account }),
    enabled: isActive && !isNative && !!fromToken && !!toToken,
  })
}

export default useGetWidoAllowance

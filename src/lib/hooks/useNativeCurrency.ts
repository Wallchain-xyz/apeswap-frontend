import { NativeCurrency, Token, SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { nativeOnChain } from 'config/constants/tokens'
import { useMemo } from 'react'

export default function useNativeCurrency(): NativeCurrency | Token {
  const { chainId } = useWeb3React()
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId],
  )
}

// Constants
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

// Types
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { Pair } from '@ape.swap/v2-sdk'
import { SupportedChainId } from '@ape.swap/sdk-core'

const getCurrencyInfo = ({
  currencyA,
  currencyB,
  pair,
}: {
  currencyA: WrappedTokenInfo | null
  currencyB?: WrappedTokenInfo | null
  pair?: Pair | null
}): { address: string; decimals: number; chainId: SupportedChainId } => {
  if (currencyB) {
    const { liquidityToken: { address, decimals, chainId } = { address: '', decimals: 18, chainId: 0 } } = pair || {}
    return { address, decimals, chainId }
  } else if (currencyA?.isNative) {
    return { address: WIDO_NATIVE_TOKEN_ID, decimals: currencyA.decimals, chainId: currencyA.chainId }
  }
  const { tokenInfo: { address, decimals, chainId } = { address: '', decimals: 18, chainId: 0 } } = currencyA || {}
  return {
    address: address ? address : (currencyA?.address as string),
    decimals,
    chainId: !!chainId ? chainId : (currencyA?.chainId as SupportedChainId),
  }
}

export default getCurrencyInfo

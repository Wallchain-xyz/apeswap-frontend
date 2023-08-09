// Constants
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

// Types
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { Pair } from '@ape.swap/v2-sdk'

const getCurrencyInfo = ({
  currencyA,
  currencyB,
  pair,
}: {
  currencyA: WrappedTokenInfo
  currencyB: WrappedTokenInfo
  pair: Pair | null
}): { address: string; decimals: number } => {
  if (currencyB) {
    const { liquidityToken: { address, decimals } = { address: '', decimals: 18 } } = pair || {}
    return { address, decimals }
  } else if (currencyA.isNative) {
    return { address: WIDO_NATIVE_TOKEN_ID, decimals: currencyA.decimals }
  }
  const { tokenInfo: { address, decimals } = { address: '', decimals: 18 } } = currencyA || {}
  return { address, decimals }
}

export default getCurrencyInfo

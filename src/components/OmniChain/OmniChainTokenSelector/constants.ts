/*
    PURELY FOR PLACEHOLDER PURPOSES!
    Still need to figure out where we'll stash all chain info
*/

import { SupportedChainId } from '@ape.swap/sdk-core'

export const DEX_CHAINS: { chain: SupportedChainId; name: string }[] = [
  { chain: SupportedChainId.BSC, name: 'BNB Chain' },
  { chain: SupportedChainId.POLYGON, name: 'Polygon' },
  { chain: SupportedChainId.MAINNET, name: 'Ethereum' },
  { chain: SupportedChainId.ARBITRUM_ONE, name: 'Arbitrum' },
  { chain: 43114, name: 'Avalanche' },
  { chain: 10, name: 'Optimism' },
  { chain: 250, name: 'Fantom' },
  { chain: 25, name: 'Cronos' },
  { chain: 1101, name: 'Polygon (ZK)' },
  { chain: 42220, name: 'Celo' },
  { chain: 100, name: 'Gnosis' },
  { chain: 66, name: 'OKExChain' },
]

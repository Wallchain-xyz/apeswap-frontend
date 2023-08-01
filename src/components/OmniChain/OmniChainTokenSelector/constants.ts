/*
    PURELY FOR PLACEHOLDER PURPOSES!
    Still need to figure out where we'll stash all chain info
*/

import { ChainId } from 'config/constants/chains';

export const DEX_CHAINS: { chain: ChainId; name: string }[] = [
  { chain: ChainId.BSC, name: 'BNB Chain' },
  { chain: ChainId.POLYGON, name: 'Polygon' },
  { chain: ChainId.MAINNET, name: 'Ethereum' },
  { chain: ChainId.ARBITRUM_ONE, name: 'Arbitrum' },
  { chain: ChainId.AVALANCHE, name: 'Avalanche' },
  { chain: ChainId.OPTIMISM, name: 'Optimism' },
  { chain: ChainId.FANTOM, name: 'Fantom' },
  { chain: ChainId.CRONOS, name: 'Cronos' },
  { chain: ChainId.POLYGON_ZK, name: 'Polygon (ZK)' },
  { chain: ChainId.CELO, name: 'Celo' },
  { chain: ChainId.GNOSIS, name: 'Gnosis' },
  { chain: ChainId.OKX, name: 'OKExChain' },
]

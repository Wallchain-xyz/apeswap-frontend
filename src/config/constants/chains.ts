// Network chain ids
import { icons } from 'components/uikit/Svg/types'

export const AVERAGE_L1_BLOCK_TIME = 12000

//This is the list of supported EVM chains
export enum ChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  BSC = 56,
  BSC_TESTNET = 97,
  TLOS = 40,
  AVALANCHE = 43114,
  OPTIMISM = 10,
  FANTOM = 250,
  CRONOS = 25,
  POLYGON_ZK = 1101,
  CELO = 42220,
  GNOSIS = 100,
  OKX = 66,
}

// This is the list we will display to the user
export const MAINNET_CHAINS = [
  ChainId.BSC,
  ChainId.POLYGON,
  ChainId.MAINNET,
  //ChainId.TLOS,
  ChainId.ARBITRUM_ONE,
]

export const CHAIN_NAMES: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.ARBITRUM_ONE]: 'arbitrum_one',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [ChainId.BSC]: 'bnb_chain',
  [ChainId.BSC_TESTNET]: 'bnb_chain_testnet',
  [ChainId.TLOS]: 'telos',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.OPTIMISM]: 'optimism',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.CRONOS]: 'cronos',
  [ChainId.POLYGON_ZK]: 'polygon (zk)', //check if this doesn't break
  [ChainId.CELO]: 'celo',
  [ChainId.GNOSIS]: 'gnosis',
  [ChainId.OKX]: 'okexchain',
}

// Network Icons
export const NETWORK_ICONS: Partial<Record<ChainId, icons>> = {
  [ChainId.BSC]: icons.BNB_TOKEN,
  [ChainId.POLYGON]: icons.POLYGON_TOKEN,
  [ChainId.MAINNET]: icons.ETH_TOKEN,
  [ChainId.TLOS]: icons.TLOS_TOKEN,
  [ChainId.ARBITRUM_ONE]: icons.ARBITRUM_TOKEN,
}

// Network labels
export const NETWORK_LABEL: Partial<Record<ChainId, string>> = {
  [ChainId.BSC]: 'BNB',
  [ChainId.BSC_TESTNET]: 'BNB Testnet',
  [ChainId.POLYGON]: 'Polygon',
  [ChainId.POLYGON_MUMBAI]: 'Polygon Testnet',
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.TLOS]: 'Telos',
  [ChainId.ARBITRUM_ONE]: 'Arbitrum',
}

// Network block explorers
export const BLOCK_EXPLORER: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'https://etherscan.io/',
  [ChainId.ARBITRUM_ONE]: 'https://arbiscan.io',
  [ChainId.POLYGON]: 'https://polygonscan.com',
  [ChainId.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com/',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [ChainId.TLOS]: 'https://www.teloscan.io',
  [ChainId.AVALANCHE]: 'https://cchain.explorer.avax.network/',
  [ChainId.OPTIMISM]: 'https://optimistic.etherscan.io/',
  [ChainId.FANTOM]: 'https://ftmscan.com/',
  [ChainId.CRONOS]: 'https://cronos.crypto.org/explorer/',
  [ChainId.POLYGON_ZK]: 'https://zkevm.polygonscan.com/',
  [ChainId.CELO]: 'https://explorer.celo.org/',
  [ChainId.GNOSIS]: 'https://blockscout.com/xdai/mainnet/',
  [ChainId.OKX]: 'https://www.oklink.com/en/okc/',
}

interface ChainParamContent {
  chainId: string
  chainName: string
  nativeCurrency: { name: string; symbol: string; decimals: number }
  blockExplorerUrls: string[]
}

export const CHAIN_PARAMS: Record<ChainId, ChainParamContent> = {
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.BSC]],
  },
  [ChainId.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.BSC_TESTNET]],
  },
  [ChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON]],
  },
  [ChainId.POLYGON_MUMBAI]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON_MUMBAI]],
  },
  [ChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.MAINNET]],
  },
  [ChainId.TLOS]: {
    chainId: '0x28',
    chainName: 'Telos',
    nativeCurrency: {
      name: 'Telos',
      symbol: 'TLOS',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.TLOS]],
  },
  [ChainId.ARBITRUM_ONE]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.ARBITRUM_ONE]],
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xa86a',
    chainName: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.AVALANCHE]],
  },
  [ChainId.OPTIMISM]: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.OPTIMISM]],
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.FANTOM]],
  },
  [ChainId.CRONOS]: {
    chainId: '0x19',
    chainName: 'Cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.CRONOS]],
  },
  [ChainId.POLYGON_ZK]: {
    chainId: '0x44d',
    chainName: 'Polygon zkEVM',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.POLYGON_ZK]],
  },
  [ChainId.CELO]: {
    chainId: '0xa4ec',
    chainName: 'Celo Mainnet',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.CELO]],
  },
  [ChainId.GNOSIS]: {
    chainId: '0x64',
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDai',
      symbol: 'xDai',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.GNOSIS]],
  },
  [ChainId.OKX]: {
    chainId: '0x42',
    chainName: 'OKXChain Mainnet',
    nativeCurrency: {
      name: 'OKT',
      symbol: 'OKT',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[ChainId.GNOSIS]],
  },
}

export const getChainInfo = (chainId: ChainId): any => {
  if (chainId) {
    return CHAIN_PARAMS[chainId] ?? undefined
  }
  return undefined
}

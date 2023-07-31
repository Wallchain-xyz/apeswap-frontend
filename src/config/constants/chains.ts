// Network chain ids
import { SupportedChainId } from '@ape.swap/sdk-core'
import { icons } from 'components/uikit/Svg/types'

export const AVERAGE_L1_BLOCK_TIME = 12000

// List of mainnet chains
// This is currently used for the info page
export const MAINNET_CHAINS = [
  SupportedChainId.BSC,
  SupportedChainId.POLYGON,
  SupportedChainId.MAINNET,
  //SupportedChainId.TLOS,
  SupportedChainId.ARBITRUM_ONE,
]

export const CHAIN_NAMES: Record<SupportedChainId, string> = {
  [SupportedChainId.BSC]: 'bnb_chain',
  [SupportedChainId.BSC_TESTNET]: 'bnb_chain_testnet',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.TLOS]: 'telos',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum_one',
}

// Network Icons
export const NETWORK_ICONS: Partial<Record<SupportedChainId, icons>> = {
  [SupportedChainId.BSC]: icons.BNB_TOKEN,
  [SupportedChainId.POLYGON]: icons.POLYGON_TOKEN,
  [SupportedChainId.MAINNET]: icons.ETH_TOKEN,
  [SupportedChainId.TLOS]: icons.TLOS_TOKEN,
  [SupportedChainId.ARBITRUM_ONE]: icons.ARBITRUM_TOKEN,
}

// Network labels
export const NETWORK_LABEL: Partial<Record<SupportedChainId, string>> = {
  [SupportedChainId.BSC]: 'BNB',
  [SupportedChainId.BSC_TESTNET]: 'BNB Testnet',
  [SupportedChainId.POLYGON]: 'Polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'Polygon Testnet',
  [SupportedChainId.MAINNET]: 'Ethereum',
  //[SupportedChainId.TLOS]: 'Telos',
  [SupportedChainId.ARBITRUM_ONE]: 'Arbitrum',
}

// Network block explorers
export const BLOCK_EXPLORER: Record<SupportedChainId, string> = {
  [SupportedChainId.BSC]: 'https://bscscan.com',
  [SupportedChainId.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [SupportedChainId.POLYGON]: 'https://polygonscan.com',
  [SupportedChainId.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com/',
  [SupportedChainId.MAINNET]: 'https://etherscan.io/',
  [SupportedChainId.TLOS]: 'https://www.teloscan.io',
  [SupportedChainId.ARBITRUM_ONE]: 'https://arbiscan.io',
}

export const CHAIN_PARAMS: Partial<
  Record<
    SupportedChainId,
    {
      chainId: string
      chainName: string
      nativeCurrency: { name: string; symbol: string; decimals: number }
      blockExplorerUrls: string[]
    }
  >
> = {
  [SupportedChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.BSC]],
  },
  [SupportedChainId.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.BSC_TESTNET]],
  },
  [SupportedChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.POLYGON]],
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.POLYGON_MUMBAI]],
  },
  [SupportedChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.MAINNET]],
  },
  [SupportedChainId.TLOS]: {
    chainId: '0x28',
    chainName: 'Telos',
    nativeCurrency: {
      name: 'Telos',
      symbol: 'TLOS',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.TLOS]],
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.ARBITRUM_ONE]],
  },
}

export const getChainInfo = (chainId: SupportedChainId): any => {
  if (chainId) {
    return CHAIN_PARAMS[chainId] ?? undefined
  }
  return undefined
}

// enum to corresponding url
export enum LIST_VIEW_PRODUCTS {
  BILLS = 'treasury-bills',
  MAXIMIZERS = 'maximizers',
  JUNGLE_FARMS = 'jungle-farms',
  POOLS = 'pools',
  FARMS = 'farms',
}

export enum OTHER_PRODUCTS {
  GNANA = 'gnana',
  MIGRATE = 'migrate',
  ZAP = 'zap',
  IAO = 'iao',
  NFA_COLLECTION = 'nft',
  NFA_AUCTION = 'auction',
  NFA_STAKING = 'staking',
  V3 = 'v3',
}

// Products on different chains and their available chains

// These products are list view components that have a specific chain redirect component
export const AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS: Record<LIST_VIEW_PRODUCTS, SupportedChainId[]> = {
  [LIST_VIEW_PRODUCTS.BILLS]: [SupportedChainId.BSC, SupportedChainId.POLYGON, SupportedChainId.ARBITRUM_ONE],
  [LIST_VIEW_PRODUCTS.FARMS]: [SupportedChainId.BSC, SupportedChainId.POLYGON],
  [LIST_VIEW_PRODUCTS.MAXIMIZERS]: [SupportedChainId.BSC],
  [LIST_VIEW_PRODUCTS.JUNGLE_FARMS]: [SupportedChainId.BSC],
  [LIST_VIEW_PRODUCTS.POOLS]: [SupportedChainId.BSC],
}

// Full product names for readability
export const FULL_PRODUCT_NAMES: Record<LIST_VIEW_PRODUCTS | OTHER_PRODUCTS, string> = {
  [LIST_VIEW_PRODUCTS.BILLS]: 'Treasury Bills',
  [LIST_VIEW_PRODUCTS.MAXIMIZERS]: 'Banana Maximizers',
  [LIST_VIEW_PRODUCTS.JUNGLE_FARMS]: 'Jungle Farms',
  [LIST_VIEW_PRODUCTS.POOLS]: 'Pools',
  [LIST_VIEW_PRODUCTS.FARMS]: 'Farms',
  [OTHER_PRODUCTS.GNANA]: 'Golden Banana',
  [OTHER_PRODUCTS.MIGRATE]: 'Migrate',
  [OTHER_PRODUCTS.ZAP]: 'Zap',
  [OTHER_PRODUCTS.IAO]: 'Official IAO',
  [OTHER_PRODUCTS.NFA_COLLECTION]: 'Nfa Collection',
  [OTHER_PRODUCTS.NFA_AUCTION]: 'Nfa Auction',
  [OTHER_PRODUCTS.NFA_STAKING]: 'Nfa Staking',
  [OTHER_PRODUCTS.V3]: 'V3 Concentrated Liquidity',
}

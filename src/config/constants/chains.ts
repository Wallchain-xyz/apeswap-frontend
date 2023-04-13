// Network chain ids
import { SupportedChainId } from '@ape.swap/sdk-core'
import { icons } from 'components/uikit/Svg/types'
import { BigNumber } from 'ethers'

export const AVERAGE_L1_BLOCK_TIME = 12000

// List of mainnet chains
// This is currently used for the info page
export const MAINNET_CHAINS = [
  SupportedChainId.BSC,
  SupportedChainId.POLYGON,
  SupportedChainId.MAINNET,
  // SupportedChainId.TLOS,
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

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
  SupportedChainId.BSC,
  SupportedChainId.POLYGON,
  SupportedChainId.MAINNET,
  SupportedChainId.TLOS,
  SupportedChainId.ARBITRUM_ONE,
]

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
  [SupportedChainId.TLOS]: 'Telos',
  [SupportedChainId.ARBITRUM_ONE]: 'Arbitrum',
}

export const NETWORK_INFO_LINK: Partial<Record<SupportedChainId, string>> = {
  [SupportedChainId.BSC]: 'https://info.apeswap.finance',
  [SupportedChainId.BSC_TESTNET]: 'https://info.apeswap.finance',
  [SupportedChainId.POLYGON]: 'https://polygon.info.apeswap.finance/',
  [SupportedChainId.POLYGON_MUMBAI]: 'https://polygon.info.apeswap.finance/',
  [SupportedChainId.MAINNET]: 'https://ethereum.info.apeswap.finance',
  [SupportedChainId.TLOS]: 'https://telos.info.apeswap.finance',
  [SupportedChainId.ARBITRUM_ONE]: 'https://arb1.arbitrum.io/rpc',
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

export const CHAIN_PARAMS: Record<
  SupportedChainId,
  {
    chainId: string
    chainName: string
    nativeCurrency: { name: string; symbol: string; decimals: number }
    blockExplorerUrls: string[]
  }
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

export const getChainInfo = (chainId: SupportedChainId | undefined | null): any => {
  if (chainId) {
    return CHAIN_PARAMS[chainId] ?? undefined
  }
  return undefined
}

// Ape price impact cutoff
export const APE_PRICE_IMPACT = 15

// Dont use bonus router if the bonus is lower than the cutoff
export const BONUS_CUTOFF_AMOUNT: Partial<Record<SupportedChainId, number>> = {
  [SupportedChainId.BSC]: 0.5,
  [SupportedChainId.BSC_TESTNET]: 0,
  [SupportedChainId.POLYGON]: 0,
  [SupportedChainId.MAINNET]: 0,
  [SupportedChainId.TLOS]: 0,
}

// Block times
export const CHAIN_BLOCKS_PER_YEAR: Partial<Record<SupportedChainId, BigNumber>> = {
  [SupportedChainId.BSC]: BigNumber.from(10512000),
  [SupportedChainId.POLYGON]: BigNumber.from(13711304),
  [SupportedChainId.MAINNET]: BigNumber.from(2628000),
  [SupportedChainId.TLOS]: BigNumber.from(63072000),
}

// enum to corresponding url
export enum LIST_VIEW_PRODUCTS {
  BILLS = 'treasury-bills',
  MAXIMIZERS = 'maximizers',
  JUNGLE_FARMS = 'jungle-farms',
  POOLS = 'pools',
  FARMS = 'banana-farms',
}

export enum OTHER_PRODUCTS {
  GNANA = 'gnana',
  MIGRATE = 'migrate',
  ZAP = 'zap',
  IAO = 'iao',
  NFA_COLLECTION = 'nft',
  NFA_AUCTION = 'auction',
  NFA_STAKING = 'staking',
}

// Products on different chains and their available chains

// These products are list view components that have a specific chain redirect component
export const AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS: Record<LIST_VIEW_PRODUCTS, SupportedChainId[]> = {
  [LIST_VIEW_PRODUCTS.BILLS]: [SupportedChainId.BSC, SupportedChainId.POLYGON, SupportedChainId.TLOS],
  [LIST_VIEW_PRODUCTS.FARMS]: [SupportedChainId.BSC, SupportedChainId.POLYGON, SupportedChainId.TLOS],
  [LIST_VIEW_PRODUCTS.MAXIMIZERS]: [SupportedChainId.BSC],
  [LIST_VIEW_PRODUCTS.JUNGLE_FARMS]: [SupportedChainId.BSC],
  [LIST_VIEW_PRODUCTS.POOLS]: [SupportedChainId.BSC],
}

// These products are specific products to certain chains like GNANA and Migrate
// These products will be redirected a different way
export const AVAILABLE_CHAINS_ON_PRODUCTS: Record<OTHER_PRODUCTS, SupportedChainId[]> = {
  [OTHER_PRODUCTS.GNANA]: [SupportedChainId.BSC],
  [OTHER_PRODUCTS.MIGRATE]: [SupportedChainId.BSC],
  [OTHER_PRODUCTS.ZAP]: [SupportedChainId.BSC, SupportedChainId.POLYGON, SupportedChainId.TLOS],
  [OTHER_PRODUCTS.IAO]: [SupportedChainId.BSC],
  [OTHER_PRODUCTS.NFA_COLLECTION]: [SupportedChainId.BSC],
  [OTHER_PRODUCTS.NFA_AUCTION]: [SupportedChainId.BSC],
  [OTHER_PRODUCTS.NFA_STAKING]: [SupportedChainId.BSC],
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
}

// This is needed for the info page queries
export const INFO_PAGE_CHAIN_PARAMS: Partial<
  Record<
    SupportedChainId,
    {
      graphAddress: string
      explorer: string
      blockGraph: string
      id: string
      fee: number
      color: string
    }
  >
> = {
  [SupportedChainId.BSC]: {
    graphAddress: 'https://bnb.apeswapgraphs.com/subgraphs/name/ape-swap/apeswap-subgraph',
    explorer: BLOCK_EXPLORER[SupportedChainId.BSC],
    blockGraph: 'https://api.thegraph.com/subgraphs/name/matthewlilley/bsc-blocks',
    id: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    fee: 0.002,
    color: '#FAB701',
  },
  [SupportedChainId.POLYGON]: {
    graphAddress: 'https://api.thegraph.com/subgraphs/name/prof-sd/as-matic-graft',
    explorer: BLOCK_EXPLORER[SupportedChainId.POLYGON],
    blockGraph: 'https://api.thegraph.com/subgraphs/name/matthewlilley/polygon-blocks',
    id: '0xcf083be4164828f00cae704ec15a36d711491284',
    fee: 0.002,
    color: '#8C3EED',
  },
  [SupportedChainId.MAINNET]: {
    graphAddress: 'https://api.thegraph.com/subgraphs/name/apeswapfinance/ethereum-dex',
    explorer: BLOCK_EXPLORER[SupportedChainId.MAINNET],
    blockGraph: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
    id: '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
    fee: 0.002,
    color: '#637DEA',
  },
  [SupportedChainId.TLOS]: {
    graphAddress: 'https://telos.apeswapgraphs.com/subgraphs/name/ape-swap/apeswap-graph',
    explorer: BLOCK_EXPLORER[SupportedChainId.TLOS],
    blockGraph: 'https://telos.apeswapgraphs.com/subgraphs/name/ape-swap/telos-blocks',
    id: '0x411172Dfcd5f68307656A1ff35520841C2F7fAec',
    fee: 0.002,
    color: '#9D68E8',
  },
}

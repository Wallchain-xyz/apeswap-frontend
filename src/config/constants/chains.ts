// Network chain ids
import { SupportedChainId } from '@ape.swap/sdk-core'
import { SmartRouter } from '@ape.swap/sdk'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { icons } from 'components/uikit/Svg/types'
import { BigNumber } from 'ethers'

// List of mainnet chains
// This is currently used for the info page
export const MAINNET_CHAINS = [
  SupportedChainId.BSC,
  SupportedChainId.POLYGON,
  SupportedChainId.MAINNET,
  SupportedChainId.TLOS,
]

// Network Icons
export const NETWORK_ICONS: Partial<Record<SupportedChainId, icons>> = {
  [SupportedChainId.BSC]: icons.BNB_TOKEN,
  [SupportedChainId.POLYGON]: icons.POLYGON_TOKEN,
  [SupportedChainId.MAINNET]: icons.ETH_TOKEN,
  [SupportedChainId.TLOS]: icons.TLOS_TOKEN,
}

// Network labels
export const NETWORK_LABEL: Partial<Record<SupportedChainId, string>> = {
  [SupportedChainId.BSC]: 'BNB',
  [SupportedChainId.BSC_TESTNET]: 'BNB Testnet',
  [SupportedChainId.POLYGON]: 'Polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'Polygon Testnet',
  [SupportedChainId.MAINNET]: 'Ethereum',
  [SupportedChainId.TLOS]: 'Telos',
}

export const NETWORK_INFO_LINK: Partial<Record<SupportedChainId, string>> = {
  [SupportedChainId.BSC]: 'https://info.apeswap.finance',
  [SupportedChainId.BSC_TESTNET]: 'https://info.apeswap.finance',
  [SupportedChainId.POLYGON]: 'https://polygon.info.apeswap.finance/',
  [SupportedChainId.POLYGON_MUMBAI]: 'https://polygon.info.apeswap.finance/',
  [SupportedChainId.MAINNET]: 'https://ethereum.info.apeswap.finance',
  [SupportedChainId.TLOS]: 'https://telos.info.apeswap.finance',
}

// Network RPC nodes
export const NETWORK_RPC: Record<SupportedChainId, string[]> = {
  [SupportedChainId.BSC]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [SupportedChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [SupportedChainId.POLYGON]: ['https://polygon-rpc.com/'],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [SupportedChainId.MAINNET]: ['https://eth-mainnet.nodereal.io/v1/43f9100965104de49b580d1fa1ab28c0'],
  [SupportedChainId.TLOS]: ['https://mainnet.telos.net/evm'],
}

export const RPC_PROVIDERS: Record<SupportedChainId, StaticJsonRpcProvider> = {
  [SupportedChainId.MAINNET]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.MAINNET][0]),
  [SupportedChainId.POLYGON]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.POLYGON][0]),
  [SupportedChainId.BSC]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.BSC][0]),
  [SupportedChainId.TLOS]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.TLOS][0]),
  [SupportedChainId.BSC_TESTNET]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.BSC_TESTNET][0]),
  [SupportedChainId.POLYGON_MUMBAI]: new StaticJsonRpcProvider(NETWORK_RPC[SupportedChainId.POLYGON_MUMBAI][0]),
}

// Network block explorers
export const BLOCK_EXPLORER: Record<SupportedChainId, string> = {
  [SupportedChainId.BSC]: 'https://bscscan.com',
  [SupportedChainId.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [SupportedChainId.POLYGON]: 'https://polygonscan.com',
  [SupportedChainId.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com/',
  [SupportedChainId.MAINNET]: 'https://etherscan.io/',
  [SupportedChainId.TLOS]: 'https://www.teloscan.io',
}

export const CHAIN_PARAMS: Partial<
  Record<
    SupportedChainId,
    {
      chainId: string
      chainName: string
      nativeCurrency: { name: string; symbol: string; decimals: number }
      rpcUrls: string[]
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
    rpcUrls: NETWORK_RPC[SupportedChainId.BSC],
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
    rpcUrls: NETWORK_RPC[SupportedChainId.BSC_TESTNET],
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
    rpcUrls: NETWORK_RPC[SupportedChainId.POLYGON],
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
    rpcUrls: NETWORK_RPC[SupportedChainId.POLYGON_MUMBAI],
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
    rpcUrls: NETWORK_RPC[SupportedChainId.MAINNET],
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
    rpcUrls: NETWORK_RPC[SupportedChainId.TLOS],
    blockExplorerUrls: [BLOCK_EXPLORER[SupportedChainId.TLOS]],
  },
}

export const getChainInfo = (chainId: SupportedChainId): any => {
  if (chainId) {
    return CHAIN_PARAMS[chainId] ?? undefined
  }
  return undefined
}

// Ape price impact cutoff
export const APE_PRICE_IMPACT = 15

// This sets the priority of when a router is used
// After APE router should be in order of highest liquidity
export const PRIORITY_SMART_ROUTERS: Partial<Record<SupportedChainId, SmartRouter[]>> = {
  [SupportedChainId.MAINNET]: [SmartRouter.APE, SmartRouter.SUSHISWAP, SmartRouter.UNISWAP],
  [SupportedChainId.BSC]: [SmartRouter.APE, SmartRouter.PANCAKE, SmartRouter.BISWAP],
  [SupportedChainId.POLYGON]: [SmartRouter.APE, SmartRouter.QUICKSWAP],
  [SupportedChainId.BSC_TESTNET]: [SmartRouter.APE],
  [SupportedChainId.TLOS]: [SmartRouter.APE],
}

// Wallchain Configs
// If a router is in the priority list for a certain chain it must be added to the wallchain params
export const WALLCHAIN_PARAMS: Partial<
  Record<SupportedChainId, Partial<Record<SmartRouter, { apiUrl: string; apiKey: string }>>>
> = {
  [SupportedChainId.BSC]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: '85c578a5-ecb0-445c-8a95-4c0eba2f33b6',
    },
    [SmartRouter.PANCAKE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: 'c5f0eb9a-180b-4787-a5c0-db68292f6926',
    },
    [SmartRouter.BISWAP]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: '1cdb6a88-fc95-4831-906a-9ed0e16c9c52',
    },
  },
  [SupportedChainId.BSC_TESTNET]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: '85c578a5-ecb0-445c-8a95-4c0eba2f33b6',
    },
  },
  [SupportedChainId.POLYGON]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://matic.wallchains.com/upgrade_txn/',
      apiKey: '5cf2b177-5fa5-477a-8cea-f2b54859af2a',
    },
    [SmartRouter.QUICKSWAP]: {
      apiUrl: 'https://matic.wallchains.com/upgrade_txn/',
      apiKey: '31f565ed-7bc1-44f4-8ca7-331897d65132',
    },
  },
  [SupportedChainId.MAINNET]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://eth.wallchains.com/upgrade_txn/',
      apiKey: '498288e3-4c04-40e9-95a7-3ceb3f75096c',
    },
    [SmartRouter.UNISWAP]: {
      apiUrl: 'https://eth.wallchains.com/upgrade_txn/',
      apiKey: 'ff1e792c-b199-4393-8385-40e533e3687a',
    },
    [SmartRouter.SUSHISWAP]: {
      apiUrl: 'https://eth.wallchains.com/upgrade_txn/',
      apiKey: 'e04868d1-c99d-4bb3-9af9-fb2336310eaa',
    },
  },
  [SupportedChainId.TLOS]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://tlos.wallchains.com/upgrade_txn/',
      apiKey: '1717a226-bb5a-42c4-ad37-6de5229f9e28',
    },
  },
}

// Dont use bonus router if the bonus is lower than the cutoff
export const BONUS_CUTOFF_AMOUNT: Partial<Record<SupportedChainId, number>> = {
  [SupportedChainId.BSC]: 0.5,
  [SupportedChainId.BSC_TESTNET]: 0,
  [SupportedChainId.POLYGON]: 0,
  [SupportedChainId.MAINNET]: 0,
  [SupportedChainId.TLOS]: 0,
}

// To display correct prices for each liquidity pool when need to swap the contract out
// Routers in prioirty list must be in here
export const SMART_PRICE_GETTERS: Partial<Record<SupportedChainId, Partial<Record<SmartRouter, string>>>> = {
  [SupportedChainId.BSC]: {
    [SmartRouter.APE]: '0x5e545322b83626c745FE46144a15C00C94cBD803',
    [SmartRouter.PANCAKE]: '0xF724471B00B5fACBA78D195bD241d090350a04Bd',
    [SmartRouter.BISWAP]: '0x1828e426fF3ec9E037cff888CB13f84d5e95F4eF',
  },
  [SupportedChainId.BSC_TESTNET]: {
    [SmartRouter.APE]: '0xd722f9A2950E35Ab3EeD1d013c214671750A638B',
  },
  [SupportedChainId.POLYGON]: {
    [SmartRouter.APE]: '0x05D6C73D7de6E02B3f57677f849843c03320681c',
    [SmartRouter.QUICKSWAP]: '0xEe57c38d678CaE0cE16168189dB47238d8fe6553',
  },
  [SupportedChainId.MAINNET]: {
    [SmartRouter.APE]: '0x5fbFd1955EeA2F62F1AfD6d6E92223Ae859F7887',
    [SmartRouter.UNISWAP]: '0x0187D959A28B0D3B490c2D898fA1CcD054cCC3cd',
    [SmartRouter.SUSHISWAP]: '0x51FA9ed2908C76f51fDDA7fa0F6a1d57557668b2',
  },
  [SupportedChainId.TLOS]: {
    [SmartRouter.APE]: '0x29392efed565c13a0901aeb88e32bf58eeb8a067',
  },
}

export const SMART_LP_FEES: Partial<Record<SupportedChainId, Partial<Record<SmartRouter, number>>>> = {
  [SupportedChainId.BSC]: {
    [SmartRouter.APE]: 20,
    [SmartRouter.PANCAKE]: 25,
    [SmartRouter.BISWAP]: 10,
  },
  [SupportedChainId.BSC_TESTNET]: {
    [SmartRouter.APE]: 20,
  },
  [SupportedChainId.POLYGON]: {
    [SmartRouter.APE]: 20,
    [SmartRouter.QUICKSWAP]: 30,
  },
  [SupportedChainId.MAINNET]: {
    [SmartRouter.APE]: 20,
    [SmartRouter.UNISWAP]: 30,
    [SmartRouter.SUSHISWAP]: 25,
  },
  [SupportedChainId.TLOS]: {
    [SmartRouter.APE]: 20,
  },
}

// Block times
export const CHAIN_BLOCKS_PER_YEAR: Partial<Record<SupportedChainId, BigNumber>> = {
  [SupportedChainId.BSC]: BigNumber.from(10512000),
  [SupportedChainId.POLYGON]: BigNumber.from(13711304),
  [SupportedChainId.MAINNET]: BigNumber.from(2628000),
  [SupportedChainId.TLOS]: BigNumber.from(63072000),
}

// Chef addresses for the LP migrator
export const CHEF_ADDRESSES = {
  [SupportedChainId.BSC]: {
    '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652': SmartRouter.PANCAKE,
    '0xDbc1A13490deeF9c3C12b44FE77b503c1B061739': SmartRouter.BISWAP,
  },
}

export const SMART_ROUTER_FULL_NAME = {
  [SmartRouter.PANCAKE]: 'PancakeSwap',
  [SmartRouter.BISWAP]: 'Biswap',
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
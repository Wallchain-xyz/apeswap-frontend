import { SupportedChainId } from '@ape.swap/sdk-core'

export const UNI_LIST = 'https://tokens.uniswap.org'

const NFT_INDEX = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/nftindex.json'
const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
const PANCAKE_100 = 'https://tokens.pancakeswap.finance/pancakeswap-top-100.json'
const QUICKSWAP = 'https://unpkg.com/quickswap-default-token-list@1.2.18/build/quickswap-default.tokenlist.json'
const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [UNI_LIST]
export const DEFAULT_INACTIVE_LIST_URLS: string[] = [
  NFT_INDEX,
  QUICKSWAP,
  PANCAKE_100,
  COINGECKO_LIST,
  CMC_ALL_LIST,
  PANCAKE_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

export const DEFAULT_LIST_OF_LISTS: string[] = [...DEFAULT_ACTIVE_LIST_URLS, ...DEFAULT_INACTIVE_LIST_URLS]

interface ExtendedListType {
  name: string
  warning?: string
  logo: string
  chainId?: SupportedChainId
}

// Original list name
export const EXTENDED_LIST_DETAILS: Record<string, ExtendedListType> = {
  'PancakeSwap Extended': {
    name: 'BNB Top 300',
    warning:
      'The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Not all tokens on this list have been reviewed by ApeSwap or passed our due diligence process. Some tokens on this list may present scam risks, including the loss of funds.',
    logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/WBNB.svg',
    chainId: SupportedChainId.BSC,
  },
  'Quickswap Token List': {
    name: 'Polygon List',
    warning:
      'The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Not all tokens on this list have been reviewed by ApeSwap or passed our due diligence process. Some tokens on this list may present scam risks, including the loss of funds.',
    logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/MATIC.svg',
    chainId: SupportedChainId.POLYGON,
  },
  'PancakeSwap Top 100': {
    name: 'BNB Top 100',
    warning:
      'The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Not all tokens on this list have been reviewed by ApeSwap or passed our due diligence process. Some tokens on this list may present scam risks, including the loss of funds.',
    logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/WBNB.svg',
    chainId: SupportedChainId.BSC,
  },
  'LICO Index List': {
    name: 'LICO Index List',
    logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/LICO.svg',
    chainId: SupportedChainId.BSC,
  },
}

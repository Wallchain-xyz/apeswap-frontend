import { SupportedChainId } from '@ape.swap/sdk-core'

export const UNI_LIST = 'https://tokens.uniswap.org'
const UNI_EXTENDED_LIST = 'https://extendedtokens.uniswap.org/'

const APESWAP = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/apeswap.json'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
const NFT_INDEX = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/nftindex.json'
const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
const PANCAKE_100 = 'https://tokens.pancakeswap.finance/pancakeswap-top-100.json'
const QUICKSWAP = 'https://unpkg.com/quickswap-default-token-list@1.2.18/build/quickswap-default.tokenlist.json'
const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
const KLEROS_LIST = 't2crtokens.eth'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
const AAVE_LIST = 'tokenlist.aave.eth'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [APESWAP, UNI_LIST]
export const DEFAULT_INACTIVE_LIST_URLS: string[] = [
  NFT_INDEX,
  QUICKSWAP,
  PANCAKE_100,
  COINGECKO_LIST,
  CMC_ALL_LIST,
  PANCAKE_EXTENDED,
  GEMINI_LIST,
  KLEROS_LIST,
  SET_LIST,
  UNI_EXTENDED_LIST,
  COMPOUND_LIST,
  AAVE_LIST,
  WRAPPED_LIST,
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

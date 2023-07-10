import { SupportedChainId } from '@ape.swap/sdk-core'

export interface HomepageDTO {
  totalBondsSold?: number
  totalBondedValue?: number
  totalTradeVolume?: number
  totalValueLocked?: number
  partnerCount?: number
  bonds?: BondDTO[]
  farms?: FarmDTO[]
  tokens?: TokenDTO[]
}

interface BondDTO extends Bond {
  isFeatured: boolean
  launchDate: string
}

interface FarmDTO extends Farm {
  isBlueChip: boolean
  launchDate: string
}

interface TokenDTO {
  chainId: SupportedChainId
  launchDate: string
  priceChange24h: number
  priceHistory: number[]
  tokenTicker: string
  tokenPrice: number
  volume24h: number
}

interface Bond {
  chainId: SupportedChainId
  type: string
  billAddress: string
  principalToken: string
  principalTokenName: string
  principalTokenType: string
  payoutToken: string
  payoutTokenName?: string
  discount?: number
  link: string
  billNftAddress: string
  inactive?: boolean
}

interface Farm extends BasePool {
  dualReward?: TokenData
  lpRewards?: {
    volume: number
    apr: number
    liquidity: string
  }
  type: 'mav2' | 'jungle' | 'dual'
  version?: number
}

interface Pool extends BasePool {
  type: 'pool' | 'native' | 'auto'
}

interface BasePool {
  id: number
  poolIndex?: number
  chainId: SupportedChainId
  apr: number
  name: string
  address?: string
  staked: TokenData
  reward: TokenData
  abi?: any
}

interface TokenData {
  name: string
  address: string
  symbol: string
  decimals: SupportedChainId
  type?: 'lp' | 'single'
  amount?: number
  price?: number
  tvl?: number
}

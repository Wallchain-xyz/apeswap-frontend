export interface TvlStats {
  tvl: number
  marketCap: number
  circulatingSupply: number
  gnanaCirculatingSupply: number
  burntAmount: number
  totalVolume: number
  partnerCount?: number
  bondingPartnerCount?: number
}

import { SupportedChainId } from '@ape.swap/sdk-core'

export enum BondsStats {
  TotalBondsSold = 'totalBondsSold',
  TotalBondedValue = 'totalBondedValue',
  TotalTradeVolume = 'totalTradeVolume',
  TotalValueLocked = 'totalValueLocked',
}

export interface SortedTokens {
  trending?: TokenDTO[]
  mostTraded?: TokenDTO[]
  new?: TokenDTO[]
}

export interface SortedFarms {
  blueChips?: FarmDTO[]
  highestYield?: FarmDTO[]
}

export interface HomepageDTO {
  [BondsStats.TotalBondsSold]: number
  [BondsStats.TotalBondedValue]: number
  [BondsStats.TotalTradeVolume]: number
  [BondsStats.TotalValueLocked]: number
  partnerCount?: number
  bonds?: BondDTO[]
  farms?: SortedFarms
  tokens?: SortedTokens
}

export interface BondDTO extends Bond {
  isFeatured: boolean
  isNew: boolean
  launchDate: number
}

interface Decimals {
  [key: number]: string
}

interface Stake {
  address: string
  decimals: Decimals
  symbol: string
}
export interface FarmDTO extends Farm {
  isBlueChip: boolean
  launchDate: number
  pid: number
  stake: Stake
}

export interface TokenDTO {
  chainId: SupportedChainId
  isNew: boolean
  isMostTraded: boolean
  isMostPriceChanged: boolean
  launchDate: number
  priceChange24h: number
  priceHistory: number[]
  tokenAddress: string
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

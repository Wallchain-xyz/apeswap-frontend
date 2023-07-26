interface TokenAddress {
  address: string
  chainId: string
}

interface ProfileLinks {
  siteUrl: string
  twitterUrl: string
  telegramUrl: string
  discordUrl: string
}

interface BaseToken {
  address: string
  name: string
  symbol: string
  tokenLogoUrl?: string
}

interface QuoteToken {
  address: string
  name: string
  symbol: string
  tokenLogoUrl?: string
}

interface LiquidityPool {
  chainId: string
  chainName?: string
  dex: string
  lpAddress: string
  baseToken: BaseToken
  quoteToken: QuoteToken
  baseTokenPriceUsd: number
  quoteTokenPriceUsd: number
  pairTotalLiquidityUsd: number
  pairExtractableLiquidityUsd: number
  isHardAssetPair: boolean
  liquidityOwners: any[] // Replace 'any' with the actual type if known.
  tags: string[]
  nValue: number
}

export interface HistoricTokenData {
  addressMapping: {
    tokenSymbol: string
    tokenName: string
    tokenLogoUrl: string
    cloudinaryLogoUrl?: string
    tokenAddresses: TokenAddress[]
    knownOwners: any[] // Replace 'any' with the actual type if known.
    tags: string[]
    profileLinks?: ProfileLinks
    isHardAsset?: boolean
    isPrioritized?: boolean
    isExempted?: boolean
    lastAddressMappingUpdate: string
    lastTokenProfileUpdate: string
    lastSuspectedOwnerSearch: string
    lastMarketCapAboveThreshold?: string
  }
  mcap: {
    amount: number | null
    source: string
  }[]
  priceChange24hr: number | null
  totalLiquidity: number
  extractableLiquidity: number
  ownedExtractableLiquidity?: number
  healthScore: number
  concentrationScore: number
  ownershipScore: number
  totalScore: number
  totalValidLiquidity: number
  totalExtractableLiquidity: number
  ownedLiquidity: number
  validOwnedLiquidity?: number
  ownedLiquidityPercentage: number
  circulatingSupply: {
    amount: number | null
    source: string
  }[]
  currentPrice: {
    amount: number | null
    source: string
  }[]
  totalSupply: {
    amount: number | null
    source: string
  }[]
  maxSupply: {
    amount: number
    source: string
  }[]
  liquidityPools: LiquidityPool[]
  formulaVersion: string
  unlockedSupply?: number
  createdAt: string
  __v: number
}

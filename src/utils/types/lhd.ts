export interface IndustryStats {
  averageConcentrationScore: number
  averageHealthScore: number
  averageOwnershipScore: number
  averageTotalScore: number
  chainsSupported: number
  coefficients: {
    concentration: number
    health: number
    ownership: number
  }
  createdAt: string
  evmCoverage: string
  formulaVersion: string
  tokensTracked: number
  tokensVerified: number
}

export interface ExternalDataOption {
  amount: number
  source: 'cmc' | 'cg' | 'self-reported-cmc'
}

export interface TokenAddress {
  address: string // SHOULD ALWAYS BE LOWERCASE
  chainId: string
}

export interface TokenProfileLinks {
  siteUrl: string
  twitterUrl: string
  telegramUrl: string
  discordUrl: string
  auditUrls: string[]
}
export interface AddressMapping {
  tokenSymbol: string
  tokenName: string
  tokenLogoUrl: string
  cloudinaryLogoUrl?: string
  tokenAddresses: TokenAddress[]
  knownOwners?: string[]
  tags?: string[]
  profileLinks?: TokenProfileLinks
  isHardAsset?: boolean
  isExempted?: boolean
  lastAddressMappingUpdate?: string // The last time the address mapping was changed (e.g., new address added, info updated)
  lastTokenProfileUpdate?: string // The last time the token had a profile refresh
  lastSuspectedOwnerSearch?: string // The last time we looked for suspected owners for this token
}
export interface SimpleTokenProfile {
  addressMapping: AddressMapping
  mcap: ExternalDataOption[]
  priceChange24hr: number
  totalLiquidity: number
  extractableLiquidity: number
  healthScore: number
  concentrationScore: number
  ownershipScore: number
  totalScore: number
  ranking: number
}
export interface LHDProfiles {
  count: number
  data: SimpleTokenProfile[]
}

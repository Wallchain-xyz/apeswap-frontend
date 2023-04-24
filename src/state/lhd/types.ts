export interface TokenAddress {
  address: string; // SHOULD ALWAYS BE LOWERCASE
  chainId: string;
}

export interface TokenProfileLinks {
  siteUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  discordUrl: string;
  auditUrls: string[];
}
export interface AddressMapping {
  tokenSymbol: string;
  tokenName: string;
  tokenLogoUrl: string;
  tokenAddresses: TokenAddress[];
  knownOwners?: string[];
  tags?: string[];
  profileLinks?: TokenProfileLinks;
  isHardAsset?: boolean;
  lastAddressMappingUpdate?: string; // The last time the address mapping was changed (e.g., new address added, info updated)
  lastTokenProfileUpdate?: string; // The last time the token had a profile refresh
  lastSuspectedOwnerSearch?: string; // The last time we looked for suspected owners for this token
}

export interface ExternalDataOption {
  amount: number;
  source: 'cmc' | 'cg' | 'self-reported-cmc';
}

export interface SimpleTokenProfile {
  addressMapping: AddressMapping;
  mcap: ExternalDataOption[];
  priceChange24hr: number;
  totalLiquidity: number;
  extractableLiquidity: number;
  healthScore: number;
  concentrationScore: number;
  ownershipScore: number;
  totalScore: number;
}

export interface TokenProfile extends SimpleTokenProfile {
  totalValidLiquidity: number;
  totalExtractableLiquidity: number;
  ownedLiquidity: number;
  ownedLiquidityPercentage: number;
  circulatingSupply: ExternalDataOption[];
  currentPrice: ExternalDataOption[];
  totalSupply: ExternalDataOption[];
  liquidityPools: LiquidityPool[];
  formulaVersion: string;
  createdAt: string;
  unlockedSupply: number;
}

export interface LiquidityPool {
  chainId: string;
  dex: string;
  lpAddress: string;
  baseToken: DexScreenerToken;
  quoteToken: DexScreenerToken;
  baseTokenPriceUsd?: number;
  quoteTokenPriceUsd?: number;
  pairTotalLiquidityUsd: number;
  pairExtractableLiquidityUsd: number;
  pairOwnedLiquidityUsd?: number;
  isHardAssetPair?: boolean;
  tags?: string[];
  nValue?: number;
  liquidityOwners: LiquidityOwner[];
}

export type DexScreenerToken = {
  address: string;
  name: string;
  symbol: string;
};

export interface LiquidityOwner {
  walletAddress: string;
  amount: number;
}
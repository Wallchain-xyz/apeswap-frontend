export interface HomepageData {
  tvl: number
  marketCap: number
  circulatingSupply: number
  gnanaCirculatingSupply: number
  burntAmount: number
  totalVolume: number
  partnerCount?: number
  bondingPartnerCount?: number
}

export interface HomepageTokenStats {
  tokenTicker: string
  tokenPrice: number
  percentChange: number
  contractAddress: string
  logoUrl: string
}

export interface LaunchCalendarCard {
  image1: any
  image2?: any
  textLine1: string
  textLine2?: string
  textLine3?: string
  launchTime: string
}

export interface NewsCardType {
  id: number
  cardPosition: number
  cardImageUrl: any
  CardLink: string
  StartTime: string
  EndTime: string
  isModal: boolean
}

export interface ServiceData {
  id: number
  apr?: number
  apy?: number
  discount?: number
  link: string
  marketName?: string
  marketAddress?: string
  lpTokenName?: string
  earnTokenName?: string
  stakeToken?: {
    name: string
    address: string
  }
  rewardToken?: {
    name: string
    address: string
  }
  token?: {
    name: string
    address: string
  }
}

export interface HomepageState {
  homepageData: HomepageData | null
  homepageTokenStats: HomepageTokenStats[] | null
  homepageNews: NewsCardType[] | null
  homepageLaunchCalendar: LaunchCalendarCard[] | null
  homepageServiceStats: ServiceData | null
}

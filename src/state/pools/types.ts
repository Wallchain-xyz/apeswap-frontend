export interface Token {
  symbol: string
  address?: string
  decimals?: number
  dontFetch?: boolean
  lpToken?: boolean
  price?: number
  active?: boolean
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingToken: Token
  stakingLimit?: number
  bonusEndBlock?: number
  rewardToken: Token
  contractAddress: string
  projectLink: string
  twitter?: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  reflect?: boolean
  isFinished?: boolean
  tokenDecimals: number
  displayDecimals?: number
  lpStaking?: boolean
  lpTokens?: {
    token: Token
    quoteToken: Token
  }
  forAdmins?: boolean
  emergencyWithdraw?: boolean
  isEarnTokenLp?: boolean
}

export interface Pool extends PoolConfig {
  totalStaked?: string
  startBlock?: number
  endBlock?: number
  apr?: number
  userData?: {
    allowance: string
    stakingTokenBalance: string
    stakedBalance: string
    pendingReward: string
  }
  lpData?: any
}

export interface PoolsState {
    data: Pool[]
  }
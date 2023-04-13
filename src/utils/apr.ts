import { SupportedChainId } from '@ape.swap/sdk-core'
import { CHAIN_BLOCKS_PER_YEAR } from 'config/constants/chains'
import BigNumber from 'bignumber.js'

export const BANANA_PER_BLOCK = new BigNumber(10)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const SECONDS_PER_YEAR = new BigNumber(31536000)
export const BANANA_PER_YEAR = BANANA_PER_BLOCK.times(BLOCKS_PER_YEAR)

export const getPoolApr = (
  chainId: number,
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: string,
): number | undefined => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
    .times(tokenPerBlock)
    .times(new BigNumber(CHAIN_BLOCKS_PER_YEAR[chainId as SupportedChainId]?.toString() ?? 0))
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr ? apr.toNumber() : undefined
}

export const getPoolAprPerSecond = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  rewardsPerSecond: string,
): number | undefined => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(rewardsPerSecond).times(SECONDS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr ? apr.toNumber() : undefined
}

export const getDualFarmApr = (
  poolLiquidityUsd: number,
  miniChefRewardTokenPrice: number,
  miniChefTokensPerSecond: string,
  rewarerdTokenPrice: number,
  rewarderTokensPerSecond: string,
): number | undefined => {
  const totalRewarderRewardPricePerYear = new BigNumber(rewarerdTokenPrice)
    .times(rewarderTokensPerSecond)
    .times(SECONDS_PER_YEAR)
  const totalMiniChefRewardPricePerYear = new BigNumber(miniChefRewardTokenPrice)
    .times(miniChefTokensPerSecond)
    .times(SECONDS_PER_YEAR)
  const totalRewardsPerYear = totalMiniChefRewardPricePerYear.plus(totalRewarderRewardPricePerYear)
  const apr = totalRewardsPerYear.div(poolLiquidityUsd).times(100)
  return apr ? apr.toNumber() : undefined
}

export const getFarmApr = (
  poolWeight: BigNumber,
  bananaPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
): number | undefined => {
  const yearlyBananaRewardAllocation = BANANA_PER_YEAR.times(poolWeight).times(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation.div(poolLiquidityUsd).times(100)
  return apr ? apr.toNumber() : undefined
}

export const getFarmV2Apr = (
  poolWeight: BigNumber,
  bananaPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  bananaPerYear?: BigNumber,
): number | undefined => {
  const yearlyBananaRewardAllocation = bananaPerYear?.times(poolWeight).times(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation?.div(poolLiquidityUsd).times(100)
  return apr ? apr.toNumber() : undefined
}

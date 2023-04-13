import { SupportedChainId } from '@ape.swap/sdk-core'
import { CHAIN_BLOCKS_PER_YEAR } from 'config/constants/chains'
import { BigNumber } from 'ethers'

export const BANANA_PER_BLOCK = BigNumber.from(10)
export const BLOCKS_PER_YEAR = BigNumber.from(10512000)
export const SECONDS_PER_YEAR = BigNumber.from(31536000)
export const BANANA_PER_YEAR = BANANA_PER_BLOCK.mul(BLOCKS_PER_YEAR)

export const getPoolApr = (
  chainId: number,
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: string,
): number | undefined => {
  const totalRewardPricePerYear = BigNumber.from(rewardTokenPrice)
    .mul(tokenPerBlock)
    .mul(CHAIN_BLOCKS_PER_YEAR[chainId as SupportedChainId] ?? 0)
  const totalStakingTokenInPool = BigNumber.from(stakingTokenPrice).mul(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).mul(100)
  return apr ? apr.toNumber() : undefined
}

export const getPoolAprPerSecond = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  rewardsPerSecond: string,
): number | undefined => {
  const totalRewardPricePerYear = BigNumber.from(rewardTokenPrice).mul(rewardsPerSecond).mul(SECONDS_PER_YEAR)
  const totalStakingTokenInPool = BigNumber.from(stakingTokenPrice).mul(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).mul(100)
  return apr ? apr.toNumber() : undefined
}

export const getDualFarmApr = (
  poolLiquidityUsd: number,
  miniChefRewardTokenPrice: number,
  miniChefTokensPerSecond: string,
  rewarerdTokenPrice: number,
  rewarderTokensPerSecond: string,
): number | undefined => {
  const totalRewarderRewardPricePerYear = BigNumber.from(rewarerdTokenPrice)
    .mul(rewarderTokensPerSecond)
    .mul(SECONDS_PER_YEAR)
  const totalMiniChefRewardPricePerYear = BigNumber.from(miniChefRewardTokenPrice)
    .mul(miniChefTokensPerSecond)
    .mul(SECONDS_PER_YEAR)
  const totalRewardsPerYear = totalMiniChefRewardPricePerYear.add(totalRewarderRewardPricePerYear)
  const apr = totalRewardsPerYear.div(poolLiquidityUsd).mul(100)
  return apr ? apr.toNumber() : undefined
}

export const getFarmApr = (
  poolWeight: BigNumber,
  bananaPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
): number | undefined => {
  const yearlyBananaRewardAllocation = BANANA_PER_YEAR.mul(poolWeight).mul(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation.div(poolLiquidityUsd).mul(100)
  return apr ? apr.toNumber() : undefined
}

export const getFarmV2Apr = (
  poolWeight: BigNumber,
  bananaPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  bananaPerYear?: BigNumber,
): number | undefined => {
  const yearlyBananaRewardAllocation = bananaPerYear?.mul(poolWeight).mul(bananaPriceUsd)
  const apr = yearlyBananaRewardAllocation?.div(poolLiquidityUsd).mul(100)
  return apr ? apr.toNumber() : undefined
}

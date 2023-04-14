import BigNumber from 'bignumber.js'
import { Farm } from '../types'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { getPoolApr, getPoolAprPerSecond } from 'utils/apr'
import { getBalanceNumber } from 'utils/getBalanceNumber'

const cleanJungleFarmData = (
  farmIds: string[],
  chunkedFarms: any[],
  tokenPrices: TokenPrices[],
  chainId: number,
  jungleFarmsConfig: Farm[],
) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = jungleFarmsConfig.find((farm) => farm.id === farmIds[index])
    const [startBlock, endBlock, totalStaked] = chunk

    const totalStakedFormatted = new BigNumber(totalStaked).toJSON()
    const [stakingToken, rewardToken, apr] = fetchJungleFarmTokenStatsAndApr(
      farmConfig,
      tokenPrices,
      totalStakedFormatted,
      chainId,
    )

    return {
      jungleId: farmIds[index],
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: farmConfig?.bonusEndBlock || new BigNumber(endBlock).toJSON(),
      totalStaked: totalStakedFormatted,
      stakingToken,
      rewardToken,
      apr,
    }
  })
  return data
}

const fetchJungleFarmTokenStatsAndApr = (
  farm: Farm | undefined,
  tokenPrices: TokenPrices[],
  totalStaked: any,
  chainId: number,
) => {
  // Get values needed to calculate apr
  const curFarm = farm
  const rewardToken = tokenPrices
    ? tokenPrices.find(
        (token) =>
          farm?.rewardToken && token?.address?.[chainId] === farm?.rewardToken?.address?.[chainId as SupportedChainId],
      )
    : farm?.rewardToken
  const stakingToken = tokenPrices
    ? tokenPrices.find((token) => token?.address?.[chainId] === farm?.lpStakeTokenAddress)
    : undefined
  // Calculate apr
  const apr = farm?.rewardsPerSecond
    ? getPoolAprPerSecond(
        stakingToken?.price ?? 0,
        rewardToken?.price ?? 0,
        getBalanceNumber(totalStaked),
        curFarm?.rewardsPerSecond ?? '0',
      )
    : getPoolApr(
        chainId,
        stakingToken?.price ?? 0,
        rewardToken?.price ?? 0,
        getBalanceNumber(totalStaked),
        curFarm?.tokensPerBlock ?? '0',
      )

  return [stakingToken, rewardToken, apr]
}

export default cleanJungleFarmData

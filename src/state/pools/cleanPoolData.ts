import { TokenPrices } from 'hooks/useAllTokenPrices'
import { Pool, PoolConfig } from './types'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { getFarmV2Apr, getPoolApr } from 'utils/apr'
import { BigNumber } from 'ethers'

const cleanPoolData = (
  poolIds: number[],
  chunkedPools: any[],
  tokenPrices: TokenPrices[],
  chainId: number,
  poolsConfig: Pool[],
  bananaAlloc: any,
  bananaPerYear: any,
) => {
  const data = chunkedPools.map((chunk, index) => {
    const poolConfig = poolsConfig.find((pool) => pool.sousId === poolIds[index])
    const [startBlock, endBlock, totalStaked] = chunk
    const totalStakedFormatted = BigNumber.from(totalStaked).toJSON()
    const [stakingToken, rewardToken, apr] = fetchPoolTokenStatsAndApr(
      poolConfig,
      tokenPrices,
      totalStakedFormatted,
      chainId,
      bananaAlloc,
      bananaPerYear,
    )
    return {
      sousId: poolIds[index],
      startBlock: BigNumber.from(startBlock).toJSON(),
      endBlock: poolConfig?.bonusEndBlock || BigNumber.from(endBlock).toJSON(),
      totalStaked: totalStakedFormatted,
      stakingToken: { ...poolConfig?.stakingToken, ...stakingToken },
      rewardToken: { ...poolConfig?.rewardToken, ...rewardToken },
      apr,
    }
  })
  return data
}

const fetchPoolTokenStatsAndApr = (
  pool: PoolConfig | undefined,
  tokenPrices: TokenPrices[],
  totalStaked: any,
  chainId: number,
  bananaAlloc: any,
  bananaPerYear: any,
): [any, any, any] => {
  // Get values needed to calculate apr
  const curPool = pool
  const rewardToken = tokenPrices
    ? tokenPrices.find(
        (token) => pool?.rewardToken && token?.address?.[chainId] === pool?.rewardToken?.address?.[chainId],
      )
    : pool?.rewardToken
  const stakingToken = tokenPrices
    ? tokenPrices.find((token) => token?.address?.[chainId] === pool?.stakingToken?.address?.[chainId])
    : pool?.stakingToken
  // Calculate apr
  let apr
  if (pool?.sousId === 0) {
    apr = getFarmV2Apr(
      bananaAlloc,
      BigNumber.from(stakingToken?.price),
      BigNumber.from(getBalanceNumber(totalStaked) * (stakingToken?.price ?? 0)),
      bananaPerYear,
    )
  } else {
    apr = getPoolApr(
      chainId,
      stakingToken?.price ?? 0,
      rewardToken?.price ?? 0,
      getBalanceNumber(totalStaked),
      curPool?.tokenPerBlock ?? '0',
    )
  }
  return [stakingToken, rewardToken, apr]
}

export default cleanPoolData

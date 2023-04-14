import BigNumber from 'bignumber.js'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { FarmLpAprsType } from 'state/stats/types'
import { Farm } from '../types'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { getDualFarmApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { SupportedChainId } from '@ape.swap/sdk-core'

const cleanDualFarmData = (
  farmIds: string[],
  chunkedFarms: any[],
  tokenPrices: TokenPrices[],
  bananaPrice: BigNumber,
  farmLpAprs: FarmLpAprsType | undefined,
  chainId: SupportedChainId,
  dualFarms: Farm[],
) => {
  const data = chunkedFarms.map((chunk, index) => {
    const dualFarmConfig = dualFarms?.find((farm) => farm.id === farmIds[index])
    const quoteToken = tokenPrices?.find((token) => token.address === dualFarmConfig?.tokenAddress)
    const token1 = tokenPrices?.find((token) => token.address === dualFarmConfig?.quoteTokenAddress)
    const miniChefRewarderToken = tokenPrices?.find(
      (token) => token.address === dualFarmConfig?.rewardToken.address?.[chainId],
    )
    const rewarderToken = tokenPrices?.find(
      (token) => token.address === dualFarmConfig?.secondRewardToken?.address[chainId],
    )
    const lpApr = (farmLpAprs?.lpAprs?.find((lp) => lp.pid === dualFarmConfig?.pid)?.lpApr ?? 0) * 100

    const [
      quoteTokenBalanceLP,
      tokenBalanceLP,
      lpTokenBalanceMC,
      lpTotalSupply,
      info,
      totalAllocPoint,
      miniChefRewardsPerSecond,
      rewarderInfo,
      rewardsPerSecond,
      rewarderTotalAlloc,
    ] = chunk

    // Ratio in % a LP tokens that are in staking, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

    // Total value in staking in quote token value
    const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(18))
      .times(new BigNumber(2))
      .times(lpTokenRatio)

    // Total value in pool in quote token value
    const totalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals ?? 18))
      .times(new BigNumber(2))

    // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
    const tokenAmount = new BigNumber(tokenBalanceLP)
      .div(new BigNumber(10).pow(token1?.decimals ?? 18))
      .times(lpTokenRatio)
    const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals ?? 18))
      .times(lpTokenRatio)

    let alloc = null
    let multiplier = 'unset'
    let miniChefPoolRewardPerSecond = null

    const allocPoint = new BigNumber(info.allocPoint._hex)
    const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
    miniChefPoolRewardPerSecond = getBalanceNumber(
      poolWeight.times(miniChefRewardsPerSecond),
      miniChefRewarderToken?.decimals ?? 18,
    )
    alloc = poolWeight.toJSON()
    multiplier = `${allocPoint.div(100).toString()}X`

    const totalStaked = quoteTokenAmount.times(new BigNumber(2)).times(quoteToken?.price ?? 0)
    const totalValueInLp = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals ?? 18))
      .times(new BigNumber(2))
      .times(quoteToken?.price ?? 0)
    const stakeTokenPrice = totalValueInLp.div(new BigNumber(getBalanceNumber(lpTotalSupply))).toNumber()

    const rewarderAllocPoint = new BigNumber(rewarderInfo?.allocPoint?._hex)
    let rewarderPoolWeight = null

    if (dualFarmConfig?.contractAddress === '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf') {
      rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(10000))
    } else {
      rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(rewarderTotalAlloc))
    }
    const rewarderPoolRewardPerSecond = getBalanceNumber(
      rewarderPoolWeight.times(rewardsPerSecond),
      rewarderToken?.decimals ?? 18,
    )
    const apr = getDualFarmApr(
      totalStaked?.toNumber(),
      miniChefRewarderToken?.price ?? 0,
      miniChefPoolRewardPerSecond?.toString(),
      rewarderToken?.price ?? 0,
      rewarderPoolRewardPerSecond?.toString(),
    )

    const amountEarned = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: lpApr ? (apr ?? 0) + lpApr : apr,
      tokenPrice: bananaPrice,
    })

    const apy = getRoi({ amountEarned, amountInvested: 1000 / bananaPrice?.toNumber() }).toFixed(2)

    return {
      ...dualFarmConfig,
      tokenAmount: tokenAmount.toJSON(),
      totalStaked: totalStaked.toFixed(0),
      quoteTokenAmount: quoteTokenAmount.toJSON(),
      totalInQuoteToken: totalInQuoteToken.toJSON(),
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
      stakeTokenPrice,
      rewardToken0Price: miniChefRewarderToken?.price,
      rewardToken1Price: rewarderToken?.price,
      lpApr,
      poolWeight: alloc,
      // TODO Remove - HIDE MATIC/CRYTL farm with 1 alloc point while SINGULAR Vault withdraws
      multiplier,
      apr,
      apy,
    }
  })
  return data
}

export default cleanDualFarmData

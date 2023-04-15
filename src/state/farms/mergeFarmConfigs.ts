import { dualFarms, farms, farmsV2, jungleFarms, tokens } from '@ape.swap/apeswap-lists'
import { FarmTypes } from './types'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { MAINNET_CHAINS } from 'config/constants/chains'
import { uniqueId } from 'lodash'

const mergeFarmObj: any = {}

const mergeFarmConfigs = () => {
  const mergedFarms = MAINNET_CHAINS.map((chainId) => {
    return {
      chainId,
      farms: [
        ...farms.flatMap(
          ({
            pid,
            lpAddresses,
            lpSymbol,
            tokenAddresses,
            tokenSymbol,
            quoteTokenAdresses,
            quoteTokenSymbol,
            projectLink,
          }) => {
            return chainId === SupportedChainId.BSC
              ? {
                  id: uniqueId(FarmTypes.MASTER_CHEF_V1),
                  pid,
                  farmType: FarmTypes.MASTER_CHEF_V1,
                  lpStakeTokenAddress: lpAddresses[SupportedChainId.BSC] ?? '',
                  lpStakeTokenSymbol: lpSymbol ?? '',
                  tokenAddress: tokenAddresses[SupportedChainId.BSC] ?? '',
                  tokenSymbol,
                  quoteTokenAddress: quoteTokenAdresses[SupportedChainId.BSC] ?? '',
                  quoteTokenSymbol,
                  rewardToken: tokens.banana,
                  projectLink,
                }
              : []
          },
        ),
        ...farmsV2.flatMap(
          ({
            pid,
            lpAddresses,
            lpSymbol,
            tokenAddresses,
            tokenSymbol,
            quoteTokenAdresses,
            quoteTokenSymbol,
            projectLink,
          }) => {
            return chainId === SupportedChainId.BSC
              ? {
                  id: uniqueId(FarmTypes.MASTER_CHEF_V2),
                  pid,
                  farmType: FarmTypes.MASTER_CHEF_V2,
                  lpStakeTokenAddress: lpAddresses[SupportedChainId.BSC] ?? '',
                  lpStakeTokenSymbol: lpSymbol ?? '',
                  tokenAddress: tokenAddresses[SupportedChainId.BSC] ?? '',
                  tokenSymbol,
                  quoteTokenAddress: quoteTokenAdresses[SupportedChainId.BSC] ?? '',
                  quoteTokenSymbol,
                  rewardToken: tokens.banana,
                  projectLink,
                }
              : []
          },
        ),
        ...jungleFarms.flatMap(
          ({
            contractAddress,
            jungleId,
            stakingToken,
            rewardToken,
            lpTokens,
            rewardsPerSecond,
            bonusEndBlock,
            tokenPerBlock,
            projectLink,
            twitter,
          }) => {
            return contractAddress?.[chainId] !== undefined
              ? {
                  id: uniqueId(FarmTypes.JUNLGE_FARM),
                  pid: jungleId,
                  farmType: FarmTypes.JUNLGE_FARM,
                  lpStakeTokenAddress: stakingToken.address[chainId] ?? '',
                  lpStakeTokenSymbol: stakingToken.symbol ?? '',
                  tokenAddress: lpTokens?.token.address[chainId] ?? '',
                  tokenSymbol: lpTokens?.token.symbol ?? '',
                  quoteTokenAddress: lpTokens?.quoteToken.address[chainId] ?? '',
                  quoteTokenSymbol: lpTokens?.quoteToken.symbol ?? '',
                  rewardToken: rewardToken,
                  tokensPerBlock: tokenPerBlock,
                  bonusEndBlock,
                  contractAddress: contractAddress[chainId],
                  rewardsPerSecond,
                  projectLink,
                  twitterLink: twitter,
                }
              : []
          },
        ),
        ...dualFarms.flatMap(({ pid, stakeTokenAddress, stakeTokens, rewardTokens, rewarderAddress, dualImage }) => {
          return chainId === SupportedChainId.POLYGON
            ? {
                id: uniqueId(FarmTypes.DUAL_FARM),
                pid,
                farmType: FarmTypes.DUAL_FARM,
                lpStakeTokenAddress: stakeTokenAddress ?? '',
                lpStakeTokenSymbol: `${stakeTokens?.token0.symbol}-${stakeTokens?.token1.symbol}` ?? '',
                tokenAddress: stakeTokens?.token0.address[chainId] ?? '',
                tokenSymbol: stakeTokens?.token0.symbol ?? '',
                quoteTokenAddress: stakeTokens?.token1.address[chainId] ?? '',
                quoteTokenSymbol: stakeTokens?.token1.symbol ?? '',
                rewardToken: rewardTokens.token0,
                secondRewardToken: rewardTokens.token1,
                contractAddress: rewarderAddress,
                dualImage,
              }
            : []
        }),
      ],
    }
  })
  mergedFarms.map(({ chainId, farms }) => (mergeFarmObj[chainId] = farms))
  return mergeFarmObj
}

export default mergeFarmConfigs

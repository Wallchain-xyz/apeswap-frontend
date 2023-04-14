import { ChainId } from '@ape.swap/sdk'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from '.'
import useAllLpPrices from 'hooks/useAllLPPrices'
import { useWeb3React } from '@web3-react/core'
import { useBananaPrice } from 'state/application/hooks'
import { Farm } from './types'
import { AppState } from 'state'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useFarmLpAprs } from 'state/stats/hooks'
import { StatsState } from 'state/stats/types'

export const usePollFarms = () => {
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const lpTokenPrices = useAllLpPrices()
  const { slowRefresh } = useRefresh()
  // Made a string because hooks will refresh bignumbers
  const bananaPrice = useBananaPrice()
  const farmLpAprs = useFarmLpAprs()

  useEffect(() => {
    if (chainId === ChainId.BSC) {
      dispatch(fetchFarmsPublicDataAsync(chainId, lpTokenPrices, new BigNumber(bananaPrice ?? 0), farmLpAprs))
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [dispatch, chainId, lpTokenPrices?.length, farmLpAprs?.lpAprs?.length, slowRefresh])
}
export const useFarms = (account: string): Farm[] | undefined => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useWeb3React()
  const farms = useSelector((state: AppState) => state.farms.data[chainId as SupportedChainId])
  useEffect(() => {
    if (account && (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET)) {
      dispatch(fetchFarmUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  return farms
}

// export const useFarmFromPid = (id: string): Farm => {
//   const { chainId } = useWeb3React()
//   const farm = useSelector((state: AppState) => state.farms.data[chainId]?.find((f: any) => f.id === id))
//   return farm
// }

// export const useFarmFromSymbol = (lpSymbol: string): Farm => {
//   const farm = useSelector((state: AppState) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
//   return farm
// }

// export const useFarmUser = (pid) => {
//   const farm = useFarmFromPid(pid)

//   return {
//     allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
//     tokenBalance: farm?.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
//     stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
//     earnings: farm?.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
//   }
// }

export const useFarmTags = (chainId: number) => {
  const { Tags }: StatsState = useSelector((state: AppState) => state.stats)
  const farmTags = Tags?.[`${chainId}`]?.farms
  return { farmTags }
}

export const useFarmOrderings = (chainId: number) => {
  const { Ordering }: StatsState = useSelector((state: AppState) => state.stats)
  const farmOrderings = Ordering?.[`${chainId}`]?.farms

  return { farmOrderings }
}

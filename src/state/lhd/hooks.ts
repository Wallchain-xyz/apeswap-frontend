import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchFullProfile, fetchInitialProfiles, fetchProfiles } from './actions'
import { SimpleTokenProfile, TokenProfile } from './types'
import { AppState } from '../index'
import { addFullProfile, addSearchProfiles, handleQueriedAPI } from './reducer'
import { useSelector } from 'react-redux'

export const useLoadInitialProfiles = () => {
  const dispatch = useAppDispatch()
  const simpleProfiles: SimpleTokenProfile[] = useSelector((state: AppState) => state?.lhd?.simpleProfiles)
  useEffect(() => {
    if (typeof window !== 'undefined' && !simpleProfiles?.length) {
      dispatch(fetchInitialProfiles())
    }
  }, [dispatch, simpleProfiles?.length])
}

export const useOnSearchProfiles = () => {
  const dispatch = useAppDispatch()
  return useCallback(
    async (queryString: string): Promise<boolean> => {
      try {
        dispatch(handleQueriedAPI(true))
        const listData: SimpleTokenProfile[] = await fetchProfiles(queryString)
        dispatch(addSearchProfiles(listData))
        dispatch(handleQueriedAPI(false))
        return listData.length === 0 //returns boolean representing if the query returned more than 1 result useful to show error when nothing is found
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [dispatch],
  )
}

//export const useFetchProfile = async (chainID?: string | string[] | undefined, address?: string | string[] | undefined) => {

export const useFetchProfile = () => {
  const dispatch = useAppDispatch()
  const fullProfile = useSelector((state: AppState) => state?.lhd?.fullProfile)

  const fetchProfile = useCallback(
    async (chainID?: string | string[] | undefined, address?: string | string[] | undefined) => {
      const exists = fullProfile?.addressMapping?.tokenAddresses.find(
        (tokenAddress) => tokenAddress.address === address && tokenAddress.chainId === chainID,
      )
      if (!exists) {
        try {
          dispatch(addFullProfile(null))
          const fullProfile: TokenProfile = await fetchFullProfile(`${chainID}/${address}`)
          if (fullProfile) {
            dispatch(addFullProfile(fullProfile))
          }
        } catch (e) {}
      }
    },
    [dispatch, fullProfile],
  )

  return fetchProfile
}

export const useSimpleProfiles = (): [SimpleTokenProfile[], boolean] => {
  return [
    useSelector((state: AppState) => state.lhd.simpleProfiles),
    useSelector((state: AppState) => state.lhd.queriedAPI),
  ]
}

export const useSearchProfiles = () => {
  return useSelector((state: AppState) => state.lhd.searchProfiles)
}

export const useFullProfile = () => {
  return useSelector((state: AppState) => state.lhd.fullProfile)
}

export const useIndustryAvg = () => {
  return useSelector((state: AppState) => {
    return {
      averageTotalScore: state.lhd.averageTotalScore,
      chainsSupported: state.lhd.chainsSupported,
      averageChange: state.lhd.industryAverageChange,
      tokensVerified: state.lhd.tokensVerified
    }
  })
}

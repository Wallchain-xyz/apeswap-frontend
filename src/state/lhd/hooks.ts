import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks'
// import { fetchFullProfile, fetchInitialProfiles, fetchProfiles, fetchProfilesQuery } from './actions'
import { fetchFullProfile, fetchInitialProfiles } from './actions'
import { SimpleTokenProfile, TokenProfile } from './types'
import { AppState } from '../index'
import { addFullProfile, addSimpleProfiles } from './reducer'
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

// export const useOnSearchProfiles = () => {
//   console.log('SEARCH CALLED')
//   // const dispatch = useAppDispatch()
//   // return useCallback(
//   //   async (queryString: string): Promise<boolean> => {
//   //     try {
//   //       const listData: SimpleTokenProfile[] = await fetchProfiles(queryString)
//   //       dispatch(addSimpleProfiles(listData))
//   //       return listData.length === 0 //returns boolean representing if the query returned more than 1 result useful to show error when nothing is found
//   //     } catch (e) {
//   //       console.error(e)
//   //       return false
//   //     }
//   //   },
//   //   [dispatch],
//   // )
// }
//
// export const useOnFilterProfiles = () => {
//   console.log('FILTER CALLED CALLED')
//
//   // const dispatch = useAppDispatch()
//   // return useCallback(
//   //   async (queryString: string): Promise<boolean> => {
//   //     try {
//   //       const listData: SimpleTokenProfile[] = await fetchProfiles(undefined, queryString)
//   //       dispatch(addSimpleProfiles(listData))
//   //       return listData.length === 0 //returns boolean representing if the query returned more than 1 result useful to show error when nothing is found
//   //     } catch (e) {
//   //       console.error(e)
//   //       return false
//   //     }
//   //   },
//   //   [dispatch],
//   // )
// }

export const useFetchProfile = () => {
  const dispatch = useAppDispatch()
  const fullProfile = useSelector((state: AppState) => state?.lhd?.fullProfile)

  return useCallback(
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
}

export const useSimpleProfiles = (): SimpleTokenProfile[] => {
  return useSelector((state: AppState) => state.lhd.simpleProfiles)
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
      tokensVerified: state.lhd.tokensVerified,
      tokensTracked: state.lhd.tokensTracked,
    }
  })
}

export const useLHDFilterValues = () => {
  return useSelector((state: AppState) => {
    return state.lhd.queryState
  })
}

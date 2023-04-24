import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchFullProfile, fetchInitialProfiles, fetchProfiles } from './actions'
import { SimpleTokenProfile, TokenProfile } from './types'
import { AppState } from '../index'
import { addFullProfile, addSearchProfiles } from './reducer'
import { useSelector } from 'react-redux'
import FullProfile from '../../views/LHD/components/FullProfile'

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
  return useCallback(async (queryString: string) => {
    try {
      const listData: SimpleTokenProfile[] = await fetchProfiles(queryString)
      dispatch(addSearchProfiles(listData))
    } catch(e) {
      // Handle error, e.g. dispatch an error action or log to console
    }
  }, [dispatch])
}

export const useFetchProfile = async (chainID?: string | string[] | undefined, address?: string | string[] | undefined) => {
  const dispatch = useAppDispatch()
  const fullProfile = useSelector((state: AppState) => state?.lhd?.fullProfile)
  const exists = fullProfile?.addressMapping?.tokenAddresses.find((tokenAddress) => tokenAddress.address === address && tokenAddress.chainId === chainID)
  if (!exists) {
    try {
      dispatch(addFullProfile(null))
      const fullProfile: TokenProfile = await fetchFullProfile(`${chainID}/${address}`)
      if (fullProfile) {
        dispatch(addFullProfile(fullProfile))
      }
    } catch (e) {
    }
  }
}

export const useSimpleProfiles = () => {
  return useSelector((state: AppState) => state.lhd.simpleProfiles)
}

export const useSearchProfiles = () => {
  return useSelector((state: AppState) => state.lhd.searchProfiles)
}

export const useFullProfile = () => {
  return useSelector((state: AppState) => state.lhd.fullProfile)
}
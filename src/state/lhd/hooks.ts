import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchFullProfile, fetchInitialProfiles, fetchProfiles } from './actions'
import { SimpleTokenProfile, TokenProfile } from './types'
import store, { AppState } from '../index'
import { addFullProfiles, addSearchProfiles } from './reducer'
import { useSelector } from 'react-redux'

export const useLoadInitialProfiles = () => {
  const dispatch = useAppDispatch()
  const simpleProfiles: SimpleTokenProfile[] = store?.getState()?.lhd?.simpleProfiles
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

export const useGetFullProfiles = async (chainID?: string | string[] | undefined, address?: string | string[] | undefined) => {
  const dispatch = useAppDispatch()
  const fullProfiles = useSelector((state: AppState) => state?.lhd?.fullProfiles)
  const selectedProfile = fullProfiles.find((profile) => profile?.addressMapping?.tokenAddresses?.find((tokenAddress) => tokenAddress.address === address && tokenAddress.chainId === chainID))
  if (!selectedProfile) {
    try {
      const fullProfile: TokenProfile = await fetchFullProfile(`${chainID}/${address}`)
      if (fullProfile) {
        dispatch(addFullProfiles(fullProfile))
      }
    } catch (e) {
    }
  }
}

export const useSimpleProfiles = () => {
  return useSelector((state: AppState) => state?.lhd?.simpleProfiles)
}

export const useSearchProfiles = () => {
  return useSelector((state: AppState) => state?.lhd?.searchProfiles)
}

export const useFullProfile = (chainID: string | string[] | undefined, address: string | string[] | undefined) => {
  const fullProfiles = useSelector((state: AppState) => state?.lhd?.fullProfiles)
  return fullProfiles.find((profile) => profile?.addressMapping?.tokenAddresses?.find((tokenAddress) => tokenAddress.address === address && tokenAddress.chainId === chainID))
}
import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchFullProfile } from './actions'
import { TokenProfile } from './types'
import { AppState } from '../index'
import { addFullProfile, setIsLhdAuth } from './reducer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { isEqual } from 'lodash'

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

export const useFullProfile = () => {
  return useSelector((state: AppState) => state.lhd.fullProfile)
}

export const useSetLhdAuth = () => {
  const dispatch = useAppDispatch()
  const setLhdAuth = (isAuth: boolean): void => {
    localStorage.setItem('isLhdAuth', JSON.stringify(isAuth))
    dispatch(setIsLhdAuth(isAuth))
  }
  return { setLhdAuth }
}

export const useGetIsLhdAuth = () => {
  const { query } = useRouter()
  const { setLhdAuth } = useSetLhdAuth()
  const isWhitelisted = query?.whitelist === 'true'

  const getIsLhdAuth = (): { isAuth: boolean } => {
    const isLocalLdhAuth = localStorage.getItem('isLhdAuth') === 'true'
    if (isLocalLdhAuth || isWhitelisted) {
      setLhdAuth(true)
      return { isAuth: true }
    }
    setLhdAuth(false)
    return { isAuth: false }
  }
  return { getIsLhdAuth }
}

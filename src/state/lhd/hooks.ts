import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks'
import { fetchInitialProfiles, fetchProfiles } from './actions'
import { SimpleTokenProfile } from './types'
import store, { AppState } from '../index'
import { addSearchProfiles, addSimpleProfiles } from './reducer'
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

export const useSearchProfiles = () => {
  const dispatch = useAppDispatch()
  return useCallback(async (query: string) => {
    try {
      const listData: SimpleTokenProfile[] = await fetchProfiles(query)
      dispatch(addSearchProfiles(listData))
    } catch (error) {
      console.warn(error)
    }
  }, [dispatch])
}

export const useSimpleProfiles = () => {
  return useSelector((state: AppState) => state?.lhd?.simpleProfiles)
}
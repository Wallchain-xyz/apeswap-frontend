import { useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import {
  fetchHomepageData,
  fetchHomepageService,
  fetchHomepageLaunchCalendar,
  fetchHomepageNews,
  fetchHomepageTokenData,
} from '.'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { HomepageData, HomepageTokenStats, LaunchCalendarCard, NewsCardType, ServiceData } from './types'

export const useFetchHomepageStats = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = { slowRefresh: 100 } // useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageData())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageStats = (): HomepageData | null => {
  const homepageStats = useSelector((state: AppState) => state.homepage.homepageData)
  return homepageStats
}

export const useFetchHomepageServiceStats = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = { slowRefresh: 100 } // useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageService())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageServiceStats = (): ServiceData | null => {
  const homepageServiceStats = useSelector((state: AppState) => state.homepage.homepageServiceStats)
  return homepageServiceStats
}

export const useFetchHomepageTokenStats = (isFetching: boolean, category: string) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = { slowRefresh: 100 } // useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageTokenData(category))
    }
  }, [slowRefresh, isFetching, category, dispatch])
}

export const useHomepageTokenStats = (): HomepageTokenStats[] | null => {
  const homepageTokenStats = useSelector((state: AppState) => state.homepage.homepageTokenStats)
  return homepageTokenStats
}


export const useFetchHomepageNews = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = { slowRefresh: 100 } // useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageNews())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageLaunchCalendar = (): LaunchCalendarCard[] | null => {
  const homepageLaunchCalendar = useSelector((state: AppState) => state.homepage.homepageLaunchCalendar)
  return homepageLaunchCalendar
}

export const useFetchHomepageLaunchCalendar = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = { slowRefresh: 100 } // useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageLaunchCalendar())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageNews = (): NewsCardType[] | null => {
  const homepageNews = useSelector((state: AppState) => state.homepage.homepageNews)
  return homepageNews
}

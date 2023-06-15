import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import getHomepageLaunchCalendar from './getHomepageLaunchCalendar'
import getHomepageNews from './getHomepageNews'
import getHomepageServiceStats from './getHomepageService'
import getHomepageStats from './getHomepageStats'
import getHomepageTokenStats from './getHomepageTokenStats'
import { HomepageState } from './types'

const initialState: HomepageState = {
  homepageData: null,
  homepageTokenStats: null,
  homepageNews: null,
  homepageLaunchCalendar: null,
  homepageServiceStats: null,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setHomepageStats: (state, action) => {
      state.homepageData = action.payload
    },
    setHomepageTokenStats: (state, action) => {
      state.homepageTokenStats = action.payload
    },
    setHomepageNews: (state, action) => {
      state.homepageNews = action.payload
    },
    setHomepageLaunchCalendar: (state, action) => {
      state.homepageLaunchCalendar = action.payload
    },
    setHomepageServiceStats: (state, action) => {
      state.homepageServiceStats = action.payload
    },
  },
})

// Actions
export const {
  setHomepageStats,
  setHomepageTokenStats,
  setHomepageNews,
  setHomepageLaunchCalendar,
  setHomepageServiceStats,
} = statsSlice.actions

export const fetchHomepageData = () => async (dispatch: Dispatch) => {
  const homepageStats = await getHomepageStats()
  dispatch(setHomepageStats(homepageStats))
}

export const fetchHomepageTokenData = (category: string) => async (dispatch: Dispatch) => {
  const homepageTokenStats = await getHomepageTokenStats(category)
  dispatch(setHomepageTokenStats(homepageTokenStats))
}

export const fetchHomepageNews = () => async (dispatch: Dispatch) => {
  const homepageNews = await getHomepageNews()
  dispatch(setHomepageNews(homepageNews))
}

export const fetchHomepageLaunchCalendar = () => async (dispatch: Dispatch) => {
  const homepageLaunchCalendar = await getHomepageLaunchCalendar()
  dispatch(setHomepageLaunchCalendar(homepageLaunchCalendar))
}

export const fetchHomepageService = () => async (dispatch: Dispatch) => {
  const homepageServiceStats = await getHomepageServiceStats()
  dispatch(setHomepageServiceStats(homepageServiceStats))
}

export default statsSlice.reducer

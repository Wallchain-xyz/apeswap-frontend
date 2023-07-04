import { createSlice } from '@reduxjs/toolkit'
import { ProfilesResponse, TokenProfile } from './types'

export const initialFilterValues: FilterState = {
  totalScore: { min: 0, max: 100 },
  health: { min: 0, max: 100 },
  ownership: { min: 0, max: 100 },
  concentration: { min: 0, max: 100 },
  mcap: { min: 500000, max: 1000000000 },
  extractable: { min: 4500, max: 100000000 },
  tags: [],
  chains: [],
}

export interface MinMax {
  min: number
  max: number
}

export interface FilterState {
  totalScore: MinMax
  health: MinMax
  concentration: MinMax
  ownership: MinMax
  mcap: MinMax
  extractable: MinMax
  tags: string[]
  chains: string[]
}

export interface LHDState {
  queryState: FilterState
  simpleProfiles: ProfilesResponse
  fullProfile: TokenProfile | null
  isLhdAuth: boolean
}

export const initialState: LHDState = {
  queryState: initialFilterValues,
  simpleProfiles: {
    data: [],
    count: -1,
  },
  fullProfile: null,
  isLhdAuth: true,
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    addSimpleProfiles(state, action: { payload: ProfilesResponse }) {
      return {
        ...state,
        simpleProfiles: action.payload,
      }
    },
    addFullProfile(state, action: { payload: TokenProfile | null }) {
      return {
        ...state,
        fullProfile: action.payload,
      }
    },
    setFilterState(state, action: { payload: FilterState }) {
      return {
        ...state,
        queryState: action.payload,
      }
    },
    setIsLhdAuth(state, action: { payload: boolean }) {
      return {
        ...state,
        isLhdAuth: action.payload,
      }
    },
  },
})

export const { addSimpleProfiles, addFullProfile, setFilterState, setIsLhdAuth } = LHDSlice.actions
export default LHDSlice.reducer

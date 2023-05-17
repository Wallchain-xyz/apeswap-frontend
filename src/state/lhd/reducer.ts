import { createSlice } from '@reduxjs/toolkit'
import { SimpleTokenProfile, TokenProfile } from './types'

export const initialFilterValues: FilterState = {
  totalScore: { min: 0, max: 100 },
  health: { min: 0, max: 100 },
  ownership: { min: 0, max: 100 },
  concentration: { min: 0, max: 100 },
  mcap: { min: 4500, max: 2500000000 },
  extractable: { min: 4500, max: 2500000000 },
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
}

export interface LHDState {
  averageTotalScore: string
  industryAverageChange: string
  chainsSupported: string
  tokensVerified: string
  queryState: FilterState
  tokensTracked: number
  simpleProfiles: SimpleTokenProfile[]
  searchProfiles: SimpleTokenProfile[]
  fullProfile: TokenProfile | null
}

export const initialState: LHDState = {
  averageTotalScore: '',
  industryAverageChange: '',
  chainsSupported: '',
  tokensVerified: '',
  tokensTracked: 0,
  queryState: initialFilterValues,
  simpleProfiles: [],
  searchProfiles: [],
  fullProfile: null
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    addIndustryData: (state, action: { payload: LHDState }) => {
      const { payload } = action
      return {
        ...state,
        averageTotalScore: payload?.averageTotalScore,
        industryAverageChange: payload?.industryAverageChange,
        chainsSupported: payload?.chainsSupported,
        tokensVerified: payload?.tokensVerified,
        tokensTracked: payload?.tokensTracked
      }
    },
    addSimpleProfiles(state, action: { payload: SimpleTokenProfile[] }) {
      return {
        ...state,
        simpleProfiles: action.payload,
      }
    },
    addSearchProfiles(state, action: {payload: SimpleTokenProfile[]}){
      return {
        ...state,
        searchProfiles: action.payload
      }
    },
    addFullProfile(state, action: {payload: TokenProfile | null}) {
      return {
        ...state,
        fullProfile: action.payload
      }
    },
    setFilterState(state, action: {payload: FilterState}) {
      return {
        ...state,
        queryState: action.payload
      }
    }
  },
})

export const { addIndustryData, addSimpleProfiles, addFullProfile, addSearchProfiles, setFilterState } = LHDSlice.actions
export default LHDSlice.reducer

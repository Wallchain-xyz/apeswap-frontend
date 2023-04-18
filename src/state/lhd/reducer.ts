import { createSlice } from '@reduxjs/toolkit'
import { SimpleTokenProfile, TokenProfile } from './types'

export interface LHDState {
  industryAverage: string
  industryAverageChange: string
  chainsSupported: string
  verifiedTokens: string
  simpleProfiles: SimpleTokenProfile[]
  searchProfiles: SimpleTokenProfile[]
  fullProfile: TokenProfile | null
}

export const initialState: LHDState = {
  industryAverage: '',
  industryAverageChange: '',
  chainsSupported: '',
  verifiedTokens: '',
  simpleProfiles: [],
  searchProfiles: [],
  fullProfile: null
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    addInitialListData: (state, action: { payload: LHDState }) => {
      const { payload } = action
      return {
        ...state,
        industryAverage: payload?.industryAverageChange,
        industryAverageChange: payload?.industryAverageChange,
        chainsSupported: payload?.chainsSupported,
        verifiedTokens: payload?.verifiedTokens,
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
    }
  },
})

export const { addInitialListData, addSimpleProfiles, addFullProfile, addSearchProfiles } = LHDSlice.actions
export default LHDSlice.reducer

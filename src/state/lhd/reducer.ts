import { createSlice } from '@reduxjs/toolkit'
import { SimpleTokenProfile, TokenProfile } from './types'

export interface LHDState {
  industryAverage: string
  industryAverageChange: string
  chainsSupported: string
  verifiedTokens: string
  simpleProfiles: SimpleTokenProfile[]
  searchProfiles: SimpleTokenProfile[]
  fullProfiles: TokenProfile[]
}

export const initialState: LHDState = {
  industryAverage: '0',
  industryAverageChange: '0',
  chainsSupported: '0',
  verifiedTokens: '0',
  simpleProfiles: [],
  searchProfiles: [],
  fullProfiles: []
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
    addFullProfiles(state, action: {payload: TokenProfile}) {
      return {
        ...state,
        fullProfiles: [...state.fullProfiles, action.payload]
      }
    }
  },
})

export const { addInitialListData, addSimpleProfiles, addFullProfiles, addSearchProfiles } = LHDSlice.actions
export default LHDSlice.reducer

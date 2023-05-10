import { createSlice } from '@reduxjs/toolkit'
import { SimpleTokenProfile, TokenProfile } from './types'

export interface LHDState {
  averageTotalScore: string
  industryAverageChange: string
  chainsSupported: string
  tokensVerified: string
  simpleProfiles: SimpleTokenProfile[]
  searchProfiles: SimpleTokenProfile[]
  fullProfile: TokenProfile | null
  queriedAPI: boolean
}

export const initialState: LHDState = {
  averageTotalScore: '',
  industryAverageChange: '',
  chainsSupported: '',
  tokensVerified: '',
  simpleProfiles: [],
  searchProfiles: [],
  fullProfile: null,
  queriedAPI: false
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
    handleQueriedAPI(state, action: { payload: boolean}) {
      return {
        ...state,
        queriedAPI: action.payload
      }
    }
  },
})

export const { addIndustryData, addSimpleProfiles, addFullProfile, addSearchProfiles, handleQueriedAPI } = LHDSlice.actions
export default LHDSlice.reducer

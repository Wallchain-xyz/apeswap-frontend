import { createSlice } from '@reduxjs/toolkit'
import { SimpleTokenProfile, TokenProfile } from './types'

export interface QueryState {
  mCapMin: number
  mCapMax: number
  extMin: number
  extMax: number
  scoreMin: number
  scoreMax: number
  healthMin: number
  healthMax: number
  ownerMin: number
  ownerMax: number
  concenMin: number
  concenMax: number
}

export interface LHDState {
  averageTotalScore: string
  industryAverageChange: string
  chainsSupported: string
  tokensVerified: string
  queryState: QueryState
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
  queryState: {
    mCapMin: 0,
    mCapMax: 0,
    extMin: 0,
    extMax: 0,
    scoreMin: 0,
    scoreMax: 0,
    healthMin: 0,
    healthMax: 0,
    ownerMin: 0,
    ownerMax: 0,
    concenMin: 0,
    concenMax: 0
  },
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
    handleQueryStatus(state, action: {payload: QueryState}) {
      return {
        ...state,
        queryState: action.payload
      }
    }
  },
})

export const { addIndustryData, addSimpleProfiles, addFullProfile, addSearchProfiles } = LHDSlice.actions
export default LHDSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { TokenProfile } from './types'
export interface LHDState {
  fullProfile: TokenProfile | null
  isLhdAuth: boolean
}

export const initialState: LHDState = {
  fullProfile: null,
  isLhdAuth: true,
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    addFullProfile(state, action: { payload: TokenProfile | null }) {
      return {
        ...state,
        fullProfile: action.payload,
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

export const { addFullProfile, setIsLhdAuth } = LHDSlice.actions
export default LHDSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
export interface LHDState {
  isLhdAuth: boolean
}

export const initialState: LHDState = {
  isLhdAuth: true,
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    setIsLhdAuth(state, action: { payload: boolean }) {
      return {
        ...state,
        isLhdAuth: action.payload,
      }
    },
  },
})

export const { setIsLhdAuth } = LHDSlice.actions
export default LHDSlice.reducer

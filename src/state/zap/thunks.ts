import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from 'state'
import { zapActions } from './slice'
import { zapWidoActions } from './zap-providers/wido'
import { requestWidoQuote } from './zap-providers/wido/widoThunks'

// https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
export const requestZapQuote = createAsyncThunk('zap/requestZapQuote', async (undefined, { dispatch, getState }) => {

  // Check the current provider
  const state = getState() as AppState
  const currentZapProtocol = state.zap.zapProtocol

  if (currentZapProtocol === 'ZapV2') {
    // TODO: Zap Flow
  } else if (currentZapProtocol === 'ZapWido') {
    // Dispatch the action to the wido reducer
    // dispatch(requestWidoQuote())
  }
})

export const checkZapApproval = createAsyncThunk('zap/checkZapApproval', async (undefined, { dispatch, getState }) => {

  // Check the current provider
  const state = getState() as AppState
  const currentZapProtocol = state.zap.zapProtocol

  if (currentZapProtocol === 'ZapV2') {
    // TODO: Zap Flow
  } else if (currentZapProtocol === 'ZapWido') {
    // TODO: Wido Flow
  }
})
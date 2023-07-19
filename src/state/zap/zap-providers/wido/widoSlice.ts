import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuoteRequest, QuoteResult, ApproveRequest } from 'wido'
import { requestWidoQuote } from './widoThunks'

type TxData = { to: string; data: string }
type TxDataWithTimestamp = TxData & { timestamp: number }

interface ZapWidoState {
  approveData: TxDataWithTimestamp | null
  approveRequest: ApproveRequest | null
  quoteRequest: QuoteRequest | null
  quoteResult: QuoteResult | null
  // TODO: Bubble up to Zap state
  loading: boolean
  error: string | null
  txHash: string | null
}

const initialState: ZapWidoState = {
  loading: false,
  error: null,
  txHash: null,
  approveData: null,
  approveRequest: null,
  quoteRequest: null,
  quoteResult: null,
}

const zapWidoSlice = createSlice({
  name: 'zap-wido',
  initialState,
  reducers: {
    setApproveData: (state, action: PayloadAction<TxDataWithTimestamp>) => {
      state.approveData = action.payload
    },
    setApproveRequest: (state, action: PayloadAction<ApproveRequest>) => {
      state.approveRequest = action.payload
    },
    setQuoteRequest: (state, action: PayloadAction<QuoteRequest>) => {
      state.quoteRequest = action.payload
    },
    setQuoteResult: (state, action: PayloadAction<QuoteResult>) => {
      state.quoteResult = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestWidoQuote.pending, (state, action) => {
        // TODO: Handle state
      })
      .addCase(requestWidoQuote.fulfilled, (state, action) => {
        // TODO: Handle state
      })
      .addCase(requestWidoQuote.rejected, (state, action) => {
        // TODO: Handle state
      })
  },
})

export const { actions: zapWidoActions, reducer: zapWidoReducer } = zapWidoSlice

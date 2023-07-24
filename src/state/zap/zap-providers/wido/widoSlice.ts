import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionRequest, TransactionReceipt } from '@ethersproject/abstract-provider'
import { QuoteRequest, QuoteResult, ApproveRequest, WidoSpenderRequest } from 'wido'
import {
  executeWidoZapTx,
  getWidoSpender,
  requestWidoApproveData,
  requestWidoQuote,
  executeWidoApproval,
} from './widoThunks'

type TxData = { to: string; data: string }
export type TxDataTimestamped = TxData & { timestamp: number }
export type QuoteResultTimestamped = QuoteResult & { timestamp: number }

interface ZapWidoState {
  widoSpenderAddress: string | null
  widoSpenderRequest: WidoSpenderRequest | null
  approveData: TxDataTimestamped | null
  approveRequest: ApproveRequest | null
  approveTx: TransactionReceipt | null
  quoteRequest: QuoteRequest | null
  quoteResult: QuoteResultTimestamped | null
  zapTx: TransactionReceipt | null
  loading: boolean
  error: string | null | undefined
}

const initialState: ZapWidoState = {
  widoSpenderAddress: null,
  widoSpenderRequest: null,
  approveData: null,
  approveRequest: null,
  approveTx: null,
  quoteRequest: null,
  quoteResult: null,
  zapTx: null,
  loading: false,
  error: null,
}

export const WIDO_SLICE_NAME = 'zapWido'
const zapWidoSlice = createSlice({
  name: WIDO_SLICE_NAME,
  initialState,
  reducers: {
    setWidoSpenderAddress: (state, action: PayloadAction<string | null>) => {
      state.widoSpenderAddress = action.payload
    },
    setWidoSpenderRequest: (state, action: PayloadAction<WidoSpenderRequest | null>) => {
      state.widoSpenderRequest = action.payload
    },
    setApproveData: (state, action: PayloadAction<TxDataTimestamped>) => {
      state.approveData = action.payload
    },
    setApproveRequest: (state, action: PayloadAction<ApproveRequest>) => {
      state.approveRequest = action.payload
    },
    setApproveTx: (state, action: PayloadAction<TransactionReceipt>) => {
      state.approveTx = action.payload
    },
    setQuoteRequest: (state, action: PayloadAction<QuoteRequest>) => {
      state.quoteRequest = action.payload
    },
    setQuoteResult: (state, action: PayloadAction<QuoteResultTimestamped>) => {
      state.quoteResult = action.payload
    },
    setZapTx: (state, action: PayloadAction<TransactionReceipt>) => {
      state.zapTx = action.payload
    },
    resetWidoState: (state) => {
      state.widoSpenderAddress = null
      state.widoSpenderRequest = null
      state.approveData = null
      state.approveRequest = null
      state.approveTx = null
      state.quoteRequest = null
      state.quoteResult = null
      state.zapTx = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * getWidoSpender
       */
      .addCase(getWidoSpender.pending, (state, action) => {
        state.widoSpenderAddress = null
        state.loading = true
      })
      .addCase(getWidoSpender.fulfilled, (state, action) => {
        state.widoSpenderAddress = action.payload
        state.loading = false
        // TODO: log
        console.dir({ 'getWidoSpender.fulfilled': action })
      })
      .addCase(getWidoSpender.rejected, (state, action) => {
        state.widoSpenderAddress = null
        state.loading = false
        state.error = action.error.message
        // TODO: log
        console.dir({ 'getWidoSpender.rejected': action })
      })
      /**
       * requestWidoApproveData
       */
      .addCase(requestWidoApproveData.pending, (state, action) => {
        state.loading = true
        const approveRequest = action.meta.arg
        if (approveRequest) {
          state.approveRequest = approveRequest
        }
        state.approveData = null
      })
      .addCase(requestWidoApproveData.fulfilled, (state, action) => {
        state.loading = false
        const approveData = action.payload
        state.approveData = approveData
      })
      .addCase(requestWidoApproveData.rejected, (state, action) => {
        state.loading = true
        state.approveData = null
        state.error = action.error.message
      })
      /**
       * executeWidoApproval
       */
      .addCase(executeWidoApproval.pending, (state, action) => {
        state.loading = true
        const { approveRequest } = action.meta.arg
        if (approveRequest) {
          state.approveRequest = approveRequest
        }
      })
      .addCase(executeWidoApproval.fulfilled, (state, action) => {
        state.loading = false
        const approveTx = action.payload
        state.approveTx = approveTx
      })
      .addCase(executeWidoApproval.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      /**
       * requestWidoQuote
       */
      .addCase(requestWidoQuote.pending, (state, action) => {
        state.loading = true
        const quoteRequest = action.meta.arg
        if (quoteRequest) {
          state.quoteRequest = quoteRequest
        }
        state.quoteResult = null
        // TODO: Handle state
      })
      .addCase(requestWidoQuote.fulfilled, (state, action) => {
        state.loading = false
        const quoteResult = action.payload
        state.quoteResult = quoteResult
      })
      .addCase(requestWidoQuote.rejected, (state, action) => {
        state.loading = false
        state.quoteResult = null
        state.error = action.error.message
        // TODO: Handle error?
      })
      /**
       * executeWidoZapTx
       */
      .addCase(executeWidoZapTx.pending, (state, action) => {
        state.loading = true
        const { quoteRequest } = action.meta.arg
        if (quoteRequest) {
          state.quoteRequest = quoteRequest
        }
      })
      .addCase(executeWidoZapTx.fulfilled, (state, action) => {
        state.loading = false
        // TODO: log
        console.dir({ 'executeWidoZapTx.fulfilled': action })
      })
      .addCase(executeWidoZapTx.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        // TODO: Handle state?
      })
  },
})

export const { actions: zapWidoActions, reducer: zapWidoReducer } = zapWidoSlice

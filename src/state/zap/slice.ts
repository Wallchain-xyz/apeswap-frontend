import { Token } from '@ape.swap/sdk-core'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import { createSlice, createReducer, PayloadAction } from '@reduxjs/toolkit'
import {
  Field,
  ZapCallbackState,
} from './actions'
import { TradeState } from 'state/routing/types'

export type ZapContractProtocols = 'ZapV2' | 'ZapV3Multicall'
export type ZapApiProtocols = 'ZapWido'
export type ZapAllProtocols = ZapContractProtocols | ZapApiProtocols

export interface ZapState {
  readonly zapProtocol: ZapAllProtocols
  readonly independentField: Field
  readonly typedValue: string
  readonly zapRouteState: TradeState
  readonly zapType: ZapType
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currency1: string | undefined
    readonly currency2: string | undefined
  }
  readonly recipient: string |  null
  // TODO: this type is incorrect since it needs to handle chainId as well.
  readonly zapInputList: { [symbol: string]: Token } | undefined
  readonly zapNewOutputList: { currencyIdA: string; currencyIdB: string }[]
  readonly zapState: ZapCallbackState
  readonly zapError: string | undefined
}

const initialState: ZapState = {
  // NOTE: Starting as ZapV2 for POC
  zapProtocol: 'ZapV2',
  independentField: Field.INPUT,
  zapRouteState: TradeState.INVALID,
  zapType: ZapType.ZAP,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: 'ETH',
  },
  [Field.OUTPUT]: {
    currency1: '',
    currency2: '',
  },
  recipient: null,
  zapInputList: undefined,
  zapNewOutputList: [],
  zapState: ZapCallbackState.STANDBY,
  zapError: undefined,
}

/**
 * 
 * Slices are a collection of reducer logic and actions for a single feature of your app.
 * They help drastically reduce the amount of boilerplate code needed to write Redux logic.
 * 
 * createSlice:
 * 1. Uses Immer internally so we can mutate the state directly.
 * 2. Will generate action creators and action types that correspond to the reducers and state.
 * 3. Will generate a type for the state that includes the generated action types.
 * 4. Thunks are easily created with createAsyncThunk.
 */
const zapSlice = createSlice({
  name: 'zap',
  initialState,
  reducers: {
    setZapProtocol: (state, action: PayloadAction<{ zapProtocol: ZapAllProtocols }>) => {
      state.zapProtocol = action.payload.zapProtocol
    },
    replaceZapState: (
      state,
      action: PayloadAction<{
        field: string
        typedValue: string
        inputCurrencyId?: string
        outputCurrencyId?: { currency1: string; currency2: string }
        recipient: string | null
        zapType: ZapType
      }>,
    ) => {
      state[Field.INPUT] = {
        currencyId: action.payload.inputCurrencyId,
      }
      state[Field.OUTPUT] = {
        currency1: action.payload.outputCurrencyId?.currency1,
        currency2: action.payload.outputCurrencyId?.currency2,
      }
      state.independentField = Field.INPUT
      state.zapType = action.payload.zapType
      state.typedValue = action.payload.typedValue
      state.recipient = action.payload.recipient
    },
    selectInputCurrency: (state, action: PayloadAction<{ currencyId: string }>) => {
      state[Field.INPUT] = { currencyId: action.payload.currencyId }
    },
    selectOutputCurrency: (state, action: PayloadAction<{ currency1: string; currency2: string }>) => {
      state[Field.OUTPUT] = { currency1: action.payload.currency1, currency2: action.payload.currency2 }
    },
    typeInput: (state, action: PayloadAction<{ field: Field, typedValue: string }>) => {
      state.independentField = Field.INPUT
      state.typedValue = action.payload.typedValue
    },
    setRecipient: (state, action: PayloadAction<{ recipient: string | null }>) => {
      state.recipient = action.payload.recipient
    },
    setZapType: (state, action: PayloadAction<{ zapType: ZapType }>) => {
      state.zapType = action.payload.zapType
    },
    setInputList: (state, action: PayloadAction<{ zapInputList:  { [symbol: string]: Token } }>) => {
      state.zapInputList = action.payload.zapInputList
    },
    setZapNewOutputList: (state, action: PayloadAction<{ zapNewOutputList: { currencyIdA: string; currencyIdB: string }[] }>) => {
      state.zapNewOutputList = action.payload.zapNewOutputList
    },
    setZapState: (state, action: PayloadAction<ZapCallbackState>) => {
      state.zapState = action.payload
    },
    setZapError: (state, action: PayloadAction<string | undefined>) => {
      state.zapError = action.payload
    },
  },
})

export const {
  setZapProtocol,
  replaceZapState,
  selectInputCurrency,
  selectOutputCurrency,
  typeInput,
  setRecipient,
  setZapType,
  setInputList,
  setZapNewOutputList,
  setZapState,
  setZapError,
} = zapSlice.actions

export default zapSlice.reducer

import { Token } from '@ape.swap/sdk-core'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import { createSlice, PayloadAction, combineReducers, createSelector } from '@reduxjs/toolkit'
import { Field, ZapStatus } from './actions'
import { TradeState } from 'state/routing/types'
import { requestZapQuote, checkZapApproval, executeZapApproval } from './thunks'
import { zapWidoReducer } from './zap-providers/wido'
import { ApprovalState } from 'hooks/useApproveCallback'
import { ethers } from 'ethers'
import { AppState } from 'state'

export type ZapContractProtocols = 'ZapV2' | 'ZapV3Multicall'
export type ZapApiProtocols = 'ZapWido'
export type ZapAllProtocols = ZapContractProtocols | ZapApiProtocols

export interface ZapState {
  readonly zapProtocol: ZapAllProtocols
  readonly zapStatus: ZapStatus
  readonly zapError: string | null
  readonly recipient: string | null
  readonly approvalState: ApprovalState
  readonly independentField: Field
  readonly typedValue: string
  readonly zapRouteState: TradeState
  readonly zapType: ZapType
  readonly [Field.INPUT]: {
    readonly currencyId: 'ETH' | string | null
  }
  readonly [Field.OUTPUT]: {
    readonly currency1: 'ETH' | string | null
    readonly currency2: 'ETH' | string | null
  }
  // TODO: this type is incorrect since it needs to handle chainId as well.
  readonly zapInputList: { [symbol: string]: Token } | null
  readonly zapNewOutputList: { currencyIdA: string; currencyIdB: string }[]
}

const initialState: ZapState = {
  // NOTE: Setting to ZapV2 as default
  zapProtocol: 'ZapV2', // ZapWido
  zapStatus: ZapStatus.STANDBY,
  zapError: null,
  approvalState: ApprovalState.UNKNOWN,

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
  zapInputList: null,
  zapNewOutputList: [],
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
    setZapApprovalState: (state, action: PayloadAction<ApprovalState>) => {
      state.approvalState = action.payload
    },
    setZapProtocol: (state, action: PayloadAction<{ zapProtocol: ZapAllProtocols }>) => {
      if (state.zapProtocol === action.payload.zapProtocol) return
      state.zapProtocol = action.payload.zapProtocol
      state.zapStatus = ZapStatus.STANDBY
      state.approvalState = ApprovalState.UNKNOWN
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
        currencyId: action.payload.inputCurrencyId || null,
      }
      state[Field.OUTPUT] = {
        currency1: action.payload.outputCurrencyId?.currency1 || null,
        currency2: action.payload.outputCurrencyId?.currency2 || null,
      }
      state.independentField = Field.INPUT
      state.zapType = action.payload.zapType
      state.typedValue = action.payload.typedValue
      state.recipient = action.payload.recipient
    },
    setInputCurrency: (state, action: PayloadAction<{ currencyId: string }>) => {
      state[Field.INPUT] = { currencyId: action.payload.currencyId }
    },
    setOutputCurrency: (state, action: PayloadAction<{ currency1: string; currency2: string }>) => {
      state[Field.OUTPUT] = { currency1: action.payload.currency1, currency2: action.payload.currency2 }
    },
    typeInput: (state, action: PayloadAction<{ field: Field; typedValue: string }>) => {
      state.independentField = Field.INPUT
      const typedValue = action.payload.typedValue
      state.typedValue = typedValue
    },
    setRecipient: (state, action: PayloadAction<{ recipient: string | null }>) => {
      state.recipient = action.payload.recipient
    },
    setZapType: (state, action: PayloadAction<{ zapType: ZapType }>) => {
      state.zapType = action.payload.zapType
    },
    setInputList: (state, action: PayloadAction<{ zapInputList: { [symbol: string]: Token } }>) => {
      state.zapInputList = action.payload.zapInputList
    },
    setZapNewOutputList: (
      state,
      action: PayloadAction<{ zapNewOutputList: { currencyIdA: string; currencyIdB: string }[] }>,
    ) => {
      state.zapNewOutputList = action.payload.zapNewOutputList
    },
    setZapStatus: (state, action: PayloadAction<ZapStatus>) => {
      state.zapStatus = action.payload
    },
    setZapError: (state, action: PayloadAction<string | null>) => {
      state.zapError = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * requestZapQuote
       */
      .addCase(requestZapQuote.pending, (state, action) => {
        // TODO: Handle state
        state.zapStatus = ZapStatus.LOADING
      })
      .addCase(requestZapQuote.fulfilled, (state, action) => {
        if (state.approvalState === ApprovalState.APPROVED) {
          state.zapStatus = ZapStatus.VALID
        } else {
          state.zapStatus = ZapStatus.STANDBY
        }
      })
      .addCase(requestZapQuote.rejected, (state, action) => {
        state.zapStatus = ZapStatus.INVALID
        // TODO: Error handling?
      })
      /**
       * executeZapApproval
       */
      .addCase(executeZapApproval.pending, (state, action) => {
        state.zapStatus = ZapStatus.LOADING
      })
      .addCase(executeZapApproval.fulfilled, (state, action) => {
        if(!action.payload) {
          state.approvalState = ApprovalState.UNKNOWN
        } else {
          state.approvalState = ApprovalState.APPROVED
        }
        state.zapStatus = ZapStatus.STANDBY
      })
      .addCase(executeZapApproval.rejected, (state, action) => {
        state.approvalState = ApprovalState.UNKNOWN
        state.zapStatus = ZapStatus.INVALID
        // TODO: Error handling?
      })
      /**
       * checkZapApproval
       */
      .addCase(checkZapApproval.pending, (state, action) => {
        state.approvalState = ApprovalState.UNKNOWN
        state.zapStatus = ZapStatus.LOADING
      })
      .addCase(checkZapApproval.fulfilled, (state, action) => {
        state.approvalState = action.payload
        state.zapStatus = ZapStatus.STANDBY
      })
      .addCase(checkZapApproval.rejected, (state, action) => {
        state.approvalState = ApprovalState.UNKNOWN
        state.zapStatus = ZapStatus.INVALID
        // TODO: Error handling?
      })
  },
})


const selectRawInputCurrency = (state: AppState) => state.zap[Field.INPUT]
export const selectInputCurrencyAddress = createSelector([selectRawInputCurrency], (inputCurrency) => {
  if (isNativeCurrencyId(inputCurrency.currencyId)) {
    return '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  }
  return inputCurrency.currencyId
})

const selectRawTypedInput = (state: AppState) => state.zap.typedValue;
export const selectTokenInputAmount = createSelector(
  [selectRawTypedInput],
  (typedInput) => {
    if (!typedInput) return null;
    // Remove commas and spaces from the input
    const cleanedInput = typedInput.replace(/,/g, '').trim();
    // TODO: Need to dynamically pull in the token decimals
    const tokenDecimals = 18;
    // Convert the input to a BigNumber with the appropriate number of decimals
    const value = ethers.utils.parseUnits(cleanedInput, tokenDecimals);

    return value;
  }
);

export const selectInputTokenDetails = createSelector(
  [selectInputCurrencyAddress, selectTokenInputAmount],
  (inputCurrencyAddress, tokenInputAmount) => {
    return { inputCurrencyAddress, tokenInputAmount };
  }
);

export const zapActions = zapSlice.actions

export const {
  setZapApprovalState,
  setZapProtocol,
  replaceZapState,
  setInputCurrency,
  setOutputCurrency,
  typeInput,
  setRecipient,
  setZapType,
  setInputList,
  setZapNewOutputList,
  setZapStatus,
  setZapError,
} = zapActions

export const zapProtocolReducers = combineReducers({
  zapWido: zapWidoReducer,
})

export default zapSlice.reducer


// NOTE: Wido Zap helper
export function isNativeCurrencyId(currencyId: string | null): boolean {
  if(!currencyId) return false
  currencyId = currencyId.toUpperCase()
  if (currencyId == '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toUpperCase() || currencyId === "ETH") {
    return true
  }
  return false
}
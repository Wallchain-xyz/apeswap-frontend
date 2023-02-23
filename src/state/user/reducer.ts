import { SupportedChainId } from '@ape.swap/sdk-core'
import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_DEADLINE_FROM_NOW } from 'config/constants/misc'
import { ConnectionType } from 'utils/connection/types'
import { updateVersion } from '../global/actions'
import { SerializedPair, SerializedToken } from './types'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  selectedWallet?: ConnectionType
  selectedNetwork: SupportedChainId
  timestamp: number
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number
  // deadline set by user in minutes, used in all txns
  userDeadline: number
  userClientSideRouter: boolean // whether routes should be calculated with the client side router only
  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  userExpertMode: boolean

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number | 'auto'
  userSlippageToleranceHasBeenMigratedToAuto: boolean // temporary flag for migration status
  // hides closed (inactive) positions across the app
  userHideClosedPositions: boolean
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  selectedWallet: undefined,
  selectedNetwork: SupportedChainId.BSC,
  timestamp: currentTimestamp(),
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  userSlippageTolerance: 50,
  userSlippageToleranceHasBeenMigratedToAuto: false,
  userClientSideRouter: false,
  userHideClosedPositions: false,
  userExpertMode: false,
  tokens: {},
  pairs: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet
    },
    updateSelectedNetwork(state, { payload: { chainId } }) {
      state.selectedNetwork = chainId
    },
    updateUserDeadline(state, action) {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    },
    updateUserSlippageTolerance(state, action) {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    },
    updateUserClientSideRouter(state, action) {
      state.userClientSideRouter = action.payload.userClientSideRouter
    },
    updateHideClosedPositions(state, action) {
      state.userHideClosedPositions = action.payload.userHideClosedPositions
    },
    updateUserExpertMode(state, action) {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    },
    addSerializedToken(state, { payload: { serializedToken } }) {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    },
    addSerializedPair(state, { payload: { serializedPair } }) {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (
        typeof state.userSlippageTolerance !== 'number' ||
        !Number.isInteger(state.userSlippageTolerance) ||
        state.userSlippageTolerance < 0 ||
        state.userSlippageTolerance > 5000
      ) {
        state.userSlippageTolerance = 'auto'
      } else {
        if (
          !state.userSlippageToleranceHasBeenMigratedToAuto &&
          [10, 50, 100].indexOf(state.userSlippageTolerance) !== -1
        ) {
          state.userSlippageTolerance = 'auto'
          state.userSlippageToleranceHasBeenMigratedToAuto = true
        }
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (
        typeof state.userDeadline !== 'number' ||
        !Number.isInteger(state.userDeadline) ||
        state.userDeadline < 60 ||
        state.userDeadline > 180 * 60
      ) {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
  },
})

export const {
  updateSelectedWallet,
  updateSelectedNetwork,
  addSerializedToken,
  updateUserSlippageTolerance,
  updateUserDeadline,
  updateHideClosedPositions,
  updateUserClientSideRouter,
} = userSlice.actions
export default userSlice.reducer

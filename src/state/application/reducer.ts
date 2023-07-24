import type { Web3Provider } from '@ethersproject/providers'
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'

export type PopupContent = {
  txHash?: string
  text: string
  url?: string
  urlLabel: string
  errorText?: string
  type: 'success' | 'error'
}

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  web3: {
    readonly chainId: number | null
    readonly account: string | null
  }
  readonly fiatOnramp: { available: boolean; availabilityChecked: boolean }
  readonly popupList: PopupList
  readonly bananaPrice: string | null
  readonly profileImage: string | null
}

const initialState: ApplicationState = {
  web3: {
    chainId: null,
    account: null,
  },
  fiatOnramp: { available: false, availabilityChecked: false },
  popupList: [],
  bananaPrice: null,
  profileImage: null,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setChainId(state, action: PayloadAction<{ chainId: number | null | undefined }>) {
      state.web3.chainId = action.payload.chainId || null
    },
    setAccount(state, action: PayloadAction<{ account: string | null | undefined }>) {
      state.web3.account = action.payload.account || null
    },
    setFiatOnrampAvailability(state, { payload: available }) {
      state.fiatOnramp = { available, availabilityChecked: true }
    },
    setProfileImage(state, { payload: { profileImage } }) {
      state.profileImage = profileImage
    },
    setBananaPrice(state, action) {
      state.bananaPrice = action.payload
    },
    addPopup(state, { payload: { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }) {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    },
    removePopup(state, { payload: { key } }) {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    },
  },
})

export const applicationActions = applicationSlice.actions
export const {
  setChainId,
  setAccount,
  setFiatOnrampAvailability,
  setBananaPrice,
  addPopup,
  setProfileImage,
  removePopup,
} = applicationActions
export default applicationSlice.reducer

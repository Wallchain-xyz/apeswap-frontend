import { ChainId } from "@ape.swap/sdk";
import { createSlice } from "@reduxjs/toolkit";
import { ConnectionType } from "utils/connection/types";

export interface UserState {
  selectedWallet?: ConnectionType;
  selectedNetwork: ChainId;
}

export const initialState: UserState = {
  selectedWallet: undefined,
  selectedNetwork: ChainId.BSC,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    updateSelectedNetwork(state, { payload: { chainId } }) {
      state.selectedNetwork = chainId;
    },
  },
});

export const { updateSelectedWallet, updateSelectedNetwork } = userSlice.actions;
export default userSlice.reducer;

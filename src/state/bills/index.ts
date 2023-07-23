import { Dispatch, PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  fetchBillsAllowance,
  fetchUserBalances,
  fetchUserOwnedBills,
  fetchUserOwnedBillNftData,
} from './fetchBillsUser'
import fetchBills from './fetchBills'
import { getNewBillNftData } from './getBillNftData'
import { BillsConfig, bills } from '@ape.swap/apeswap-lists'
import { MAINNET_CHAINS } from 'config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { BillsInfoAndConfig } from 'views/Bonds/types'
import { TokenPrices } from 'hooks/useAllTokenPrices'
import { AppState, AppThunk } from 'state'

const filterByChainId = (chainId: SupportedChainId) => {
  return bills.filter(
    (bill) =>
      bill.contractAddress?.[chainId] !== '' &&
      bill.contractAddress?.[chainId] !== null &&
      bill.contractAddress?.[chainId] !== undefined,
  )
}

type BillsRecords = Partial<Record<SupportedChainId, BillsInfoAndConfig[]>>

export interface BillsState {
  data: BillsRecords
}

const initialBillsState: BillsRecords = {}
MAINNET_CHAINS.forEach((chainId: SupportedChainId) => {
  initialBillsState[chainId] = filterByChainId(chainId)
})

const initialState: BillsState = {
  data: initialBillsState,
}

export const billsSlice = createSlice({
  name: 'Bills',
  initialState,
  reducers: {
    setBillsPublicData: (state, action: PayloadAction<{ value: BillsInfoAndConfig[], chainId: SupportedChainId }>) => {
      const { value: liveBillsData, chainId } = action.payload
      state.data[chainId] = (state.data[chainId] || []).map((bill) => {
        const liveBillData = liveBillsData.find((entry: any) => entry.index === bill.index)
        return { ...bill, ...liveBillData }
      })
    },
    setBillsUserData: (state, action: PayloadAction<{ value: any; chainId: SupportedChainId }> ) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = (state.data[chainId] || []).map((bill: any) => {
        const userBillData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userData: userBillData }
      })
    },
    setUserOwnedBillsData: (state, action: PayloadAction<{ value: any; chainId: SupportedChainId }> ) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = (state.data[chainId] || []).map((bill: any) => {
        const userOwnedBillsData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userOwnedBillsData: userOwnedBillsData?.userOwnedBills }
      })
    },
    setUserOwnedBillsNftData: (state, action: PayloadAction<{ value: any; chainId: SupportedChainId }>) => {
      const { value: userData, chainId } = action.payload
      state.data[chainId] = (state.data[chainId] || []).map((bill: any) => {
        const userOwnedBillsNftData = userData.find((entry: any) => entry.index === bill.index)
        return { ...bill, userOwnedBillsNftData: userOwnedBillsNftData?.userOwnedBillsNfts }
      })
    },
    updateBillsUserData: (
      state,
      action: PayloadAction<{ value: any; field: string; index: number; chainId: SupportedChainId }>,
    ) => {
      const { value, field, index, chainId } = action.payload
      const billState = state.data[chainId] || []
      const i = billState.findIndex((bill) => bill.index === index)
      if(i === -1) return;
      // state.data[chainId][i] = {
      (state.data[chainId] as BillsInfoAndConfig[])[i] = {
        ...billState[i],
        // @ts-ignore // TODO: fix types 
        userData: { ...billState[i].userData, [field]: value },
      }
    },
    updateBillsUserNftData: (state, action: PayloadAction<{ value: any; index: number; chainId: SupportedChainId }>) => {
      const { value, index, chainId } = action.payload
      const billState = state.data[chainId] || []
      const i = billState.findIndex((bill: any) => bill.index === index)
      if(i === -1) return;
      // @ts-ignore // TODO: fix types 
      (state.data[chainId] as BillsInfoAndConfig[])[i] = {
        ...billState,
        userOwnedBillsNftData: { ...billState[i].userOwnedBillsNftData, ...value },
      }
    },
  },
})

// Actions
export const {
  setBillsPublicData,
  setBillsUserData,
  setUserOwnedBillsData,
  setUserOwnedBillsNftData,
  updateBillsUserData,
} = billsSlice.actions

// Selectors
const selectBillsState = (state: AppState) => state.bills

export const selectBillsByChainId = createSelector(
  [selectBillsState, (_: AppState, chainId: SupportedChainId) => chainId],
  (billsState, chainId) => billsState.data[chainId] || [],
)

// Thunks

// TODO: When swapping between chain the state will reset sometimes when the multicall fetch is null
export const fetchBillsPublicDataAsync =
  (chainId: SupportedChainId, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    try {
      const bills = selectBillsByChainId(getState(), chainId)
      const returnedBills = await fetchBills(chainId, tokenPrices, bills)
      // NOTE: Setting returnedBills as Bills[], but types could be different
      dispatch(setBillsPublicData({ value: returnedBills as BillsInfoAndConfig[], chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchBillsUserDataAsync =
  (chainId: SupportedChainId, account: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    try {
      const bills = selectBillsByChainId(getState(), chainId)
      // fetch and set user bill interaction data
      const allowances = await fetchBillsAllowance(chainId, account, bills)
      const stakingTokenBalances = await fetchUserBalances(chainId, account, bills)
      const userData = bills.map((bill: BillsConfig) => ({
        index: bill.index,
        //@ts-ignore
        allowance: allowances[bill.index],
        //@ts-ignore
        stakingTokenBalance: stakingTokenBalances[bill.index],
      }))
      dispatch(setBillsUserData({ value: userData, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchUserOwnedBillsDataAsync =
  (chainId: SupportedChainId, account: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    try {
      const bills = selectBillsByChainId(getState(), chainId)
      // Fetch and set user owned bill data without NFT Data
      const userOwnedBills = await fetchUserOwnedBills(chainId, account, bills)
      const mapUserOwnedBills = bills.map((bill: BillsInfoAndConfig) =>
        userOwnedBills.filter((b) => b.address === bill.contractAddress[chainId]),
      )
      const userOwnedBillsData = bills.map((bill: BillsInfoAndConfig, i: number) => ({
        index: bill.index,
        userOwnedBills: mapUserOwnedBills[i],
      }))
      dispatch(setUserOwnedBillsData({ value: userOwnedBillsData, chainId }))

      // Fetch owned bill NFT data
      const ownedBillsData = mapUserOwnedBills.flatMap((bs) => {
        return bs.map((b) => {
          return { id: b.id, billNftAddress: b.billNftAddress, contractAddress: b.address }
        })
      })
      const userBillNftData = await fetchUserOwnedBillNftData(ownedBillsData, chainId, bills)
      const ownedBillsWithNftData = mapUserOwnedBills.map((bs: any, index: number) => {
        return {
          index: bills[index].index,
          userOwnedBillsNfts: [
            ...bs.map((b: any) => {
              return userBillNftData.find((nftB) => parseInt(nftB.id) === parseInt(b.id))?.data
            }),
          ],
        }
      })
      dispatch(setUserOwnedBillsNftData({ value: ownedBillsWithNftData, chainId }))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: SupportedChainId, index: number, account: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const bills = selectBillsByChainId(getState(), chainId)
    const allowances = await fetchBillsAllowance(chainId, account, bills)
    //@ts-ignore
    dispatch(updateBillsUserData({ index, field: 'allowance', value: allowances[index], chainId }))
  }

export const updateUserBalance =
  (chainId: SupportedChainId, index: string, account: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const bills = selectBillsByChainId(getState(), chainId)
    const tokenBalances = await fetchUserBalances(chainId, account, bills)
    //@ts-ignore
    dispatch(updateBillsUserData({ index, field: 'stakingTokenBalance', value: tokenBalances[index], chainId }))
  }

/**
 * @deprecated since multiple NFT contracts
 */
export const updateUserNftData =
  (index: number, billNftId: string, transactionHash: string, chainId: SupportedChainId): AppThunk =>
  async (dispatch: Dispatch) => {
    const fetchedBillNftData = await getNewBillNftData(billNftId, transactionHash, chainId)
    dispatch(updateBillsUserData({ index, field: 'fetchedBillNftData', value: fetchedBillNftData, chainId }))
  }

export default billsSlice.reducer

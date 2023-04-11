import { createSlice } from '@reduxjs/toolkit'

interface address {
  address: string
  chain: string
}

interface DataModel {
  symbol: string
  ranking: string
  change24h: string
  marketCap: string
  validLiquidity: string
  extractableLiquidity: string
  extractableRatio: string
  ownedLiquidity: {
    chainId: string
    token1Symbol: string
    token2Symbol: string
  }
  liquidityDebt: string
  health: string
  concentration: string
  ownership: string
  score: string
  trackedChains: string[] // create new const in sdk?
  unlockedSupply: string
  circulatingSupply: string
  whiteListedAddresses: address[]
}

export interface LHDState {
  industryAverage: string
  industryAverageChange: string
  chainsSupported: string
  verifiedTokens: string
  chartTokens: {
    t1: DataModel[],
    t2: DataModel[],
    t3: DataModel[]
  }
  listData?: DataModel[]
}

export const initialState: LHDState = {
  industryAverage: '0',
  industryAverageChange: '0',
  chainsSupported: '0',
  verifiedTokens: '0',
  chartTokens: {
    t1: [],
    t2: [],
    t3: [],
  },
}

const LHDSlice = createSlice({
  name: 'LHD',
  initialState,
  reducers: {
    addListData: (state, action: { payload: LHDState }) => {
      const { payload } = action
      return {
        ...state,
        industryAverage: payload?.industryAverageChange,
        industryAverageChange: payload?.industryAverageChange,
        chainsSupported: payload?.chainsSupported,
        verifiedTokens: payload?.verifiedTokens,
        chartTokens: payload?.chartTokens,
      }
    },
    addTokenData(state, action: { payload: DataModel }) {
      return {
        ...state,
        listData: state?.listData ? [...state.listData, action.payload] : [action.payload],
      }
    },
  },
})

export const { addListData, addTokenData } = LHDSlice.actions
export default LHDSlice.reducer

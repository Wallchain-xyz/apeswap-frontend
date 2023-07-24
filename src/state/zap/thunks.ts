import { Web3Provider } from '@ethersproject/providers'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from 'state'
import {
  isNativeCurrencyId,
  selectInputTokenDetails,
  setZapApprovalState,
} from './slice'
import {
  requestWidoQuote,
  executeWidoZapTx,
  getWidoSpender,
  executeWidoApproval,
} from './zap-providers/wido/widoThunks'
import { ApprovalState } from 'hooks/useApproveCallback'
import { getErc20Contract } from 'utils/contracts/erc20'
import { QuoteRequest } from 'types'
import { TransactionRequest, TransactionReceipt } from '@ethersproject/abstract-provider'


interface ZapThunkPayload {
  provider: Web3Provider
}

export const executeZap = createAsyncThunk<
  void, // Return type of the thunk
  ZapThunkPayload, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>('zap/executeZap', async ({ provider }, { dispatch, getState }) => {
  // Check the current provider
  const state = getState() as AppState
  const currentZapProtocol = state.zap.zapProtocol

  if (currentZapProtocol === 'ZapV2') {
    // TODO: Zap Flow
  } else if (currentZapProtocol === 'ZapWido') {
    dispatch(executeWidoZapTx({provider}))
  }
})

// TODO: Will end up setting the toToken in state and pulling it out
interface RequestZapQuote extends ZapThunkPayload {
  toToken: string
}

// https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
export const requestZapQuote = createAsyncThunk<
  void, // Return type of the thunk
  RequestZapQuote, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>('zap/requestZapQuote', async ({ toToken, provider }, { dispatch, getState }) => {
  // Check the current provider
  const state = getState() as AppState
  const { chainId: fromChainId } = state.application.web3
  const currentZapProtocol = state.zap.zapProtocol
  const { inputCurrencyAddress: fromTokenAddress, tokenInputAmount } = selectInputTokenDetails(state)

  if (!fromTokenAddress || !tokenInputAmount) {
    return
  }

  if (currentZapProtocol === 'ZapV2') {
    // TODO: Zap Flow
  } else if (currentZapProtocol === 'ZapWido') {
    if (!fromChainId) {
      return
    }
    // Dispatch the action to the wido reducer
    const quoteRequest: QuoteRequest = {
      fromChainId,
      // TODO: same chain
      toChainId: fromChainId,
      fromToken: fromTokenAddress,
      toToken,
      amount: tokenInputAmount.toString(),
    }
    // TODO: leaving off here and need to handle loading starting and stopping
    const t = await dispatch(requestWidoQuote(quoteRequest))
  }
})

export const executeZapApproval = createAsyncThunk<
  TransactionReceipt | null, // Return type of the thunk
  ZapThunkPayload, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>('zap/executeZapApproval', async ({ provider }, { dispatch, getState }) => {
  // Check the current provider
  const state = getState()
  const { account, chainId } = state.application.web3
  const { approvalState, zapProtocol: currentZapProtocol } = state.zap
  const { inputCurrencyAddress: fromToken, tokenInputAmount } = selectInputTokenDetails(state)
  // TEST: How approvals work for zap
  if (
    approvalState == ApprovalState.APPROVED ||
    approvalState == ApprovalState.PENDING ||
    !tokenInputAmount ||
    !fromToken ||
    !account ||
    !chainId
  ) {
    return null
  }

  // FIXME: Looking for input amount
  // const inputToken = state.zap[Field.INPUT].currencyId
  let spender = ''
  let txReceipt: TransactionReceipt | null = null
  dispatch(setZapApprovalState(ApprovalState.PENDING))
  switch (currentZapProtocol) {
    case 'ZapV2':
      // TODO: Zap Flow
      break
    case 'ZapWido':
      const fromChainId = chainId
      // FIXME: Set to chainId for testing
      const toChainId = chainId
      // FIXME: Set to inputToken for testing
      // const toToken = fromToken
      // FIXME: hardcoded Gamma bond
      const toToken = '0x036bdE97eF7F24F7347Fc79CCc798f0bD8D40d5A'
      if (!fromChainId || !toChainId || !fromToken || !toToken) {
        return null
      }
      await dispatch(
        executeWidoApproval({
          provider,
          approveRequest: {
            fromChainId: chainId,
            toChainId: chainId,
            fromToken: fromToken,
            toToken: toToken,
            amount: tokenInputAmount.toString(),
          },
        }),
      )
      txReceipt = getState().zapProtocols.zapWido.approveTx
      break
    default:
      dispatch(setZapApprovalState(ApprovalState.UNKNOWN))
      throw new Error(`checkZapApproval: Unknown Zap Protocol: ${currentZapProtocol}`)
  }

  return txReceipt
})

export const checkZapApproval = createAsyncThunk<
  ApprovalState, // Return type of the thunk
  ZapThunkPayload, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>('zap/checkZapApproval', async ({ provider }, { dispatch, getState }) => {
  // Check the current provider
  const state = getState()
  const { account, chainId } = state.application.web3
  const { zapProtocol: currentZapProtocol } = state.zap
  const { inputCurrencyAddress: fromToken, tokenInputAmount } = selectInputTokenDetails(state)

  if (!fromToken || !account || !chainId || !tokenInputAmount) {
    return ApprovalState.UNKNOWN
  } else if (isNativeCurrencyId(fromToken)) {
    return ApprovalState.APPROVED
  }

  const inputTokenContract = getErc20Contract(fromToken, provider)

  // FIXME: Looking for input amount
  // const inputToken = state.zap[Field.INPUT].currencyId
  let spender = ''
  switch (currentZapProtocol) {
    case 'ZapV2':
      // TODO: Zap Flow
      break
    case 'ZapWido':
      const fromChainId = chainId
      // FIXME: Set to chainId for testing
      const toChainId = chainId
      // FIXME: Set to inputToken for testing
      const toToken = fromToken
      if (!fromChainId || !toChainId || !fromToken || !toToken) {
        return ApprovalState.UNKNOWN
      }
      await dispatch(
        getWidoSpender({
          chainId,
          toChainId,
          fromToken,
          toToken,
        }),
      )
      // Get updated state after dispatch
      spender = getState().zapProtocols.zapWido.widoSpenderAddress || ''
      break
    default:
      throw new Error(`checkZapApproval: Unknown Zap Protocol: ${currentZapProtocol}`)
  }

  if (!spender) {
    console.log('checkZapApproval: spender not found')
    return ApprovalState.UNKNOWN
  }

  const allowance = await inputTokenContract.allowance(account, spender)
  const approvalState = allowance.gte(tokenInputAmount) ? ApprovalState.APPROVED : ApprovalState.NOT_APPROVED
  return approvalState
})

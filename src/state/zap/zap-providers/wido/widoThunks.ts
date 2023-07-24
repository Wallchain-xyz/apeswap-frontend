import { createAsyncThunk } from '@reduxjs/toolkit'
import { Web3Provider } from '@ethersproject/providers'
import {
  QuoteRequest,
  QuoteResult,
  quote,
  ApproveRequest,
  approve,
  getWidoSpender as _getWidoSpender,
  WidoSpenderRequest,
} from 'wido'
import { QuoteResultTimestamped, TxDataTimestamped, WIDO_SLICE_NAME, zapWidoActions } from './widoSlice'
import { AppState } from 'state'
import { TransactionRequest, TransactionReceipt } from '@ethersproject/abstract-provider'

async function sendTransaction(provider: Web3Provider, txData: TransactionRequest): Promise<TransactionReceipt> {
  // Get the signer from the provider
  const signer = provider.getSigner()

  // Send the transaction
  const txResponse = await signer.sendTransaction(txData)

  // Wait for the transaction to be mined
  const txReceipt = await txResponse.wait()

  return txReceipt
}

// TODO: Extract
function secondsSince(timestampMS: number | undefined | null): number {
  if (!timestampMS) {
    return Infinity // If timestampMS is not provided or is null/undefined, return Infinity
  }

  const differenceInMilliseconds = Date.now() - timestampMS
  const differenceInSeconds = differenceInMilliseconds / 1000

  return differenceInSeconds
}

/**
 *
 * These thunks are intended reusable across different applications.
 *
 * For this reason, they do not handle zap loading state which is handled in the zapSlice, but it's expected
 * that the zapSlice will dispatch these thunks and wrap loading state around these calls.
 *
 */

export const getWidoSpender = createAsyncThunk<
  string, // Return type of the thunk
  WidoSpenderRequest, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>(`${WIDO_SLICE_NAME}/getWidoSpender`, async (request, { dispatch, getState }) => {
  const { chainId: fromChainId, toChainId, fromToken, toToken } = request

  return await _getWidoSpender({
    chainId: fromChainId,
    fromToken,
    toChainId: toChainId,
    toToken,
  })
})

// https://docs.joinwido.com/integrate-wido/router#step-1-approve-wido-for-the-swap-transaction
export const requestWidoApproveData = createAsyncThunk<
  TxDataTimestamped | null, // Return type of the thunk
  ApproveRequest | undefined, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>(`${WIDO_SLICE_NAME}/requestWidoApproveData`, async (approveRequestInput, { dispatch, getState }) => {
  if (!approveRequestInput) {
    const { approveRequest } = getState().zapProtocols.zapWido
    if (!approveRequest) {
      return null
    }
    approveRequestInput = approveRequest
  }

  const { fromChainId, toChainId, fromToken, toToken, amount } = approveRequestInput

  const approveTxData = await approve({
    fromChainId,
    toChainId,
    fromToken, // Token you wish to zap with.
    toToken, // Token you wish to zap into.
    amount, // (Optional) Amount to allow. It can be left empty for maximum approval.
  })

  return { ...approveTxData, timestamp: Date.now() }
})

export const executeWidoApproval = createAsyncThunk<
  TransactionReceipt | null, // Return type of the thunk
  { provider: Web3Provider; approveRequest?: ApproveRequest }, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>(`${WIDO_SLICE_NAME}/executeWidoApproval`, async ({ provider, approveRequest }, { dispatch, getState }) => {
  let approveData = getState().zapProtocols.zapWido.approveData
  if (approveRequest) {
    // Always dispatch if approveRequest is provided
    await dispatch(requestWidoApproveData(approveRequest))
    approveData = getState().zapProtocols.zapWido.approveData
  } else {
    // TEST: 60 second delay between approval requests
    if (secondsSince(approveData?.timestamp) > 60) {
      return null
    }
  }
  if (!approveData) {
    // No data to approve
    return null
  }

  const tx = await sendTransaction(provider, approveData)
  return tx
})

// https://docs.joinwido.com/integrate-wido/router#step-2-receive-a-quote
export const requestWidoQuote = createAsyncThunk<
  QuoteResultTimestamped | null, // Return type of the thunk
  QuoteRequest | undefined, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>(`${WIDO_SLICE_NAME}/requestWidoQuote`, async (quoteRequestInput, { dispatch, getState }) => {
  if (!quoteRequestInput) {
    const { quoteRequest } = getState().zapProtocols.zapWido
    if (!quoteRequest) {
      return null
    }
    quoteRequestInput = quoteRequest
  }

  const { fromChainId, toChainId, fromToken, toToken, amount, slippagePercentage, user } = quoteRequestInput

  const quoteResult = await quote({
    fromChainId, // Chain Id of from token
    fromToken, // Token address of from token
    toChainId, // Chain Id of to token
    toToken, // Token address of to token
    amount, // Token amount of from token
    slippagePercentage, // Acceptable max slippage for the swap
    user, // Address of user placing the order.
  })

  /*
  const {
    isSupported, // Whether the route is supported or not
    steps, // The steps this route will take. Used to show the route breakdown
    stepsCount, // Number of steps the route will take
    price, // Expected price of `toToken`
    minPrice, // Minimum accepted price for a successful transaction
    fromTokenUsdPrice, // Price of `fromToken` in US dollars
    fromTokenAmount, // Amount of `fromToken` to send
    fromTokenAmountUsdValue, // Value of `fromTokenAmount` in US dollars
    toTokenUsdPrice, // Price of `toToken` in US dollars
    toTokenAmount, // Expected amount of `toToken` to receive
    toTokenAmountUsdValue, // Value of `toTokenAmount` in US dollars
    expectedSlippage, // Expected slippage calculated from `fromTokenAmountUsdValue` and `toTokenAmountUsdValue`
    minToTokenAmount, // Minimum amount of the to token the user is willing to accept for a successful transaction
    to, // The contract address where the unsigned transaction needs to be sent
    data, // Unsigned transaction data
    value, // Amount of native tokens that need to be sent
    from, // User address who should be sending the tx
  } = quoteResult
  */
  return { ...quoteResult, timestamp: Date.now() }
})

// https://docs.joinwido.com/integrate-wido/router#step-1-approve-wido-for-the-swap-transaction
export const executeWidoZapTx = createAsyncThunk<
  TransactionReceipt | null, // Return type of the thunk
  { provider: Web3Provider; quoteRequest?: QuoteRequest }, // First argument to the payload creator
  { state: AppState } // Types for ThunkAPI
>(`${WIDO_SLICE_NAME}/executeWidoZapTx`, async ({ provider, quoteRequest }, { dispatch, getState }) => {
  let { quoteResult } = getState().zapProtocols.zapWido
  // const { data, to, value } = quoteResult

  if (quoteRequest) {
    // Always dispatch if approveRequest is provided
    await dispatch(requestWidoQuote(quoteRequest))
    quoteResult = getState().zapProtocols.zapWido.quoteResult
  } else {
    // TEST: 60 second delay between approval requests
    if (secondsSince(quoteResult?.timestamp) > 60) {
      return null
    }
  }
  if (!quoteResult) {
    // No data to approve
    return null
  }

  const tx = await sendTransaction(provider, quoteResult)
  return tx
})

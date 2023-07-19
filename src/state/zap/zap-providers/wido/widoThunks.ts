import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuoteRequest, quote } from 'wido'
import { zapWidoActions } from './widoSlice'

/*
  // Example Usage
  import { quote } from "wido"

  const { data, to, value } = await quote({
      fromChainId,  // Chain Id of the from token
      fromToken,  // Token address of from token
      toChainId,  // Chain Id of the to token
      toToken,  // Token address of to token
      amount,  // Token amount in from token
      slippagePercentage,  // Acceptable max slippage for the swap
      user, // Address of user placing the order.
  })

  const tx = await signer.sendTransaction({ data, to, value })

  console.log(tx.hash)
  // "0x66acd87c5e..."

  await tx.wait()
*/

// https://docs.joinwido.com/integrate-wido/router#step-2-receive-a-quote
export const requestWidoQuote = createAsyncThunk('zapWido/requestWidoQuote', async (request: QuoteRequest, { dispatch, getState }) => {
  const { fromChainId, toChainId, fromToken, toToken, amount, slippagePercentage, user } = request

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
  // TODO: Will need to dispatch this to the store
  return quoteResult
})

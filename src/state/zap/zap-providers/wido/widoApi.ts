import { createApi } from '@reduxjs/toolkit/query/react'
// TODO: Track?
import track from '../../../../utils/track'

import {
  QuoteRequest,
  QuoteResult,
  quote,
  ApproveRequest,
  approve,
  getWidoSpender as _getWidoSpender,
  WidoSpenderRequest,
} from 'wido'


export type TxData = { to: string; data: string }

export const widoApi = createApi({
  reducerPath: 'widoApi',
  baseQuery: async () => ({ data: {} }),
  keepUnusedDataFor: 60,
  tagTypes: ['wido', 'wido-approval', 'wido-spender', 'wido-quote'],
  endpoints: (builder) => ({
    getWidoSpender: builder.query<string, WidoSpenderRequest>({
      queryFn: async (args) => {
        try {
          const { chainId: fromChainId, toChainId, fromToken, toToken } = args

          const widoSpender = await _getWidoSpender({
            chainId: fromChainId,
            fromToken,
            toChainId: toChainId,
            toToken,
          })
          return { data: widoSpender }
        } catch (e: any) {
          console.error(e)
          return { error: { status: 'Get Wido Spender Error', message: e.message } }
        }
      },
      providesTags: ['wido-spender'], //this is useful to reset state
    }),
    getWidoApproveData: builder.query<TxData | null, ApproveRequest>({
      queryFn: async (args) => {
        try {
          // FIXME: log
          console.log('Fetching Wido Approve')
          const { fromChainId, toChainId, fromToken, toToken, amount } = args

          const approveTxData = await approve({
            fromChainId,
            toChainId,
            fromToken, // Token you wish to zap with.
            toToken, // Token you wish to zap into.
            amount, // (Optional) Amount to allow. It can be left empty for maximum approval.
          })

          return { data: approveTxData }
        } catch (e: any) {
          console.log(e)
          return { error: { status: 'Get Wido Approve Data', message: e?.message } }
        }
      },
      providesTags: ['wido-approval'],
    }),
    getWidoQuote: builder.query<QuoteResult | null, QuoteRequest>({
      queryFn: async (args) => {
        try {
          // FIXME: log
          console.log('Fetching Wido Quote')

          const { fromChainId, toChainId, fromToken, toToken, amount, slippagePercentage, user } = args

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
          return { data: quoteResult }
        } catch (e: any) {
          console.log(e)
          return { error: { status: 'LiFi Route error', message: e?.message } }
        }
      },
      providesTags: ['wido-quote'],
    }),
  }),
})

export const { useGetWidoSpenderQuery, useGetWidoApproveDataQuery, useLazyGetWidoQuoteQuery } = widoApi

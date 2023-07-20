import { createApi } from '@reduxjs/toolkit/query/react'
import { Protocol } from '@ape.swap/router-sdk'
import { AlphaRouter, ChainId } from '@ape.swap/smart-order-router'
import { getProvider } from 'config/constants/providers'
import { getClientSideQuote, toSupportedChainId } from 'lib/hooks/routing/clientSideSmartOrderRouter'
import { GetQuoteParams, GetQuoteResult, GetRoutesParams, GetRoutesResult, RoutesRequest } from './types'
import { LiFi } from '@lifi/sdk'
import { getFees } from './getFees'
import track from '../../utils/track'
import { humanOutputAmount } from '../../views/Swap/utils'

export enum RouterPreference {
  CLIENT = 'client',
  PRICE = 'price',
}

function getRouter(chainId: ChainId, useApeRPC?: boolean): AlphaRouter {
  const supportedChainId = toSupportedChainId(chainId)
  if (supportedChainId) {
    const provider = getProvider(supportedChainId, useApeRPC)
    return new AlphaRouter({ chainId, provider })
  }
  throw new Error(`Router does not support this chain (chainId: ${chainId}).`)
}

const CLIENT_PARAMS = {
  protocols: [Protocol.V2, Protocol.V3, Protocol.MIXED],
}

export const routingApi = createApi({
  reducerPath: 'routingApi',
  baseQuery: async () => ({ data: {} }),
  keepUnusedDataFor: 100000,
  tagTypes: ['quotes', 'routes'],
  endpoints: (builder) => ({
    getQuote: builder.query<GetQuoteResult, GetQuoteParams>({
      queryFn: async (args: GetQuoteParams) => {
        const { protocols, useApeRPC } = args
        try {
          const router = getRouter(args.tokenInChainId, useApeRPC)
          const result = await getClientSideQuote(
            args,
            router,
            { ...CLIENT_PARAMS, protocols: protocols || CLIENT_PARAMS.protocols },
          )
          return { data: result.data }
        } catch (e: any) {
          console.error(e)
          return { error: { status: 'Client-side error', message: e.message } }
        }
      },
      providesTags: ['quotes'], //this is useful to reset state
    }),
    getRoutes: builder.query<GetRoutesResult, GetRoutesParams>({
      queryFn: async (args: GetRoutesParams) => {
        const {
          chainId,
          fromAmount,
          fromTokenAddress,
          fromTokenSymbol,
          fromTokenDecimals,
          toTokenAddress,
          toTokenSymbol,
          slippage,
        } = args
        const feeStructure = getFees(fromTokenSymbol, toTokenSymbol)
        const routesRequest: RoutesRequest = {
          fromChainId: chainId,
          fromAmount: fromAmount,
          fromTokenAddress: fromTokenAddress,
          toChainId: chainId, // we will have to modify this to go omnichain in the future
          toTokenAddress: toTokenAddress,
          options: {
            slippage: slippage,
            integrator: 'apeswap', //make this a CONST
            fee: feeStructure.fee,
            exchanges: {
              prefer: ['apeswap'],
            },
          },
        }
        try {
          console.log('Fetching LiFi Routes')
          const lifi = new LiFi({ integrator: 'apeswap' })
          const result = await lifi.getRoutes(routesRequest)
          const routes = result.routes
          track({
            event: 'Quote',
            chain: chainId,
            data: {
              inputToken: fromTokenSymbol,
              outputToken: toTokenSymbol,
              inputValue: humanOutputAmount(fromAmount, fromTokenDecimals),
              fee: feeStructure.fee,
              feeTier: feeStructure.tier,
            },
          })
          return { data: { routes, feeStructure } }
        } catch (e: any) {
          console.log(e)
          return { error: { status: 'LiFi Route error', message: e?.message } }
        }
      },
      providesTags: ['routes'],
    }),
  }),
})

export const { useGetQuoteQuery, useGetRoutesQuery } = routingApi

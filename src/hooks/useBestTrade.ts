import { Protocol } from '@ape.swap/router-sdk'
import { Currency, CurrencyAmount, TradeType } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { RouterPreference } from 'state/routing/slice'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { useRoutingAPITrade } from 'state/routing/useRoutingAPITrade'
import { useClientSideRouter } from 'state/user/hooks'

import useAutoRouterSupported from './useAutoRouterSupported'
import { useClientSideV3Trade } from './useClientSideV3Trade'
import useDebounce from './useDebounce'
import useIsWindowVisible from './useIsWindowVisible'

/**
 * Returns the best v2+v3 trade for a desired swap.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
export function useBestTrade(
  tradeType: TradeType,
  amountSpecified?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  protocols?: Protocol[],
  zeroXApi?: boolean,
): {
  state: TradeState
  //TODO: remove any, but need to for useRoutingAPITrade()
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined | any
} {
  const autoRouterSupported = useAutoRouterSupported()
  const isWindowVisible = useIsWindowVisible()

  const [debouncedAmount, debouncedOtherCurrency] = useDebounce(
    useMemo(() => [amountSpecified, otherCurrency], [amountSpecified, otherCurrency]),
    200,
  )

  const [clientSideRouter] = useClientSideRouter()
  const routingAPITrade = useRoutingAPITrade(
    tradeType,
    autoRouterSupported && isWindowVisible ? debouncedAmount : undefined,
    debouncedOtherCurrency,
    //TODO IMPORTANT: hardcoded 0XAPI but should be dynamic. (previously it was)
    // clientSideRouter ? RouterPreference.CLIENT : RouterPreference.API,
    clientSideRouter ? (zeroXApi ? RouterPreference.ZEROX_API : RouterPreference.CLIENT) : RouterPreference.API,
    protocols,
  )
  console.log('routingAPITrade', routingAPITrade)

  const isLoading = routingAPITrade.state === TradeState.LOADING
  const useFallback = !autoRouterSupported || routingAPITrade.state === TradeState.NO_ROUTE_FOUND

  // only use client side router if routing api trade failed or is not supported
  const bestV3Trade = useClientSideV3Trade(
    tradeType,
    useFallback ? debouncedAmount : undefined,
    useFallback ? debouncedOtherCurrency : undefined,
  )

  // only return gas estimate from api if routing api trade is used
  return useMemo(
    () => ({
      ...(useFallback ? bestV3Trade : routingAPITrade),
      ...(isLoading ? { state: TradeState.LOADING } : {}),
    }),
    [bestV3Trade, isLoading, routingAPITrade, useFallback],
  )
}

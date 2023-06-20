import { Protocol } from '@ape.swap/router-sdk'
import { Currency, CurrencyAmount, TradeType } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { RouterPreference } from 'state/routing/slice'

/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped. Input arguments do not need to be memoized, as they will
 * be destructured.
 */
export function useRoutingAPIArguments({
  tokenIn,
  tokenOut,
  amount,
  tradeType,
  routerPreference,
  protocols,
}: {
  tokenIn: Currency | undefined
  tokenOut: Currency | undefined
  amount: CurrencyAmount<Currency> | undefined
  tradeType: TradeType
  routerPreference: RouterPreference
  protocols?: Protocol[]
}) {
  return useMemo(
    () =>
      !tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut)
        ? undefined
        : {
            isNativeInput: tokenIn.isNative,
            amount: amount.quotient.toString(),
            tokenInAddress: tokenIn.wrapped.address,
            tokenInChainId: tokenIn.wrapped.chainId,
            tokenInDecimals: tokenIn.wrapped.decimals,
            tokenInSymbol: tokenIn.wrapped.symbol,
            tokenOutAddress: tokenOut.wrapped.address,
            tokenOutChainId: tokenOut.wrapped.chainId,
            tokenOutDecimals: tokenOut.wrapped.decimals,
            tokenOutSymbol: tokenOut.wrapped.symbol,
            routerPreference,
            protocols,
            type: (tradeType === TradeType.EXACT_INPUT ? 'exactIn' : 'exactOut') as 'exactIn' | 'exactOut',
          },
    [amount, routerPreference, tokenIn, tokenOut, protocols, tradeType],
  )
}

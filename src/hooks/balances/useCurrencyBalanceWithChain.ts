import { Currency, CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { useCurrencyBalancesWithChain } from './useCurrenciesBalancesWithChain'

export default function useCurrencyBalanceWithChain(
  account?: string,
  currency?: Currency,
  chain?: SupportedChainId, // we should create a new chainId type, maybe LiFi Chain?
): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalancesWithChain(
    account,
    useMemo(() => [currency], [currency]),
    chain,
  )[0]
}

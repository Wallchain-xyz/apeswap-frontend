import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { useCurrencyBalancesWithChain } from './useCurrenciesBalancesWithChain'
import { ChainId } from 'config/constants/chains'

export default function useCurrencyBalanceWithChain(
  account?: string,
  currency?: Currency,
  chain?: ChainId, // we should create a new chainId type, maybe LiFi Chain?
): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalancesWithChain(
    account,
    useMemo(() => [currency], [currency]),
    chain,
  )[0]
}

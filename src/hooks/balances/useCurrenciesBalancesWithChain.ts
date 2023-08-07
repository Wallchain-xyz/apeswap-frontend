import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { useNativeCurrencyBalances } from '../../lib/hooks/useCurrencyBalance'
import { useTokenBalancesWithChain } from './useTokenBalancesWithChain'
import { ChainId } from 'config/constants/chains'

export function useCurrencyBalancesWithChain(
  account?: string,
  currencies?: (Currency | undefined)[],
  chain?: ChainId,
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies],
  )

  const tokenBalances = useTokenBalancesWithChain(account, tokens, chain)
  const ethBalance = useNativeCurrencyBalances(currencies?.find((currency) => currency?.isNative)?.chainId)

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency || !chain || currency.chainId !== chain) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative) return ethBalance[0]
        return undefined
      }) ?? [],
    [account, chain, currencies, ethBalance, tokenBalances],
  )
}

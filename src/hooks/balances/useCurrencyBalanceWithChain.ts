import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { useNativeCurrencyBalances } from '../../lib/hooks/useCurrencyBalance'
import { useTokenBalancesWithChain } from './useTokenBalancesWithChain'
import { ChainId } from 'config/constants/chains'

export function useCurrencyBalanceWithChain(
  account?: string,
  currency?: Currency | undefined,
  chain?: ChainId,
): CurrencyAmount<Currency> | undefined {
  const token = currency?.isToken ? (currency as Token) : undefined

  const tokenBalance = useTokenBalancesWithChain(account, token, chain)
  const ethBalance = useNativeCurrencyBalances(currency?.isNative ? currency.chainId : undefined)

  const tokenBalanceString = tokenBalance?.[(currency as Token)?.address]?.toFixed()
  const ethBalanceString = ethBalance?.[0]?.toFixed()

  return useMemo(() => {
    if (!account || !currency || !chain || currency.chainId !== chain) return undefined
    if (currency.isToken) return tokenBalance[currency.address]
    if (currency.isNative) return ethBalance[0]
    return undefined
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [account, chain, currency, tokenBalanceString, ethBalanceString])
}

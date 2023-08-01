import { Currency, CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { useMemo } from 'react'
import { useNativeCurrencyBalances } from '../../lib/hooks/useCurrencyBalance'
import { useTokenBalancesWithChain } from './useTokenBalancesWithChain'

export function useCurrencyBalancesWithChain(
  account?: string,
  currencies?: (Currency | undefined)[],
  chain?: SupportedChainId, // change type
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies],
  )

  //const { chainId } = useWeb3React()
  const tokenBalances = useTokenBalancesWithChain(account, tokens, chain)
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies])
  const ethBalance = useNativeCurrencyBalances(currencies?.[0]?.chainId)

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

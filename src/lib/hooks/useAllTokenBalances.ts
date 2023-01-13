import { CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useAllTokens } from 'hooks/Tokens'
import { useMemo } from 'react'
import { useTokenBalancesWithLoadingIndicator } from './useCurrencyBalance'

export function useAllTokenBalances(): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { account } = useWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const [balances, balancesIsLoading] = useTokenBalancesWithLoadingIndicator(account ?? undefined, allTokensArray)
  return [balances ?? {}, balancesIsLoading]
}

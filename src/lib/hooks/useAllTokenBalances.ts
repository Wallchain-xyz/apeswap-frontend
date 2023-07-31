import { CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useAllTokens } from 'hooks/Tokens'
import { useMemo } from 'react'
import { useTokenBalancesWithLoadingIndicator } from './useCurrencyBalance'
import { useTokenBalancesWithLoadingIndicatorAndChain } from '../../hooks/balances/useTokenBalancesWithLoadingIndicatorAndChain'

export function useAllTokenBalances(
  chain?: SupportedChainId,
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { account } = useWeb3React()
  const allTokens = useAllTokens(chain)
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const [balances, balancesIsLoading] = useTokenBalancesWithLoadingIndicatorAndChain(
    account ?? undefined,
    allTokensArray,
    chain,
  )
  return [balances ?? {}, balancesIsLoading]
}

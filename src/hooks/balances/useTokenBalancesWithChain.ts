import { CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { useTokenBalancesWithLoadingIndicatorAndChain } from './useTokenBalancesWithLoadingIndicatorAndChain'

export function useTokenBalancesWithChain(
  address?: string,
  tokens?: (Token | undefined)[],
  chain?: SupportedChainId,
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicatorAndChain(tokens, chain)[0]
}

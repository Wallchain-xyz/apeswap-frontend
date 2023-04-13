import { SupportedChainId } from '@ape.swap/sdk-core'
import { useSingleContractMultipleData } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'
import { tokens } from '@ape.swap/apeswap-lists'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

export interface TokenPrices {
  symbol: string | undefined
  address: string | undefined
  price: number | undefined
  decimals: number | undefined
}
const useAllTokenPrices = () => {
  const priceGetterContract = usePriceGetter()
  const { chainId } = useWeb3React()
  const filterTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        !values?.lpToken &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )

  const filterLpTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        values?.lpToken &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )
  const tokenCalls = useMemo(
    () =>
      Object.values(filterTokensToCall).map((token) => {
        return [token.address[chainId as SupportedChainId], 0]
      }),
    [filterTokensToCall, chainId],
  )

  const lpTokenCalls = useMemo(
    () =>
      Object.values(filterLpTokensToCall).map((token) => {
        return [token.address[chainId as SupportedChainId], 18]
      }),
    [filterLpTokensToCall, chainId],
  )

  const tokenResults = useSingleContractMultipleData(priceGetterContract, 'getPrice', tokenCalls)
  const lpTokenResults = useSingleContractMultipleData(priceGetterContract, 'getLPPrice', lpTokenCalls)

  const parsedTokenResults = Object.values(filterTokensToCall).map((token, i) => {
    return {
      symbol: token.symbol,
      address: token.address,
      price:
        token.symbol === 'GNANA'
          ? tokenResults?.[0]?.result?.[0]
            ? getBalanceNumber(tokenResults?.[0].result?.[0]?.toString(), 18) * 1.389
            : undefined
          : tokenResults?.[i]?.result?.[0]
          ? getBalanceNumber(tokenResults?.[i].result?.[0]?.toString(), 18)
          : undefined,
      decimals: token.decimals,
    }
  })

  const parsedLpTokenResults = Object.values(filterLpTokensToCall).map((token, i) => {
    return {
      symbol: token.symbol,
      address: token.address,
      price: lpTokenResults?.[i]?.result?.[0]
        ? getBalanceNumber(lpTokenResults?.[i].result?.[0]?.toString(), 18)
        : undefined,
      decimals: token.decimals,
    }
  })
  return [...parsedTokenResults, ...parsedLpTokenResults]
}

export default useAllTokenPrices

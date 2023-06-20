import { SupportedChainId } from '@ape.swap/sdk-core'
import { useSingleContractMultipleData } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'
import { LPType, tokens } from '@ape.swap/apeswap-lists'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

export interface TokenPrices {
  symbol: string | undefined
  address: Record<SupportedChainId, string | undefined>
  price: number | undefined
  decimals: Record<SupportedChainId, number | undefined>
}
const useAllTokenPrices = () => {
  const priceGetterContract = usePriceGetter()
  const { chainId } = useWeb3React()

  //Tokens
  const filterTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        !values?.lpToken &&
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

  //V2 LPs
  const filterLpTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        values?.lpToken &&
        values?.lpToken === 'V2' &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )
  const lpTokenCalls = useMemo(
    () =>
      Object.values(filterLpTokensToCall).map((token) => {
        return [token.address[chainId as SupportedChainId], 18]
      }),
    [filterLpTokensToCall, chainId],
  )

  //Gamma LPs
  const filterGammaLpTokensToCall = Object.fromEntries(
    Object.entries(tokens).filter(
      ([, values]) =>
        values?.lpToken &&
        values?.lpToken === 'GAMMA' &&
        values.address[chainId as SupportedChainId] &&
        values.decimals?.[chainId as SupportedChainId],
    ),
  )
  const gammaLpTokenCalls = useMemo(
    () =>
      Object.values(filterGammaLpTokensToCall).map((token) => {
        return [token.address[chainId as SupportedChainId]]
      }),
    [filterGammaLpTokensToCall, chainId],
  )

  const tokenResults = useSingleContractMultipleData(priceGetterContract, 'getPrice', tokenCalls)
  const lpTokenResults = useSingleContractMultipleData(priceGetterContract, 'getLPPrice', lpTokenCalls)
  const gammaLpTokenResults = useSingleContractMultipleData(priceGetterContract, 'getLPPriceGamma', gammaLpTokenCalls)

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

  const parsedGammaLpTokenResults = Object.values(filterGammaLpTokensToCall).map((token, i) => {
    return {
      symbol: token.symbol,
      address: token.address,
      price: gammaLpTokenResults?.[i]?.result?.[0]
        ? getBalanceNumber(gammaLpTokenResults?.[i].result?.[0]?.toString(), 18)
        : undefined,
      decimals: token.decimals,
    }
  })
  return [...parsedTokenResults, ...parsedLpTokenResults, ...parsedGammaLpTokenResults]
}

export default useAllTokenPrices

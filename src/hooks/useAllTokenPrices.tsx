import { SupportedChainId } from '@ape.swap/sdk-core'
import { useSingleContractMultipleData } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'
import { tokens, LiquidityDex, dexFactories, defaultDexFactories, Protocols } from '@ape.swap/apeswap-lists'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { ZERO_ADDRESS } from 'config/constants/misc'
import { ChainId } from '@ape.swap/smart-order-router'
export interface TokenPrices {
  symbol: string | undefined
  address: Record<SupportedChainId, string | undefined>
  price: number | undefined
  decimals: Record<SupportedChainId, number | undefined>
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
  let tokenResults: any
  let lpTokenResults: any
  const supportedChainId: SupportedChainId = chainId as SupportedChainId

  const tokenCalls = useMemo(
    () =>
      Object.values(filterTokensToCall).map((token) => {
        if (supportedChainId == SupportedChainId.MAINNET) {
          return [token.address[chainId as SupportedChainId], 0]
        } else {
          const liquidityDex = token.liquidityDex?.[chainId as SupportedChainId]
          let dexFactory
          let protocol = 1
          let factoryV2 = defaultDexFactories?.[chainId as SupportedChainId]?.[2] ?? ZERO_ADDRESS
          let factoryV3 = defaultDexFactories?.[chainId as SupportedChainId]?.[3] ?? ZERO_ADDRESS
          let factoryAlgebra = defaultDexFactories?.[chainId as SupportedChainId]?.[4] ?? ZERO_ADDRESS
          if (liquidityDex) {
            dexFactory = dexFactories[chainId as SupportedChainId]?.[liquidityDex as LiquidityDex]
            protocol = dexFactory?.protocol ?? Protocols.Both
            switch (protocol) {
              case 2:
                factoryV2 = dexFactory?.factory ?? factoryV2
                break
              case 3:
                factoryV3 = dexFactory?.factory ?? factoryV3
                break
              case 4:
                factoryAlgebra = dexFactory?.factory ?? factoryAlgebra
                break
            }
          }

          switch (protocol) {
            case 1:
              if (factoryV2 === ZERO_ADDRESS || factoryV3 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:1. Please contact support.')
              }
              break
            case 2:
              if (factoryV2 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:2. Please contact support.')
              }
              break
            case 3:
              if (factoryV3 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:3. Please contact support.')
              }
              break
            case 4:
              if (factoryAlgebra === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:4. Please contact support.')
              }
              break
          }

          return [token.address[chainId as SupportedChainId], protocol, factoryV2, factoryV3, factoryAlgebra]
        }
      }),
    [filterTokensToCall, chainId],
  )
  const lpTokenCalls = useMemo(
    () =>
      Object.values(filterLpTokensToCall).map((token) => {
        if (supportedChainId == SupportedChainId.MAINNET) {
          return [token.address[chainId as SupportedChainId], 18]
        } else {
          const liquidityDex = token.liquidityDex?.[chainId as SupportedChainId]
          let dexFactory
          let protocol = 2
          let factoryV2 = defaultDexFactories?.[chainId as SupportedChainId]?.[2] ?? ZERO_ADDRESS
          let factoryV3 = defaultDexFactories?.[chainId as SupportedChainId]?.[3] ?? ZERO_ADDRESS
          let factoryAlgebra = defaultDexFactories?.[chainId as SupportedChainId]?.[4] ?? ZERO_ADDRESS
          if (liquidityDex) {
            dexFactory = dexFactories[chainId as SupportedChainId]?.[liquidityDex as LiquidityDex]
            protocol = dexFactory?.protocol ?? Protocols.V2
            switch (protocol) {
              case 2:
                factoryV2 = dexFactory?.factory ?? factoryV2
                break
              case 3:
                factoryV3 = dexFactory?.factory ?? factoryV3
                break
              case 4:
                factoryAlgebra = dexFactory?.factory ?? factoryAlgebra
                break
            }
          }

          switch (protocol) {
            case 1:
              if (factoryV2 === ZERO_ADDRESS || factoryV3 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:1. Please contact support.')
              }
              break
            case 2:
              if (factoryV2 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:2. Please contact support.')
              }
              break
            case 3:
              if (factoryV3 === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:3. Please contact support.')
              }
              break
            case 4:
              if (factoryAlgebra === ZERO_ADDRESS) {
                throw new Error('No default dex factory found for retrieving price:4. Please contact support.')
              }
              break
          }

          if (protocol == Protocols.Algebra) {
            protocol = Protocols.Gamma
          }
          return [token.address[chainId as SupportedChainId], protocol, factoryV2, factoryV3, factoryAlgebra]
        }
      }),
    [filterLpTokensToCall, chainId],
  )

  let getPriceFunction = 'getPriceFromFactory'
  let getLPPriceFunction = 'getLPPriceFromFactory'
  if (supportedChainId == SupportedChainId.MAINNET) {
    getPriceFunction = 'getPrice'
    getLPPriceFunction = 'getLPPrice'
  }
  tokenResults = useSingleContractMultipleData(priceGetterContract, getPriceFunction, tokenCalls)
  lpTokenResults = useSingleContractMultipleData(priceGetterContract, getLPPriceFunction, lpTokenCalls)

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

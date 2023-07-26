import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { /*computePairAddress,*/ INIT_CODE_HASH, Pair } from '@ape.swap/v2-sdk'
import { useMultipleContractSingleData } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import { V2_FACTORY_ADDRESSES } from 'config/constants/addresses'

const PAIR_INTERFACE = new Interface(IUniswapV2Pair.abi)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

/**
 * NOTE: Pulled this code from @ape.swap/v2-sdk to be able to support dynamic `INIT_CODE_HASH`es
 */
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
export const computeUniV2PairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
  initCodeHash,
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
  initCodeHash?: string
}): string => {
  const chainId = tokenA.chainId as SupportedChainId
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    // NOTE: Will use optional `initCodeHash` if provided,
    // otherwise will use default ApeSwap `INIT_CODE_HASH` for the given chainId
    initCodeHash || INIT_CODE_HASH[chainId],
  )
}

interface UseV2PairOptions {
  factoryAddress?: string
  initCodeHash?: string
}

export function useV2Pairs(
  currencies: [Currency | undefined, Currency | undefined][],
  { factoryAddress, initCodeHash }: UseV2PairOptions = {},
): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies],
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        // Check if both tokens exist
        if (!tokenA || !tokenB) {
          return undefined
        }
        // Check if both tokens have the same chainId
        if (tokenA.chainId !== tokenB.chainId) {
          return undefined
        }
        // Check if the two tokens are not equal
        if (tokenA.equals(tokenB)) {
          return undefined
        }
        // NOTE: Use the provided factoryAddress if it exists, otherwise use the default ApeSwap `INIT_CODE_HASH` for the given chainId
        const factoryAddressToUse = factoryAddress || V2_FACTORY_ADDRESSES[tokenA.chainId]
        // Compute the UniV2PairAddress
        return computeUniV2PairAddress({
          factoryAddress: factoryAddressToUse,
          tokenA,
          tokenB,
          initCodeHash,
        })
      }),

    [tokens, factoryAddress, initCodeHash],
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
        ),
      ]
    })
  }, [results, tokens])
}

export function useV2Pair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB])
  return useV2Pairs(inputs)[0]
}

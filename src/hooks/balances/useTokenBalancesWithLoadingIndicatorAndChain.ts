import { CurrencyAmount, Token, SupportedChainId } from '@ape.swap/sdk-core'
import { useMemo, useState, useEffect } from 'react'
import { isAddress } from '../../utils'
import { useMultipleContractSingleData } from '../../lib/hooks/multicall'
import JSBI from 'jsbi'
import { Interface } from '@ethersproject/abi'
import ERC20ABI from '../../config/abi/erc20.json'
import { Erc20Interface } from '../../config/abi/types/Erc20'
import multicall, { Call } from '../../utils/multicall'
import { useWeb3React } from '@web3-react/core'
import erc20ABI from '../../config/abi/erc20.json'
import BigNumber from 'bignumber.js'

export function useTokenBalancesWithLoadingIndicatorAndChain(
  address?: string,
  tokens?: (Token | undefined)[],
  chain?: SupportedChainId,
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { account } = useWeb3React()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter((t?: Token): t is Token => {
        return isAddress(t?.address) !== false && t?.chainId === chain
      }) ?? [],

    [chain, tokens],
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt?.address), [validatedTokens])

  const calls: Call[] = useMemo(
    () =>
      validatedTokenAddresses.map((token) => ({
        address: token,
        name: 'balanceOf',
        params: [account],
      })),
    [validatedTokenAddresses, account],
  )

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await multicall(chain as SupportedChainId, erc20ABI, calls)
        setResult(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [chain, calls])

  return useMemo(
    () => [
      address && validatedTokens.length > 0 && result && result?.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
            const value = new BigNumber(result[i]).toJSON()
            const amount = value ? JSBI.BigInt(value.toString()) : undefined
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
            }
            return memo
          }, {})
        : {},
      loading,
    ],
    [address, validatedTokens, result, loading],
  )
}

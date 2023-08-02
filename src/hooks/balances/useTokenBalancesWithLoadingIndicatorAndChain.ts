import { CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { useMemo, useState, useEffect } from 'react'
import { isAddress } from '../../utils'
import JSBI from 'jsbi'
import multicall, { Call } from '../../utils/multicall'
import { useWeb3React } from '@web3-react/core'
import erc20ABI from '../../config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import { ChainId } from '../../config/constants/chains'

export function useTokenBalancesWithLoadingIndicatorAndChain(
  tokens?: (Token | undefined)[],
  chain?: ChainId,
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const { account } = useWeb3React()
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter((t?: Token): t is Token => {
        if (t?.address === '0x0000000000000000000000000000000000000000') return false
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
      if (!chain || calls?.length === 0 || !account) return
      setLoading(true)
      try {
        const data = await multicall(chain, erc20ABI, calls)
        setResult(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [chain, calls, account])

  return useMemo(
    () => [
      account && validatedTokens.length > 0 && result?.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
            const value = new BigNumber(result[i] ?? 0).toJSON()
            const amount = value ? JSBI.BigInt(value.toString()) : undefined
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
            }
            return memo
          }, {})
        : {},
      loading,
    ],
    [account, validatedTokens, result, loading],
  )
}

import { Currency, Token } from '@ape.swap/sdk-core'
import BigNumber from 'bignumber.js'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'

const useTokenPriceUsd = (token: Currency | undefined | null, lpFlag?: boolean): [number, boolean] => {
  const priceGetterContract = usePriceGetter()
  const address = token ? (token as Token).address : undefined
  const isNative = token ? token.isNative : undefined

  const { result, loading } = useSingleCallResult(
    priceGetterContract,
    lpFlag ? 'getLPPrice' : isNative ? 'getETHPrice' : 'getPrice',
    lpFlag ? [address, 18] : isNative ? [0] : [address, 0],
  )
  const bigNumberResponse = new BigNumber(result?.toString() || 0)
  const value = getBalanceNumber(bigNumberResponse, 18)
  return [value, loading]
}

export default useTokenPriceUsd

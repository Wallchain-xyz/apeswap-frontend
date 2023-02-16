import { Currency, CurrencyAmount, Price, Token } from '@ape.swap/sdk-core'
import { BigNumber } from 'ethers'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'

const useTokenPriceUsd = (token: Currency | undefined): [CurrencyAmount<Currency> | null, boolean] => {
  const priceGetterContract = usePriceGetter()
  const address = token ? (token as Token).address : undefined
  const isNative = token ? token.isNative : undefined
  const { result, loading } = useSingleCallResult(
    priceGetterContract,
    isNative ? 'getETHPrice' : 'getPrice',
    isNative ? [0] : [address, 0],
  )

  const currencyAmount = result?.[0] && token ? CurrencyAmount.fromRawAmount(token, result?.[0]) : null
  return [currencyAmount, loading]
}

export default useTokenPriceUsd

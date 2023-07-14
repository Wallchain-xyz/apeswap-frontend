import { Currency, CurrencyAmount, Percent, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { PairState } from 'hooks/useV2Pairs'
import JSBI from 'jsbi'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

type CurrencyOut = {
  outputCurrency: Token
  path: Token[]
  outputAmount: CurrencyAmount<Currency>
  minOutputAmount: string
}

export type MergedZap = {
  currencyIn: {
    currency: Currency
    inputAmount: JSBI
  }
  currencyOut1: CurrencyOut
  currencyOut2: CurrencyOut
  pairOut: {
    pair: Pair
    pairState: PairState
    inAmount: { token1: CurrencyAmount<Currency>; token2: CurrencyAmount<Currency> }
    minInAmount: { token1: string; token2: string }
    totalPairSupply: CurrencyAmount<Token>
    liquidityMinted: CurrencyAmount<Token>
    poolTokenPercentage: Percent
  }
  liquidityProviderFee: CurrencyAmount<Currency>
  totalPriceImpact: Percent
  chainId: SupportedChainId
}

export enum ZapCallbackState {
  STANDBY,
  INVALID,
  LOADING,
  VALID,
}

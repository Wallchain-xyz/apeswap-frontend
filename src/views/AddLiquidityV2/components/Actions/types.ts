import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'

export interface AddLiquidityActionsProps {
  currencies: { CURRENCY_A?: Currency; CURRENCY_B?: Currency }
  parsedAmounts: { CURRENCY_A?: CurrencyAmount<Currency>; CURRENCY_B?: CurrencyAmount<Currency> }
  error: string
  noLiquidity: boolean 
  tradeValueUsd: number
  price: Price<Currency, Currency>
  poolTokenPercentage: Percent
  liquidityMinted: CurrencyAmount<Token>
}

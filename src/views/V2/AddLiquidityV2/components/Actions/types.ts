import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'
import { ReactNode } from 'react';

export interface AddLiquidityActionsProps {
  currencies: { CURRENCY_A?: Currency; CURRENCY_B?: Currency }
  parsedAmounts: { CURRENCY_A?: CurrencyAmount<Currency>; CURRENCY_B?: CurrencyAmount<Currency> }
  error: ReactNode
  noLiquidity: boolean | undefined
  price: Price<Currency, Currency> | undefined
  poolTokenPercentage: Percent | undefined
  liquidityMinted: CurrencyAmount<Token> | undefined
}

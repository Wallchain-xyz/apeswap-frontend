import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager, Position } from '@ape.swap/v3-sdk'

export interface AddInterface {
  parsedAmounts: {
    CURRENCY_A?: CurrencyAmount<Currency> | undefined
    CURRENCY_B?: CurrencyAmount<Currency> | undefined
  }
  positionManager: NonfungiblePositionManager | null
  baseCurrency: Currency | null | undefined
  quoteCurrency: Currency | null | undefined
  position: Position | undefined
  outOfRange: boolean
  noLiquidity: boolean | undefined
}

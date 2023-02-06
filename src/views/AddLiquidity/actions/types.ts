import { Currency } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager, Position } from '@ape.swap/v3-sdk'

export interface AddInterface {
  positionManager: NonfungiblePositionManager | null
  baseCurrency: Currency | null | undefined
  quoteCurrency: Currency | null | undefined
  position: Position | undefined
  outOfRange: boolean
  noLiquidity: boolean | undefined
}

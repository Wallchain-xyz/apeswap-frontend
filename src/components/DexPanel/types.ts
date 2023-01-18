import { Currency } from '@ape.swap/sdk-core'

// TODO: Change field type to not be any

export interface DexPanelProps {
  value: string
  currency?: Currency | null
  otherCurrency?: Currency | null
  panelText?: string
  // Using any for field type to use the same functions for both swap and liqudity
  onCurrencySelect: (currency: Currency) => void
  onUserInput: (input: string) => void
  handleMaxInput?: (field: any) => void
  setTradeValueUsd?: (val: number) => void
  fieldType?: any
  // smartRouter?: SmartRouter
  showCommonBases?: boolean
  // lpPair?: Pair
  disabled?: boolean
  ordersDisabled?: boolean
  independentField?: any
  disableTokenSelect?: boolean
  isZapInput?: boolean
  userBalance?: number
}

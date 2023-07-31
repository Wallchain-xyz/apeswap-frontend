import { Currency, SupportedChainId } from '@ape.swap/sdk-core'

export interface OmniChainPanelProps {
  value: string
  currency?: Currency | null
  currencyChain?: SupportedChainId | null
  panelText?: string
  onCurrencySelect: (currency: Currency, chain: SupportedChainId) => void
  onUserInput?: (input: string) => void
  handleMaxInput?: (field: any) => void
  setTradeValueUsd?: (val: number) => void
  fieldType?: any
  showCommonBases?: boolean
  disabled?: boolean
  ordersDisabled?: boolean
  independentField?: any
  disableTokenSelect?: boolean
  apiPrice?: string
}

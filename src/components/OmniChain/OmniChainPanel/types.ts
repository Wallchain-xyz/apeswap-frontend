import { Currency } from '@ape.swap/sdk-core'
import { ChainId } from 'config/constants/chains'

export interface OmniChainPanelProps {
  value: string
  currency?: Currency | null
  currencyChain?: ChainId | null
  panelText?: string
  onCurrencySelect: (currency: Currency, chain: ChainId) => void
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

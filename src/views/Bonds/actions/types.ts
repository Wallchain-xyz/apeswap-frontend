import { Currency } from '@ape.swap/sdk-core'
import { BillsInfoAndConfig } from '../types'
import { MergedZap } from 'state/zap/actions'
import { TradeState } from 'state/routing/types'

export interface ClaimProps {
  billAddress: string
  pendingRewards: string
  billIds: string[]
  mt?: string[]
  earnToken: string
  hasDarkBg?: boolean
}

export interface TransferProps {
  billNftAddress: string
  billId: string
  toAddress: string
  disabled?: boolean
}

export interface BuyProps {
  bill: BillsInfoAndConfig
  onBillId: (billId: string, transactionHash: string) => void
  onTransactionSubmitted: (trxSent: boolean) => void
}

export interface BillActionsProps {
  bill: BillsInfoAndConfig
  zap: MergedZap
  zapRouteState: TradeState
  currencyB: Currency
  handleBuy: () => void
  billValue: string
  value: string
  purchaseLimit: string
  balance: string
  pendingTrx: boolean
  errorMessage: string | null
}

export interface DualCurrencySelector {
  currencyA: Currency
  currencyB: Currency | undefined
}

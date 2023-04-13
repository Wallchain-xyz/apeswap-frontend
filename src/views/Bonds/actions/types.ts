import { Currency } from '@ape.swap/sdk-core'
import { Bills } from '../types'

export interface ClaimProps {
  billAddress: string
  pendingRewards: string
  billIds: string[]
  buttonSize?: string
  margin: string
}

export interface TransferProps {
  billNftAddress: string
  billId: string
  toAddress: string
  disabled?: boolean
}

export interface BuyProps {
  bill: Bills
  onBillId: (billId: string, transactionHash: string) => void
  onTransactionSubmited: (trxSent: boolean) => void
}

export interface BillActionsProps {
  bill: Bills
  zap: any //MergedZap
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
  currencyB: Currency
}

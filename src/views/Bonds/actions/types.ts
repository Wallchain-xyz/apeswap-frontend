import { Currency, SupportedChainId } from '@ape.swap/sdk-core'
import { Bills } from '../types'
import { MergedZap } from 'state/zap/actions'
import { TradeState } from 'state/routing/types'
import { QuoteResult } from 'wido'
import { ZapVersion } from '@ape.swap/apeswap-lists'

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
  bill: Bills
  onBillId: (billId: string, transactionHash: string) => void
  onTransactionSubmited: (trxSent: boolean) => void
}

export interface BillActionsProps {
  bill: Bills
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
  isWidoSupported: boolean
  widoQuote: QuoteResult | undefined | null
  zapVersion: ZapVersion
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
  inputTokenChainId: SupportedChainId
}

export interface DualCurrencySelector {
  currencyA: Currency
  currencyB: Currency | undefined
}

import { createAction } from '@reduxjs/toolkit'
import { SupportedChainId } from '@ape.swap/sdk-core'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

//change chain type
export const selectCurrency = createAction<{ field: Field; currencyId: string; chain: SupportedChainId }>(
  'swap/selectCurrency',
)
export const switchCurrencies = createAction<void>('swap/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('swap/typeInput')
export const replaceSwapState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  inputChain?: SupportedChainId // change type
  outputCurrencyId?: string
  outputCain?: SupportedChainId // change type
  recipient: string | null
}>('swap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('swap/setRecipient')

import { Token } from '@ape.swap/sdk-core'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import { createAction } from '@reduxjs/toolkit'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export const selectInputCurrency = createAction<{ currencyId: string }>('zap/selectInputCurrency')
export const selectOutputCurrency = createAction<{ currency1: string; currency2: string }>('zap/selectOutputCurrency')
export const setZapType = createAction<{ zapType: ZapType }>('zap/setZapType')
export const typeInput = createAction<{ field: Field; typedValue: string }>('zap/typeInput')
export const replaceZapState = createAction<{
  field: string
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: { currency1: string; currency2: string }
  recipient: string | undefined
  zapType: ZapType
}>('zap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('zap/setRecipient')
export const setInputList = createAction<{ zapInputList: { [symbol: string]: Token } }>('zap/setInputList')
export const setZapNewOutputList = createAction<{ zapNewOutputList: { currencyIdA: string; currencyIdB: string }[] }>(
  'zap/setZapNewOutputList',
)

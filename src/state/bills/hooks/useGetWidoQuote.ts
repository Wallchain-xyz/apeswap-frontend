import { useQuery } from '@tanstack/react-query'
import { quote } from 'wido'
import { useSelector } from 'react-redux'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Types
import { AppState } from 'state'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getWidoQuote = async ({
  inputCurrencyId,
  amount,
  toToken,
  slippagePercentage,
}: {
  inputCurrencyId: any
  amount: any
  toToken: string
  slippagePercentage: number
}): Promise<any> => {
  const quoteResult = await quote({
    fromChainId: 137,
    toChainId: 137,
    fromToken: inputCurrencyId,
    toToken,
    user: '0x0FAD8a2d60aD6Cd1e46d7898BA4feEEBB60979f2', // User
    amount,
    slippagePercentage,
  })

  return quoteResult
}

export default function useGetWidoQuote({
  currencyA,
  currencyB,
  toToken,
}: {
  currencyA: any
  currencyB: any
  toToken: string
}) {
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)
  const { userZapSlippage } = useSelector<AppState, AppState['user']>((state) => state.user)

  const amount = convertToTokenValue(amountInput || '0', 18)
  const slippagePercentage = userZapSlippage / 100 || 0.05
  const inputCurrencyId = currencyA.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : '0x1234'

  return useQuery({
    queryKey: [QUERY_KEYS.WIDO_QUOTE, inputCurrencyId, amount, toToken, slippagePercentage],
    queryFn: () => getWidoQuote({ inputCurrencyId, amount, toToken, slippagePercentage }),
    enabled: !!amountInput,
  })
}

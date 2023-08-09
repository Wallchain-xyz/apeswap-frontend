import { useQuery } from '@tanstack/react-query'
import { quote, QuoteResult } from 'wido'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Hooks
import { useV2Pair } from 'hooks/useV2Pairs'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Types
import { AppState } from 'state'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'
const WIDO_NATIVE_TOKEN_ID = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const getInputCurrencyAddress = ({
  currencyA,
  currencyB,
  LPTokenAddress,
}: {
  currencyA: any
  currencyB: any
  LPTokenAddress: string
}): string => {
  if (currencyB) {
    return LPTokenAddress
  }
  const { tokenInfo: { address } = { address: '' } } = currencyA
  return currencyA.isNative ? WIDO_NATIVE_TOKEN_ID : address
}

export const getWidoQuote = async ({
  inputCurrencyId,
  amount,
  toToken,
  slippagePercentage,
  account,
  chainId,
}: {
  inputCurrencyId: any
  amount: any
  toToken: string
  slippagePercentage: number
  account: string
  chainId: SupportedChainId
}): Promise<QuoteResult | null> => {
  try {
    const quoteResult = await quote({
      fromChainId: chainId,
      toChainId: chainId,
      fromToken: inputCurrencyId,
      toToken,
      user: account,
      amount,
      slippagePercentage,
    })
    return quoteResult
  } catch (e) {
    console.error({ e })
    return null
  }
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
  const { chainId = 137, account = '0x123' } = useWeb3React()
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)
  const { userZapSlippage } = useSelector<AppState, AppState['user']>((state) => state.user)

  const [, pair] = useV2Pair(currencyA, currencyB)

  const { liquidityToken: { address } = { address: '' } } = pair ?? {}

  const amount = convertToTokenValue(amountInput || '0', 18)
  const slippagePercentage = userZapSlippage / 100 || 0.05
  const inputCurrencyId = getInputCurrencyAddress({ currencyA, currencyB, LPTokenAddress: address })

  return useQuery({
    queryKey: [
      QUERY_KEYS.WIDO_QUOTE,
      { inputCurrencyId },
      { amountInput },
      { toToken },
      slippagePercentage,
      account,
      chainId,
    ],
    queryFn: () => getWidoQuote({ inputCurrencyId, amount, toToken, slippagePercentage, account, chainId }),
    enabled: !!amountInput,
  })
}
import { useQuery } from '@tanstack/react-query'
import { quote, QuoteResult } from 'wido'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { ZapVersion } from '@ape.swap/apeswap-lists'

// Utils
import convertToTokenValue from 'utils/convertToTokenValue'

// Types
import { AppState } from 'state'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getWidoQuote = async ({
  inputTokenAddress,
  amount,
  toTokenAddress,
  slippagePercentage,
  account,
  fromChainId,
  toChainId,
}: {
  inputTokenAddress: string
  amount: string
  toTokenAddress: string
  slippagePercentage: number
  account: string
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}): Promise<QuoteResult | null> => {
  try {
    const quoteResult = await quote({
      fromChainId,
      toChainId,
      fromToken: inputTokenAddress,
      toToken: toTokenAddress,
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
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
  zapVersion,
  fromChainId,
  toChainId,
}: {
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
  zapVersion: ZapVersion
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
}) {
  const { chainId = 0, account = '' } = useWeb3React()
  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)
  const { userZapSlippage } = useSelector<AppState, AppState['user']>((state) => state.user)

  const amount = convertToTokenValue(amountInput || '0', inputTokenDecimals).toString()
  const slippagePercentage = userZapSlippage / 100 || 0.05
  const isEnabled = !!inputTokenAddress && !!toTokenAddress && zapVersion === ZapVersion.Wido

  return useQuery({
    queryKey: [
      QUERY_KEYS.WIDO_QUOTE,
      { inputTokenAddress },
      { amount },
      { toTokenAddress },
      { slippagePercentage },
      { account },
      { chainId },
      { zapVersion },
    ],
    queryFn: () =>
      getWidoQuote({ inputTokenAddress, amount, toTokenAddress, slippagePercentage, account, fromChainId, toChainId }),
    enabled: isEnabled && !!chainId && !!account,
  })
}

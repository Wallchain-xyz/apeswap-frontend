import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { approve, ApproveResult, QuoteResult } from 'wido'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Hooks
import useGetWidoApprove from './useGetWidoApprove'
import { useV2Pair } from 'hooks/useV2Pairs'
import useSignTransaction from './useSignTransaction'

// Utils
import getCurrencyInfo from 'utils/getCurrencyInfo'
import convertToTokenValue from 'utils/convertToTokenValue'

// Constants
import { QUERY_KEYS } from 'config/constants/queryKeys'

// Types
import { AppState } from 'state'

const useApproveWidoSpender = ({
  currencyA,
  currencyB,
  toToken,
}: {
  currencyA: any
  currencyB: any
  toToken: string
}) => {
  const queryClient = useQueryClient()
  const { account, provider, isActive } = useWeb3React()
  const [, pair] = useV2Pair(currencyA, currencyB)

  const { typedValue: amountInput } = useSelector<AppState, AppState['zap']>((state) => state.zap)
  const { address: fromTokenAddress, decimals } = getCurrencyInfo({ currencyA, currencyB, pair })

  const amount = convertToTokenValue(amountInput || '0', decimals).toString()
  const isEnabled = isActive && !!fromTokenAddress && !!toToken && Number(amount) > 0 && !currencyA.isNative

  const { signTransaction } = useSignTransaction()
  const { data: widoSpenderData } = useGetWidoApprove({ fromToken: fromTokenAddress, toToken, amount, isEnabled })

  const { data, to } = widoSpenderData || {}

  return useMutation({
    mutationFn: () => {
      console.log('Signing Wido permission Tx')
      return signTransaction({ data, to }).then((hash: any) => provider?.waitForTransaction(hash))
    },
    onSuccess: () => {
      // will wait for query invalidation to finish,
      // mutation state will stay loading while related queries update
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WIDO_ALLOWANCE, { account }, { fromToken: fromTokenAddress }, { toToken }],
      })
    },
  })
}

export default useApproveWidoSpender

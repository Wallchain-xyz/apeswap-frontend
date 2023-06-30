import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { Trade } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import useENSAddress from 'hooks/useENSAddress'
import { SignatureData } from 'hooks/useERC20Permit'
import useModal from 'hooks/useModal'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { WrapErrorText, WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { useCallback, useState } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { useIsExpertMode } from 'state/user/hooks'
import track from 'utils/track'
import ConfirmSwap from '../components/ConfirmSwap'
import { confirmPriceImpactWithoutFee } from '../utils'
import { useDerivedSwapInfo } from '../../../state/swap/hooks'
import { useRouter } from 'next/router'
import { useHideCircular } from '../../../hooks/useHideCircular'

const TRADE_STRING = 'SwapRouter'

const Swap = ({
  tradeState,
  trade,
  allowedSlippage,
  signatureData,
  recipient,
  stablecoinPriceImpact,
  wrapType,
  showWrap,
  wrapInputError,
  onWrap,
}: {
  tradeState: TradeState
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  signatureData: SignatureData | null
  recipient: string | null
  stablecoinPriceImpact: Percent | null
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
}) => {
  const { chainId } = useWeb3React()
  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient,
    signatureData,
  )

  const [inputTokenUsdVal] = useTokenPriceUsd(trade?.inputAmount?.currency ?? undefined)
  const [outputTokenUsdVal] = useTokenPriceUsd(trade?.outputAmount?.currency ?? undefined)

  const isExpertMode = useIsExpertMode()

  const { currencies } = useDerivedSwapInfo()
  const router = useRouter()
  const hideCircular = useHideCircular()

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (stablecoinPriceImpact && !confirmPriceImpactWithoutFee(stablecoinPriceImpact)) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })
        const routes = trade?.routes?.map((route) => route.protocol)
        track({
          event: 'Swap',
          chain: chainId,
          data: {
            routes: routes?.join(','),
            inputToken: trade?.inputAmount?.currency?.symbol,
            outputToken: trade?.outputAmount?.currency?.symbol,
            inputValue: parseFloat(trade?.inputAmount?.toSignificant(6) || '0'),
            outputValue: parseFloat(trade?.outputAmount?.toSignificant(6) || '0'),
            inputUsdValue: inputTokenUsdVal * parseFloat(trade?.inputAmount?.toSignificant(6) || '0'),
            outputUsdValue: outputTokenUsdVal * parseFloat(trade?.outputAmount?.toSignificant(6) || '0'),
          },
        })
        if (currencies?.OUTPUT?.symbol?.toLowerCase() === 'banana' && !hideCircular) router.push('?modal=circular-buy')
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message ? error.message : error,
          txHash: undefined,
        })
      })
  }, [
    swapCallback,
    chainId,
    stablecoinPriceImpact,
    tradeToConfirm,
    showConfirm,
    outputTokenUsdVal,
    inputTokenUsdVal,
    trade,
    router,
    currencies?.OUTPUT?.symbol,
    hideCircular,
  ])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false, swapErrorMessage: undefined })) // if there was a tx hash, we want to clear the input
  }, [])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwap
      trade={trade}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      onDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'swapConfirmModal',
  )

  const handleConfirmSwap = () => {
    if (currencies?.INPUT?.symbol?.toLowerCase() === 'banana' && !hideCircular) router.push('?modal=circular-sell')
    onPresentConfirmModal()
  }

  return showWrap ? (
    <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
      {wrapInputError ? (
        <WrapErrorText wrapInputError={wrapInputError} />
      ) : wrapType === WrapType.WRAP ? (
        <>Wrap</>
      ) : wrapType === WrapType.UNWRAP ? (
        <>Unwrap</>
      ) : null}
    </Button>
  ) : (
    <Button
      fullWidth
      onClick={isExpertMode ? handleSwap : handleConfirmSwap}
      disabled={
        tradeState === TradeState.LOADING ||
        tradeState === TradeState.SYNCING ||
        tradeState === TradeState.INVALID ||
        tradeState === TradeState.NO_ROUTE_FOUND
      }
    >
      Swap
    </Button>
  )
}

export default Swap

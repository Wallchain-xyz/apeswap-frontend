import { Currency, TradeType } from '@ape.swap/sdk-core'
import { Trade } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { SignatureData } from 'hooks/useERC20Permit'
import useModal from 'hooks/useModal'
import { WrapErrorText, WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { useCallback, useState } from 'react'
import { TradeState } from 'state/routing/types'
import ConfirmSwap from '../components/ConfirmSwap'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useRouter } from 'next/router'
import { useHideCircular } from 'hooks/useHideCircular'
import { Route } from '@lifi/sdk'
import { useSwapCallback } from '../../../hooks/useSwapCallback'
import track from '../../../utils/track'
import { humanOutputAmount } from '../utils'

const Swap = ({
                routingState,
                selectedRoute,
                wrapType,
                showWrap,
                wrapInputError,
                onWrap,
              }: {
  routingState?: TradeState
  selectedRoute: Route | undefined
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
}) => {
  const { chainId } = useWeb3React()
  // modal and loading
  const [{ showConfirm, swapErrorMessage, attemptingTxn, txHash}, setSwapState] = useState<{
    showConfirm: boolean
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const { currencies } = useDerivedSwapInfo()
  const router = useRouter()
  const hideCircular = useHideCircular()

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false, swapErrorMessage: undefined })) // if there was a tx hash, we want to clear the input
  }, [])

  const { callback } = useSwapCallback(selectedRoute)

  const handleSwap = useCallback(() => {
    if (!callback) return
    setSwapState({ attemptingTxn: true, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    callback()
      .then((res) => {
        setSwapState({
          attemptingTxn: false,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: undefined,
        })
        track({
          event: 'Swap',
          chain: chainId,
          data: {
            inputToken: res?.fromToken.symbol,
            outputToken: res.toToken.symbol,
            inputValue: humanOutputAmount(res.fromAmount, res.fromToken.decimals),
            outputValue: humanOutputAmount(res.toAmount, res.toToken.decimals),
            inputUsdValue: res.fromAmountUSD,
            outputUsdValue: res.toAmountUSD,
          },
        })
        if (currencies?.OUTPUT?.symbol?.toLowerCase() === 'banana' && !hideCircular) router.push('?modal=circular-buy')
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          showConfirm,
          swapErrorMessage: error.message ? error.message : error,
          txHash: undefined,
        })
      })
  }, [callback, chainId, currencies?.OUTPUT?.symbol, hideCircular, router, showConfirm])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwap
      selectedRoute={selectedRoute!}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
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
      onClick={handleConfirmSwap}
      disabled={
        routingState === TradeState.LOADING ||
        routingState === TradeState.SYNCING ||
        routingState === TradeState.INVALID ||
        routingState === TradeState.NO_ROUTE_FOUND
      }
    >
      Swap
    </Button>
  )
}

export default Swap

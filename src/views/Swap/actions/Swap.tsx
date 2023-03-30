import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { Trade } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Button, Text } from 'components/uikit'
import useENSAddress from 'hooks/useENSAddress'
import { SignatureData } from 'hooks/useERC20Permit'
import useModal from 'hooks/useModal'
import { useSwapCallback } from 'hooks/useSwapCallback'
import { WrapErrorText, WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { useCallback, useState } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { useIsExpertMode } from 'state/user/hooks'
import track from 'utils/track'
import ConfirmSwap from '../components/ConfirmSwap'
import { confirmPriceImpactWithoutFee } from '../utils'

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
  const { account, chainId } = useWeb3React()
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
  const { address: recipientAddress } = useENSAddress(recipient)

  const isExpertMode = useIsExpertMode()

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
        // sendEvent({
        //   category: 'Swap',
        //   action: 'transaction hash',
        //   label: hash,
        // })
        track({
          event: 'Swap',
          chain: chainId,
          data: {
            label: [
              TRADE_STRING,
              trade?.inputAmount?.currency?.symbol,
              trade?.outputAmount?.currency?.symbol,
              'MH',
            ].join('/'),
          },
        })
      })
      .catch((error) => {
        console.log(error)
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
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
  ])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false, swapErrorMessage: undefined })) // if there was a tx hash, we want to clear the input
  }, [])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwap
      trade={trade}
      // originalTrade={tradeToConfirm}
      // onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      // bestRoute={bestRoute}
      // recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      onDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'swapConfirmModal',
  )

  return showWrap ? (
    <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
      {wrapInputError ? (
        <WrapErrorText wrapInputError={wrapInputError} />
      ) : wrapType === WrapType.WRAP ? (
        <Text>Wrap</Text>
      ) : wrapType === WrapType.UNWRAP ? (
        <Text>Unwrap</Text>
      ) : null}
    </Button>
  ) : (
    <Button
      fullWidth
      onClick={isExpertMode ? handleSwap : onPresentConfirmModal}
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

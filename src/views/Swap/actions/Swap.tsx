import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { Trade } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import useENSAddress from 'hooks/useENSAddress'
import { SignatureData } from 'hooks/useERC20Permit'
import { useSwapCallback } from 'hooks/useSwapCallback'
import { useCallback, useState } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { confirmPriceImpactWithoutFee } from '../utils'

const TRADE_STRING = 'SwapRouter'

const Swap = ({
  tradeState,
  trade,
  allowedSlippage,
  signatureData,
  recipient,
  stablecoinPriceImpact,
}: {
  tradeState: TradeState
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  signatureData: SignatureData | null
  recipient: string | null
  stablecoinPriceImpact: Percent | null
}) => {
  const { account } = useWeb3React()
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
        // sendEvent({
        //   category: 'Swap',
        //   action:
        //     recipient === null
        //       ? 'Swap w/o Send'
        //       : (recipientAddress ?? recipient) === account
        //       ? 'Swap w/o Send + recipient'
        //       : 'Swap w/ Send',
        //   label: [TRADE_STRING, trade?.inputAmount?.currency?.symbol, trade?.outputAmount?.currency?.symbol, 'MH'].join(
        //     '/',
        //   ),
        // })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    swapCallback,
    stablecoinPriceImpact,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
  ])

  return (
    <Button
      fullWidth
      onClick={handleSwap}
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

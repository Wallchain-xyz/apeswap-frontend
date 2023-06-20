import { useCallback, useMemo } from 'react'
import { useZapCallback } from '../../hooks/useZapCallback'
import { useDerivedZapInfo, useZapState } from '../../state/zap/hooks'
import { useUserZapSlippageTolerance } from '../../state/user/hooks'
import track from '../../utils/track'
import BigNumber from 'bignumber.js'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useWeb3React } from '@web3-react/core'

const useDualDeposit = (
  isZapSelected: boolean,
  onStakeLp: (value: string) => void,
  pid: number,
  handlePendingTx: (value: boolean) => void,
  poolAddress: string,
  onDismiss: () => void,
) => {
  const { chainId, provider } = useWeb3React()
  const { recipient, typedValue, zapType } = useZapState()
  const { zap } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserZapSlippageTolerance()
  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tokenPrice] = useTokenPriceUsd(zap.currencyIn.currency)

  console.log('used here 0x7f09bD2801A7b795dF29C273C4afbB0Ff15E2D63')
  const { callback: zapCallback } = useZapCallback(
    zap,
    zapType,
    zapSlippage,
    recipient,
    poolAddress,
    //TODO: For ZapV2 fix this
    'Not used',
    '',
    pid.toString(),
  )

  return useCallback(async () => {
    handlePendingTx(true)
    if (isZapSelected) {
      await onStakeLp(typedValue)
    } else {
      await zapCallback()
        .then((hash: any) => {
          provider?.waitForTransaction(hash).then(() => {
            handlePendingTx(false)
            setZapSlippage(originalSlippage)
            onDismiss()
          })
          const amount = getBalanceNumber(new BigNumber(zap.currencyIn.inputAmount.toString()))
          track({
            event: 'zap',
            chain: chainId,
            data: {
              cat: 'farm',
              token1: zap.currencyIn.currency.symbol,
              token2: `${zap.currencyOut1.outputCurrency.symbol}-${zap.currencyOut2.outputCurrency.symbol}`,
              amount,
              usdAmount: amount * tokenPrice,
            },
          })
        })
        .catch((error: any) => {
          console.error(error)
          handlePendingTx(false)
          setZapSlippage(originalSlippage)
        })
    }
  }, [
    handlePendingTx,
    isZapSelected,
    onStakeLp,
    typedValue,
    zapCallback,
    provider,
    zap,
    chainId,
    tokenPrice,
    setZapSlippage,
    originalSlippage,
    onDismiss,
  ])
}

export default useDualDeposit

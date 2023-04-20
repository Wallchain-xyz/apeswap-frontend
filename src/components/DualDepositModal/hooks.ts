import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
// import {
//   updateDualFarmUserEarnings,
//   updateDualFarmUserStakedBalances,
//   updateDualFarmUserTokenBalances,
// } from '../../state/dualFarms'
// import { useToast } from '../../state/hooks'
import { useTranslation } from '../../contexts/Localization'
import { useZapCallback } from '../../hooks/useZapCallback'
import { useDerivedZapInfo, useZapState } from '../../state/zap/hooks'
import { useUserSlippageTolerance, useUserZapSlippageTolerance } from '../../state/user/hooks'
import track from '../../utils/track'
import BigNumber from 'bignumber.js'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useWeb3React } from '@web3-react/core'
// import { useTokenPriceUsd } from '../../hooks/useTokenPriceUsd'

const useDualDeposit = (
  isZapSelected: boolean,
  onStakeLp: (value: string) => void,
  pid: number,
  handlePendingTx: (value: boolean) => void,
  poolAddress: string,
  onDismiss: () => void,
) => {
  // const { toastError } = useToast()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { account, chainId, provider } = useWeb3React()
  const { recipient, typedValue, zapType } = useZapState()
  const { zap } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserZapSlippageTolerance()
  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tokenPrice] = useTokenPriceUsd(zap.currencyIn.currency)

  const { callback: zapCallback } = useZapCallback(
    zap,
    zapType,
    zapSlippage,
    recipient,
    poolAddress,
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
            // dispatch(updateDualFarmUserStakedBalances(chainId, pid, account))
            // dispatch(updateDualFarmUserEarnings(chainId, pid, account))
            // dispatch(updateDualFarmUserTokenBalances(chainId, pid, account))
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
          // toastError(
          //   error?.message.includes('INSUFFICIENT')
          //     ? t('Slippage Error: Please go to the GET LP modal and check your slippage using the ⚙️ icon')
          //     : error?.message || t('Error: Please try again.'),
          // )
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
    dispatch,
    pid,
    account,
    onDismiss,
    // toastError,
    t,
  ])
}

export default useDualDeposit

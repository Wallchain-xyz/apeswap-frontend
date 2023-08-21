import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../hooks/useApproveBill'
import { ApprovalState, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import { BillActionsProps } from './types'
import { useWeb3React } from '@web3-react/core'
import { BuyButton } from './styles'
import { Button } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import { TradeState } from 'state/routing/types'
import { getBNWithDecimals } from '../../../utils/getBalanceNumber'
import { useToastError } from '../../../state/application/hooks'
import { fetchBillsUserDataAsync } from '../../../state/bills'
import { useAppDispatch } from '../../../state/hooks'

// Hooks
import useGetWidoTokenAllowance from 'state/zap/providers/wido/useGetWidoTokenAllowance'
import { ZapVersion } from '@ape.swap/apeswap-lists'

const BillActions: React.FC<BillActionsProps> = ({
  bill,
  zap,
  currencyB,
  handleBuy,
  billValue,
  zapRouteState,
  value,
  purchaseLimit,
  balance,
  pendingTrx,
  errorMessage,
  isWidoSupported,
  widoQuote,
  zapVersion,
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
}) => {
  const { lpToken, contractAddress } = bill
  const [slippage] = useUserZapSlippageTolerance()
  const [approval, approveCallback] = useApproveCallbackFromZap(zap, slippage)
  const { chainId, account } = useWeb3React()

  const showApproveZapFlow = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING

  const toastError = useToastError()
  const dispatch = useAppDispatch()

  const {
    requiresApproval: requiresApprovalWido,
    approveWidoSpender,
    isApproveWidoSpenderLoading,
  } = useGetWidoTokenAllowance({
    inputTokenAddress,
    inputTokenDecimals,
    toTokenAddress,
    zapVersion,
  })

  const { onApprove } = useApproveBill(
    lpToken?.address?.[chainId as SupportedChainId] ?? '',
    contractAddress[chainId as SupportedChainId] ?? '',
  )

  const showApproveLP = getBNWithDecimals(
    bill?.userData?.allowance,
    (bill?.lpToken?.decimals?.[chainId as SupportedChainId] as number) ?? 18,
  )?.lt(value)

  const [pendingApprove, setPendingApprove] = useState(false)
  const { t } = useTranslation()

  const handleLPApprove = async () => {
    setPendingApprove(true)
    await onApprove()
      .then(() => {
        dispatch(fetchBillsUserDataAsync(chainId as SupportedChainId, account as string))
      })
      .catch((e) => {
        console.error(e)
        toastError(e)
      })
      .finally(() => {
        setPendingApprove(false)
      })
  }

  const getBillActionButton = () => {
    switch (true) {
      case isWidoSupported && requiresApprovalWido && zapVersion === ZapVersion.Wido:
        return (
          <Button
            onClick={() => approveWidoSpender()}
            disabled={isApproveWidoSpenderLoading}
            load={isApproveWidoSpenderLoading}
            fullWidth
          >
            {isApproveWidoSpenderLoading ? t('Enabling') : t('Enable')}
          </Button>
        )
      case currencyB && showApproveZapFlow && zapVersion === ZapVersion.ZapV1:
        return (
          <Button
            onClick={approveCallback}
            disabled={approval !== ApprovalState.NOT_APPROVED}
            load={approval === ApprovalState.PENDING}
            fullWidth
          >
            {approval === ApprovalState.PENDING
              ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
              : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
          </Button>
        )
      case currencyB && showApproveLP && zapVersion === ZapVersion.ZapV1:
        return (
          <Button onClick={handleLPApprove} load={pendingApprove} disabled={pendingApprove} fullWidth>
            {t('Enable')}
          </Button>
        )
      default:
        return (
          <BuyButton
            onClick={handleBuy}
            load={pendingTrx || zapRouteState === TradeState.LOADING}
            fullWidth
            disabled={
              billValue === 'NaN' ||
              parseFloat(billValue) < 0.01 ||
              parseFloat(billValue) > parseFloat(purchaseLimit) ||
              parseFloat(balance) < parseFloat(value) ||
              pendingApprove ||
              pendingTrx ||
              !!errorMessage ||
              zapRouteState === TradeState.LOADING ||
              (!widoQuote && isWidoSupported)
            }
          >
            {errorMessage && !pendingTrx ? errorMessage : t('Buy')}
          </BuyButton>
        )
    }
  }

  return getBillActionButton()
}

export default React.memo(BillActions)

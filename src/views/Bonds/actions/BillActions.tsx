import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../hooks/useApproveBill'
import { BillActionsProps } from './types'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BuyButton } from './styles'
import { Button } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import { TradeState } from 'state/routing/types'
import { getBNWithDecimals } from '../../../utils/getBalanceNumber'
import { useToastError } from '../../../state/application/hooks'
import { fetchBillsUserDataAsync } from '../../../state/bills'
import { useAppDispatch } from '../../../state/hooks'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { checkZapApproval, executeZapApproval } from 'state/zap/thunks'
import { ApprovalState } from 'lib/hooks/useApproval'

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
}) => {
  const { lpToken, contractAddress } = bill
  const toastError = useToastError()
  const dispatch = useAppDispatch()
  const { chainId, account, provider } = useWeb3React()
  // Zap State
  const [slippage] = useUserZapSlippageTolerance()
  const { approvalState: zapApprovalState } = useZapState()
  const { onZapApproval } = useZapActionHandlers()
  const { bestMergedZaps } = useDerivedZapInfo()

  useEffect(() => {
    if (provider) {
      dispatch(checkZapApproval({ provider }))
    }
  }, [dispatch, provider, chainId, account])

  const showApproveZapFlow = zapApprovalState === ApprovalState.NOT_APPROVED || zapApprovalState === ApprovalState.PENDING

  const { onApproveBill } = useApproveBill(
    lpToken?.address?.[chainId as SupportedChainId] ?? '',
    contractAddress[chainId as SupportedChainId] ?? '',
  )

  const showApproveLP = getBNWithDecimals(bill?.userData?.allowance)?.lt(value)

  const [pendingApprove, setPendingApprove] = useState(false)
  const { t } = useTranslation()

  const handleBillApprove = async () => {
    setPendingApprove(true)
    await onApproveBill()
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

  return (
    <>
      {!currencyB && showApproveZapFlow ? (
        <Button
          onClick={onZapApproval}
          disabled={zapApprovalState !== ApprovalState.NOT_APPROVED}
          load={zapApprovalState === ApprovalState.PENDING}
          fullWidth
        >
          {zapApprovalState === ApprovalState.PENDING
            ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
            : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
        </Button>
      ) : currencyB && showApproveLP ? (
        <Button onClick={handleBillApprove} load={pendingApprove} disabled={pendingApprove} fullWidth>
          {t('Enable')}
        </Button>
      ) : (
        <BuyButton
          onClick={handleBuy}
          load={pendingTrx || zapRouteState === TradeState.LOADING}
          disabled={
            billValue === 'NaN' ||
            parseFloat(billValue) < 0.01 ||
            parseFloat(billValue) > parseFloat(purchaseLimit) ||
            parseFloat(balance) < parseFloat(value) ||
            pendingApprove ||
            pendingTrx ||
            !!errorMessage ||
            zapRouteState === TradeState.LOADING
            // TODO: Only show when approved?
            // zapApprovalState !== ApprovalState.APPROVED
          }
        >
          {errorMessage && !pendingTrx ? errorMessage : t('Buy')}
        </BuyButton>
      )}
    </>
  )
}

export default React.memo(BillActions)

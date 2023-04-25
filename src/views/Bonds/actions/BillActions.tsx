import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../hooks/useApproveBill'
import { ApprovalState, useApproveCallback, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import { BillActionsProps } from './types'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BuyButton } from './styles'
import { Button } from 'components/uikit'
import { CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import JSBI from 'jsbi'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import { ethers } from 'ethers'

const BillActions: React.FC<BillActionsProps> = ({
  bill,
  zap,
  currencyB,
  handleBuy,
  billValue,
  value,
  purchaseLimit,
  balance,
  pendingTrx,
  errorMessage,
}) => {
  const { lpToken, contractAddress, index } = bill
  const [slippage] = useUserZapSlippageTolerance()
  const [approval, approveCallback] = useApproveCallbackFromZap(zap, slippage)
  const showApproveZapFlow = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING

  const { chainId, account } = useWeb3React()
  const { onApprove } = useApproveBill(
    lpToken?.address?.[chainId as SupportedChainId] ?? '',
    contractAddress[chainId as SupportedChainId] ?? '',
  )

  const showApproveBillFlow = !new BigNumber(bill?.userData?.allowance ?? '0').gt(0)

  const [pendingApprove, setPendingApprove] = useState(false)
  // const { toastSuccess, toastError } = useAddPopup()
  const { t } = useTranslation()

  const handleApprove = async () => {
    setPendingApprove(true)
    await onApprove()
      .then((resp) => {
        const trxHash = resp?.transactionHash
        // toastSuccess(t('Approve Successful'), {
        //   text: t('View Transaction'),
        //   url: getEtherscanLink(trxHash, 'transaction', chainId),
        // })
      })
      .catch((e) => {
        console.error(e)
        // toastError(e?.data?.message || t('Error: Please try again.'))
        setPendingApprove(false)
      })
    setPendingApprove(false)
  }

  return (
    <>
      {!currencyB && showApproveZapFlow ? (
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
      ) : currencyB && showApproveBillFlow ? (
        <Button onClick={onApprove} load={pendingApprove} disabled={pendingApprove} fullWidth>
          {t('Enable')}
        </Button>
      ) : (
        <BuyButton
          onClick={handleBuy}
          load={pendingTrx}
          disabled={
            billValue === 'NaN' ||
            parseFloat(billValue) < 0.01 ||
            parseFloat(billValue) > parseFloat(purchaseLimit) ||
            parseFloat(balance) < parseFloat(value) ||
            pendingApprove ||
            pendingTrx ||
            !!errorMessage
          }
        >
          {errorMessage && !pendingTrx ? errorMessage : t('Buy')}
        </BuyButton>
      )}
    </>
  )
}

export default React.memo(BillActions)

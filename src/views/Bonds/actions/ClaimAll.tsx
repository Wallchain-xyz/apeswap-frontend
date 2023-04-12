import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { useTranslation } from 'contexts/Localization'
import { Bills } from '../types'
import { useWeb3React } from '@web3-react/core'
import useClaimBill from '../hooks/useClaimAll'
import { StyledButton } from '../components/styles'
import { useAppDispatch } from 'state/hooks'
import { useAddPopup } from 'state/application/hooks'

const ClaimAll: React.FC<{
  userOwnedBills: any
  ownedBillsAmount: number
  buttonSize?: string
}> = ({ userOwnedBills, ownedBillsAmount, buttonSize }) => {
  const { onClaimBill } = useClaimBill(userOwnedBills)
  const { chainId, account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  // const { toastSuccess, toastError } = useAddPopup()
  const { t } = useTranslation()

  // TODO: Add toast back
  const handleClaim = async () => {
    if (!chainId || !account) return
    setPendingTrx(true)
    await onClaimBill()
      .then((resp) => {
        resp.map(
          (trx) => <></>,
          // toastSuccess(t('Claim Successful'), {
          //   text: t('View Transaction'),
          //   url: getEtherscanLink(trx?.hash ?? '', 'transaction', chainId),
          // }),
        )
      })
      .catch((e) => {
        console.error(e)
        // toastError(e?.data?.message || t('Error: Please try again.'))
        setPendingTrx(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <StyledButton
      onClick={handleClaim}
      load={pendingTrx}
      disabled={pendingTrx || ownedBillsAmount === 0}
      buttonSize={buttonSize}
      sx={{ height: '36px', lineHeight: '12px' }}
    >
      {t('Claim All')} ({ownedBillsAmount})
    </StyledButton>
  )
}

export default React.memo(ClaimAll)

import React, { useState } from 'react'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { useTranslation } from 'contexts/Localization'
import { ClaimProps } from './types'
import useClaimBill from '../hooks/useClaimBill'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { ClaimButton } from '../components/styles'
import { Flex } from 'components/uikit'
import { Button } from '../../../components/uikit'

const Claim: React.FC<ClaimProps> = ({ billAddress, billIds, buttonSize, pendingRewards, margin }) => {
  const { onClaimBill, billType } = useClaimBill(billAddress, billIds)
  const { chainId, account } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  // const { toastSuccess } = useToast()
  const { t } = useTranslation()

  // TODO:
  const handleClaim = async () => {
    if (!chainId || !account) return
    setPendingTrx(true)
    await onClaimBill()
      .then((resp) => {
        const trxHash = resp.hash
        // toastSuccess(t('Claim Successful'), {
        //   text: t('View Transaction'),
        //   url: getEtherscanLink(trxHash, 'transaction', chainId),
        // })
        // if (bananaBill) displayGHCircular()
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }
  return (
    <Flex sx={{ width: '100%' }}>
      <Button
        onClick={handleClaim}
        load={pendingTrx}
        disabled={pendingTrx || parseFloat(pendingRewards) === 0}
        margin={margin}
        sx={{ lineHeight: '20px', minWidth: '110px' }}
      >
        {t('CLAIM')}
      </Button>
    </Flex>
  )
}

export default React.memo(Claim)

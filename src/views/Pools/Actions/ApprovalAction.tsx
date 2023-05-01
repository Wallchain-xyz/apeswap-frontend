import React, { useState } from 'react'
import { updateUserAllowance } from 'state/pools'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import { useSousApprove } from '../hooks/useApprove'
import { Button, Skeleton } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { poolStyles } from '../components/styles'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const { chainId, account } = useWeb3React()
  const stakingTokenContract = useTokenContract(stakingTokenContractAddress)
  const [pendingTrx, setPendingTrx] = useState(false)
  const dispatch = useAppDispatch()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  // const { toastSuccess } = useToast()
  const { t } = useTranslation()

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          sx={poolStyles.styledBtn}
          className="noClick"
          disabled={pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await onApprove()
              .then((resp: any) => {
                const trxHash = resp.transactionHash
                // toastSuccess(t('Approve Successful'), {
                //   text: t('View Transaction'),
                //   url: getEtherscanLink(trxHash, 'transaction', chainId),
                // })
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            dispatch(updateUserAllowance(chainId as SupportedChainId, sousId, account ?? ''))

            setPendingTrx(false)
          }}
          load={pendingTrx}
        >
          {t('ENABLE')}
        </Button>
      )}
    </>
  )
}

export default React.memo(ApprovalAction)

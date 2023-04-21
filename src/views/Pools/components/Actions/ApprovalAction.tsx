import React, { useState } from 'react'
import { updateUserAllowance } from 'state/pools'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { poolStyles } from '../styles'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import { useAppDispatch } from 'state/hooks'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { CurrencyAmount, SupportedChainId, Token } from '@ape.swap/sdk-core'
import JSBI from 'jsbi'
import { Button, Skeleton } from 'components/uikit'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  stakingTokenBalance: string
  stakeTokenDecimals: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({
  stakingTokenContractAddress,
  stakingTokenBalance,
  stakeTokenDecimals,
  sousId,
  isLoading = false,
}) => {
  const { chainId, account } = useWeb3React()
  const stakingTokenContract = useTokenContract(stakingTokenContractAddress)
  const [pendingTrx, setPendingTrx] = useState(false)
  const dispatch = useAppDispatch()
  const token = new Token(chainId ?? SupportedChainId.BSC, stakingTokenContractAddress ?? '', stakeTokenDecimals)
  const currencyAmount = CurrencyAmount.fromRawAmount(token, JSBI.BigInt(stakingTokenBalance))
  const [poolApproval, approvePoolCallback] = useApproveCallback(
    currencyAmount,
    chainId ? contractAddress?.[chainId as SupportedChainId] : undefined,
  )
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
            if (!chainId || !account) return
            setPendingTrx(true)
            await approvePoolCallback()
              .then((resp) => {
                const trxHash = resp
                // toastSuccess(t('Approve Successful'), {
                //   text: t('View Transaction'),
                //   url: getEtherscanLink(trxHash, 'transaction', chainId),
                // })
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            dispatch(updateUserAllowance(chainId, sousId, account))

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

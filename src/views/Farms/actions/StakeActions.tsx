import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import DepositModal from '../components/Modals/DepositModal'
import WithdrawModal from 'components/WithdrawModal'
import { styles } from '../components/styles'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import useStake from '../hooks/useStake'
import useUnstake from '../hooks/useUnstake'
import { FarmTypes } from 'state/farms/types'
import { Button, Flex, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import ConnectWalletButton from 'components/ConnectWallet'
import { useApprove } from '../hooks/useApprove'
import { useTokenContract } from 'hooks/useContract'

interface StakeActionsProps {
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  pid: number
  allowance: string
  stakeLpAddress: string
  farmTypes: FarmTypes
  contractAddress?: string
}

const StakeAction: React.FC<StakeActionsProps> = ({
  stakingTokenBalance,
  stakedBalance,
  lpValueUsd,
  pid,
  allowance,
  stakeLpAddress,
  farmTypes,
  contractAddress,
}) => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const [depositAmount, setDepositAmount] = useState<string>()
  // const { toastSuccess } = useToast()
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)
  const { t } = useTranslation()

  const onStake = useStake(farmTypes, pid, lpValueUsd)
  const onUnstake = useUnstake(farmTypes, pid, lpValueUsd)
  const lpToken = useTokenContract(stakeLpAddress)
  const { onApprove } = useApprove(lpToken, farmTypes, contractAddress)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      onConfirm={async (val: string) => {
        setDepositAmount(val)
        setPendingDepositTrx(true)
        await onStake(val)
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Deposit Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId as SupportedChainId),
            // })
          })
          .catch((e) => {
            console.error(e)
            setPendingDepositTrx(false)
          })
        // dispatch(fetchFarmV2UserDataAsync(chainId, account))
        setPendingDepositTrx(false)
      }}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val: string) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Withdraw Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId),
            // })
            // if (trxHash) displayGHCircular()
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        // dispatch(fetchFarmV2UserDataAsync(chainId, account))
        setPendingWithdrawTrx(false)
      }}
      title={'Unstake LP tokens'}
    />,
  )

  const renderStakingButtons = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (parseFloat(allowance) <= parseFloat(stakingTokenBalance ?? '0')) {
      return <Button onClick={onApprove}> Approve </Button>
    }
    if (firstStake) {
      return (
        <Button onClick={onPresentDeposit} load={pendingDepositTrx} disabled={pendingDepositTrx} sx={styles.styledBtn}>
          <Text sx={{ lineHeight: '20px' }} color="primaryBright">
            {t('DEPOSIT')}
          </Text>
        </Button>
      )
    }
    return (
      <Flex sx={styles.stakeActions}>
        <Button
          onClick={onPresentWithdraw}
          load={pendingWithdrawTrx}
          disabled={pendingWithdrawTrx}
          mr="10px"
          size="sm"
          sx={styles.smallBtn}
        >
          <Text size={24} sx={{ lineHeight: '30px' }} color="primaryBright">
            {' '}
            -{' '}
          </Text>
        </Button>
        <Button
          onClick={onPresentDeposit}
          load={pendingDepositTrx}
          disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
          size="sm"
          sx={styles.smallBtn}
        >
          <Text size={24} sx={{ lineHeight: '30px' }} color="primaryBright">
            {' '}
            +{' '}
          </Text>
        </Button>
      </Flex>
    )
  }

  return renderStakingButtons()
}

export default React.memo(StakeAction)

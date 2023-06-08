/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import ApprovalAction from './ApprovalAction'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { getEtherscanLink } from 'utils'
import DepositModal from '../Modals/DepositModal'
import { fetchPoolsUserDataAsync } from 'state/pools'
import WithdrawModal from 'components/WithdrawModal'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useModal from 'hooks/useModal'
import ListViewContent from 'components/ListView/ListViewContent'
import { Button, Flex, Text } from 'components/uikit'
import ConnectWalletButton from 'components/ConnectWallet'
import { poolStyles } from '../components/styles'
import { useSousStake } from '../hooks/useStake'
import { useSousUnstake } from '../hooks/useUnstake'

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedTokenSymbol: string
  stakedBalance: string
  stakeTokenValueUsd: number
  stakeTokenAddress: string
  sousId: number
  earnTokenSymbol: string
}

const Actions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedTokenSymbol,
  stakedBalance,
  stakeTokenValueUsd,
  stakeTokenAddress,
  sousId,
  earnTokenSymbol,
}) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * stakeTokenValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)

  // const { toastSuccess } = useToast()
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)

  const { onStake } = useSousStake(sousId, stakeTokenValueUsd)
  const { onUnstake } = useSousUnstake(sousId)
  const { t } = useTranslation()
  const bananaToken = useCurrency(BANANA_ADDRESSES[chainId as SupportedChainId])

  const harvestBanana = earnTokenSymbol === bananaToken?.symbol

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      tokenName={stakedTokenSymbol}
      onDismiss={() => null}
      onConfirm={async (val) => {
        setPendingDepositTrx(true)
        await onStake(val)
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Deposit Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId as SupportedChainId),
            // })
          })
          .catch((e: any) => {
            console.error(e)
            setPendingDepositTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingDepositTrx(false)
      }}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      title={`${t('Unstake')} ${stakedTokenSymbol}`}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Withdraw Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId as SupportedChainId),
            // })
          })
          .catch((e: any) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
        setPendingWithdrawTrx(false)
      }}
    />,
  )

  return (
    <Flex sx={poolStyles.actionContainer}>
      <ListViewContent
        title={t('Staked')}
        value={`${!account ? '0.000' : rawStakedBalance.toFixed(2)}`}
        value2={!account ? '$0.00' : userStakedBalanceUsd}
        value2Secondary
        value2Direction="column"
        style={{ flexDirection: 'column' }}
      />
      <Flex sx={poolStyles.depositContainer}>
        {!account ? (
          <ConnectWalletButton />
        ) : !new BigNumber(allowance)?.gt(0) ? (
          <ApprovalAction stakingTokenContractAddress={stakeTokenAddress} sousId={sousId} />
        ) : firstStake ? (
          <Button
            onClick={onPresentDeposit}
            load={pendingDepositTrx}
            disabled={pendingDepositTrx}
            sx={poolStyles.styledBtn}
          >
            {t('DEPOSIT')}
          </Button>
        ) : (
          <Flex sx={poolStyles.stakeActions}>
            <Button
              onClick={onPresentWithdraw}
              load={pendingWithdrawTrx}
              disabled={pendingWithdrawTrx}
              sx={poolStyles.smallBtn}
              mr="10px"
              size="sm"
            >
              {!pendingWithdrawTrx && <>-</>}
            </Button>
            <Button
              onClick={onPresentDeposit}
              load={pendingDepositTrx}
              disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0)}
              sx={poolStyles.smallBtn}
              size="sm"
            >
              {!pendingDepositTrx && <>+</>}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(Actions)

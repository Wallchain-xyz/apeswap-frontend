import React, { useState } from 'react'
import { getEtherscanLink } from 'utils'
import { fetchPoolsUserDataAsync, updateUserPendingReward } from 'state/pools'
import { useCurrency } from 'hooks/Tokens'
import { useTranslation } from 'contexts/Localization'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { useSousHarvest } from '../hooks/useHarvest'
import { useSousStake } from '../hooks/useStake'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ListViewContent from 'components/ListView/ListViewContent'
import { Button, Flex } from 'components/uikit'
import { poolStyles } from '../components/styles'

interface HarvestActionsProps {
  sousId: number
  userEarnings: number
  earnTokenSymbol: string
  earnTokenValueUsd: number
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({
  sousId,
  earnTokenSymbol,
  disabled,
  userEarnings,
  earnTokenValueUsd,
}) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const [pendingApeHarderTrx, setPendingApeHarderTrx] = useState(false)
  const { onHarvest } = useSousHarvest(sousId)
  const { onStake } = useSousStake(sousId, earnTokenValueUsd)
  const bananaToken = useCurrency(BANANA_ADDRESSES[chainId as SupportedChainId])
  const isBananaBanana = sousId === 0

  // const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const harvestBanana = earnTokenSymbol === bananaToken?.symbol

  const userTokenBalanceUsd = (userEarnings * earnTokenValueUsd).toFixed(2)

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      ?.then((resp) => {
        const trxHash = resp?.transactionHash
        // toastSuccess(t('Harvest Successful'), {
        //   text: t('View Transaction'),
        //   url: getEtherscanLink(trxHash, 'transaction', chainId as SupportedChainId),
        // })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(updateUserPendingReward(chainId as SupportedChainId, sousId, account ?? ''))
    setPendingTrx(false)
  }

  const handleApeHarder = async () => {
    setPendingApeHarderTrx(true)
    await onStake(userEarnings.toString())
      .then((resp) => {
        const trxHash = resp?.transactionHash
        // toastSuccess(t('Ape Harder Successful'), {
        //   text: t('View Transaction'),
        //   url: getEtherscanLink(trxHash, 'transaction', chainId),
        // })
      })
      .catch((e) => {
        console.error(e)
        setPendingApeHarderTrx(false)
      })
    dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
    setPendingApeHarderTrx(false)
  }

  return (
    <Flex sx={{ ...poolStyles.actionContainer, minWidth: isBananaBanana && ['', '', '380px'] }}>
      <ListViewContent
        title={t('Earned')}
        value={userEarnings?.toFixed(4)}
        valueIcon={
          <Flex sx={{ height: '16px', alignItems: 'center', mr: '3px' }}>
            <ServiceTokenDisplay token1={earnTokenSymbol} size={13} />
          </Flex>
        }
        value2={`$${userTokenBalanceUsd}`}
        value2Secondary
        value2Direction="column"
        style={poolStyles.columnView}
      />
      <Button
        disabled={disabled || pendingTrx}
        onClick={handleHarvest}
        load={pendingTrx}
        sx={isBananaBanana ? poolStyles.fixedSizedBtn : poolStyles.styledBtn}
      >
        {t('HARVEST')}
      </Button>
      {isBananaBanana && (
        <Flex sx={{ width: ['100%', '100%', 'unset'], margin: ['15px 0 0 0', '15px 0 0 0', '0 10px'] }}>
          <Button
            size="md"
            disabled={disabled || pendingApeHarderTrx}
            onClick={handleApeHarder}
            load={pendingApeHarderTrx}
            sx={poolStyles.apeHarder}
          >
            {t('APE HARDER')}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(HarvestAction)

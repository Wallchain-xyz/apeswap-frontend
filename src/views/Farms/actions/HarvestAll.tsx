import React, { useState } from 'react'
// import { useHarvest } from 'hooks/useHarvest'
import { useAppDispatch } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { styles } from 'views/Farms/components/styles'
import { useRouter } from 'next/router'
import { Button, Flex, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import ListViewContent from 'components/ListView/ListViewContent'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useHarvest from '../hooks/useHarvest'
import { FarmTypes } from 'state/farms/types'
import useHarvestAll from '../hooks/useHarvestAll'

interface HarvestActionsProps {
  pids: number[]
  disabled: boolean
  farmType: FarmTypes[]
  contractAddress: string[]
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pids, disabled, farmType, contractAddress }) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const handleHarvest = useHarvestAll(farmType, pids, contractAddress)
  //   const { onHarvest } = useHarvest(pid, v2Flag)
  //   const { toastSuccess } = useToast()
  const { t } = useTranslation()
  //   const { push } = useRouter()

  //   const { showGeneralHarvestModal } = useIsModalShown()
  //   const displayGHCircular = () => showGeneralHarvestModal && showCircular(chainId, history, '?modal=circular-gh')

  return (
    <Button
      className="noClick"
      disabled={disabled || pendingTrx}
      onClick={async () => {
        setPendingTrx(true)
        await handleHarvest()
          .then((resp: any) => {
            const trxHash = resp.transactionHash
            // toastSuccess(t('Harvest Successful'), {
            //   text: t('View Transaction'),
            //   url: getEtherscanLink(trxHash, 'transaction', chainId as SupportedChainId),
            // })
            // if (trxHash) displayGHCircular()
          })
          .catch((e: any) => {
            console.error(e)
            setPendingTrx(false)
          })
        // dispatch(updateFarmV2UserEarnings(chainId, pid, account))
        setPendingTrx(false)
      }}
      load={pendingTrx}
      sx={{ ...styles.harvestAllBtn }}
    >
      <Text sx={{ lineHeight: '15px' }} color='primaryBright'>
        {t('HARVEST ALL')} ({pids.length})
      </Text>
    </Button>
  )
}

export default React.memo(HarvestAction)

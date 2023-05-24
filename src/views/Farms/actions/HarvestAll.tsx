import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles } from 'views/Farms/components/styles'
import { Button, Text } from 'components/uikit'
import { FarmTypes } from 'state/farms/types'
import useHarvestAll from '../hooks/useHarvestAll'

interface HarvestActionsProps {
  pids: number[]
  disabled: boolean
  farmType: FarmTypes[]
  contractAddress: string[]
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pids, disabled, farmType, contractAddress }) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const handleHarvest = useHarvestAll(farmType, pids, contractAddress)

  const { t } = useTranslation()

  return (
    <Button
      disabled={disabled || pendingTrx}
      onClick={async () => {
        setPendingTrx(true)
        await handleHarvest()
          .then(() => {})
          .catch((e: any) => {
            console.error(e)
            setPendingTrx(false)
          })
        setPendingTrx(false)
      }}
      load={pendingTrx}
      sx={styles.harvestAllBtn}
    >
      <Text sx={{ lineHeight: '15px', color: disabled ? 'textDisabled' : 'primaryBright' }}>
        {t('HARVEST ALL')} ({pids.length})
      </Text>
    </Button>
  )
}

export default React.memo(HarvestAction)

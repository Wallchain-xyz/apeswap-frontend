import React from 'react'
import BigNumber from 'bignumber.js'
import { styles } from '../components/styles'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { Flex } from 'components/uikit'
import ListViewContent from 'components/ListView/ListViewContent'
import StakeActions from './StakeActions'
import { FarmTypes } from 'state/farms/types'

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  stakeLpAddress: string
  pid: number
  farmTypes: FarmTypes
}

const CardActions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedBalance,
  lpValueUsd,
  stakeLpAddress,
  pid,
  farmTypes,
}) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const { t } = useTranslation()
  const userStakedBalanceUsd = `$${(getBalanceNumber(new BigNumber(stakedBalance || 0)) * lpValueUsd).toFixed(2)}`

  return (
    <Flex sx={styles.actionContainer}>
      <ListViewContent
        title={t('Staked')}
        value={`${rawStakedBalance ? rawStakedBalance.toFixed(6) : '0.000'} LP`}
        value2={userStakedBalanceUsd}
        value2Secondary
        value2Direction="column"
        style={styles.columnView}
      />
      <Flex sx={styles.depositContainer}>
        <StakeActions
          stakedBalance={stakedBalance}
          stakingTokenBalance={stakingTokenBalance}
          lpValueUsd={lpValueUsd}
          pid={pid}
          allowance={allowance}
          stakeLpAddress={stakeLpAddress}
          farmTypes={farmTypes}
        />
      </Flex>
    </Flex>
  )
}

export default CardActions

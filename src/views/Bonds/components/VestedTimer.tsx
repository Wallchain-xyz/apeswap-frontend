import { useTranslation } from 'contexts/Localization'
import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import { styles } from './UserBillsView/components/styles'
import { Skeleton, Text } from 'components/uikit'
import { StyledHeading } from '../styles'
import ListViewContent from 'components/ListView/ListViewContent'
import useCurrentTime from 'hooks/useTimer'

const VestedTimer: React.FC<{
  lastBlockTimestamp: string
  vesting: string
  userModalFlag?: boolean
  transferModalFlag?: boolean
  mobileFlag?: boolean
}> = ({ lastBlockTimestamp, vesting, userModalFlag, transferModalFlag, mobileFlag }) => {
  const { t } = useTranslation()
  const currentTime = useCurrentTime() / 1000
  const vestingTime = getTimePeriods(parseInt(lastBlockTimestamp) + parseInt(vesting) - currentTime, true)

  return transferModalFlag ? (
    <Text bold>
      {vestingTime.days}d, {vestingTime.hours}h, {vestingTime.minutes}m
    </Text>
  ) : userModalFlag ? (
    <StyledHeading bold>
      {vestingTime ? (
        `${vestingTime.days}d, ${vestingTime.hours}h, ${vestingTime.minutes}m`
      ) : (
        <Skeleton width="150px" height="32.5px" animation="waves" />
      )}
    </StyledHeading>
  ) : mobileFlag ? (
    <ListViewContent
      title={'Fully Vested'}
      value={`${vestingTime.days}d, ${vestingTime.hours}h, ${vestingTime.minutes}m`}
      toolTip={`This is the time remaining until all tokens from the bill are available to claim.`}
      toolTipPlacement={'bottomLeft'}
      toolTipTransform={'translate(34%, 0%)'}
      style={{ width: '100%', justifyContent: 'space-between' }}
    />
  ) : (
    <ListViewContent
      title={t('Fully Vested')}
      value={`${vestingTime.days}d, ${vestingTime.hours}h, ${vestingTime.minutes}m`}
      style={styles.billInfo}
      toolTip={t('This is the time remaining until all tokens from the bill are available to claim.')}
      toolTipPlacement={'bottomLeft'}
      toolTipTransform={'translate(34%, -4%)'}
    />
  )
}

export default React.memo(VestedTimer)

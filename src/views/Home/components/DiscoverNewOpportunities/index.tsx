import { useState } from 'react'
import { Box } from 'theme-ui'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Components
import { Text } from 'components/uikit'
import Tabs from './Tabs'
import Lists from './Lists'

// Constants
import { TabNavOptions } from './types'

const TABS: TabNavOptions[] = Object.values(TabNavOptions)

const DiscoverNewOpportunities = () => {
  const [activeTab, setActiveTab] = useState<TabNavOptions>(TabNavOptions.BONDS)
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        maxWidth: '1412px',
        width: '95vw',
        alignSelf: 'center',
      }}
    >
      <Box sx={{ mb: ['10px', '10px', '35px'] }}>
        <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Discover New Opportunities')}</Text>
      </Box>
      <Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Lists activeTab={activeTab} />
    </Box>
  )
}

export default DiscoverNewOpportunities

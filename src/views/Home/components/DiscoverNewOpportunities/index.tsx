import { useState } from 'react'
import { Box } from 'theme-ui'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Components
import { Flex, Text } from 'components/uikit'
import Tabs from './Tabs'

const TABS = ['Bonds', 'Farms', 'Tokens']

const DiscoverNewOpportunities = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0])
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
    </Box>
  )
}

export default DiscoverNewOpportunities

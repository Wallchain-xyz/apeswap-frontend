import { Box, Theme } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Types
import { TabNavOptions } from '../types'

interface TabsProps {
  tabs: TabNavOptions[]
  activeTab: TabNavOptions
  setActiveTab: (newActiveTab: TabNavOptions) => void
}

// TODO: Animate the border-bottom
const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ gap: ['20px', '20px', '25px'], fontSize: ['12px', '12px', '16px'] }}>
      {tabs.map((tab) => {
        const isActive: boolean = activeTab === tab
        return (
          <Flex
            key={tab}
            sx={{
              borderBottom: (theme: Theme) => (isActive ? `2px solid ${theme.colors?.text}` : ''),
              pb: ['3px', '3px', '7px'],
              cursor: 'pointer',
            }}
            onClick={() => setActiveTab(tab)}
          >
            <Text sx={{ ':hover': { opacity: 0.6 } }}>{t(tab)}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Tabs

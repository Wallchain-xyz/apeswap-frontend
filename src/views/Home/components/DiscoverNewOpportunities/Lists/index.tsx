// Contexts
import SwiperProvider from 'contexts/SwiperProvider'

// Components
import BondsList from './BondsList'

// Types
import { TabNavOptions } from '../types'

interface ListsProps {
  activeTab: TabNavOptions
}

const Lists = ({ activeTab }: ListsProps) => {
  const activeList = {
    [TabNavOptions.BONDS]: <BondsList />,
    [TabNavOptions.FARMS]: <div>Farms</div>,
    [TabNavOptions.TOKENS]: <div>Tokens</div>,
  }

  return <SwiperProvider>{activeList[activeTab]}</SwiperProvider>
}

export default Lists

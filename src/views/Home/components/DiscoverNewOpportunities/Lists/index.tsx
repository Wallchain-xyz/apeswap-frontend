// Contexts
import SwiperProvider from 'contexts/SwiperProvider'

// Components
import BondsList from './BondsList'
import FarmsList from './FarmsList'

// Types
import { TabNavOptions } from '../types'
import { HomepageDTO } from 'utils/types/homepage'
interface ListsProps {
  activeTab: TabNavOptions
  stats: HomepageDTO | undefined
}

const Lists = ({ activeTab, stats }: ListsProps) => {
  const { bonds = [], farms = [] } = stats ?? {}
  const activeList = {
    [TabNavOptions.BONDS]: <BondsList bonds={bonds} />,
    [TabNavOptions.FARMS]: <FarmsList farms={farms} />,
    [TabNavOptions.TOKENS]: <div>Tokens</div>,
  }

  return <SwiperProvider>{activeList[activeTab]}</SwiperProvider>
}

export default Lists

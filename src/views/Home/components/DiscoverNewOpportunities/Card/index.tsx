import { Badge } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'
import OpportunityBadge from '../OpportunityBadge'

// Types
// import { BondDTO } from 'utils/types/homepage'
import { mockedParsedBond } from 'views/Home/components/DiscoverNewOpportunities/Lists/BondsList'

interface CardProps {
  item: mockedParsedBond
}

const Card = ({ item }: CardProps) => {
  return (
    <Flex sx={{ alignItems: 'center', bg: 'magenta', px: '20px', borderRadius: '10px', height: '54px' }}>
      <Flex sx={{ gap: '20px' }}>
        <Text sx={{ fontSize: ['12px', '12px', '16px'] }}>{item.payoutTokenName}</Text>
        {item.isFeatured && <OpportunityBadge type="featured" />}
        {item.isNew && <OpportunityBadge type="new" />}
      </Flex>
    </Flex>
  )
}

export default Card

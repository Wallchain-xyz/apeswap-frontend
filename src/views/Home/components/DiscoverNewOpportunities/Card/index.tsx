import { Box } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'
import OpportunityBadge from '../OpportunityBadge'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import SmallChainIcon from 'components/SmallChainIcon'

// Types
// import { BondDTO } from 'utils/types/homepage'
import { mockedParsedBond } from 'views/Home/components/DiscoverNewOpportunities/Lists/BondsList'

interface CardProps {
  item: mockedParsedBond
}

const isWithin48Hours = (timestamp: number): boolean => {
  const currentTimestamp = Date.now()
  const differenceInMilliseconds = currentTimestamp - timestamp
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60)

  return differenceInHours < 48
}

const Card = ({ item }: CardProps) => {
  const { payoutTokenName, chainId = '56' } = item
  const isNew = isWithin48Hours(Number(item.launchDate))
  return (
    <Flex sx={{ alignItems: 'center', bg: 'white2', px: '20px', borderRadius: '10px', height: '54px' }}>
      <Flex sx={{ gap: ['10px', '10px', '20px'], alignItems: 'center' }}>
        <Flex sx={{ position: 'relative' }}>
          <ServiceTokenDisplay token1={payoutTokenName} />
          <Box sx={{ position: 'absolute', zIndex: 10000, right: 0, top: '-6px' }}>
            <SmallChainIcon chain={chainId} height={10} width={10} />
          </Box>
        </Flex>
        <Text sx={{ fontSize: ['12px', '12px', '16px'] }}>{payoutTokenName}</Text>
        {item.isFeatured && <OpportunityBadge type="featured" />}
        {isNew && <OpportunityBadge type="new" />}
      </Flex>
    </Flex>
  )
}

export default Card

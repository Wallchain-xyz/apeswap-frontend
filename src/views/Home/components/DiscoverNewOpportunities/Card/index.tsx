import Image from 'next/image'
import { Box } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'
import OpportunityBadge from '../OpportunityBadge'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import SmallChainIcon from 'components/SmallChainIcon'

// Hooks
import { useTranslation } from 'contexts/Localization'

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
  const { t } = useTranslation()
  const { payoutTokenName, discount = 0, chainId = '56' } = item
  const isNew = isWithin48Hours(Number(item.launchDate))
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        bg: 'white2',
        px: '20px',
        py: '11px',
        borderRadius: '10px',
        height: '54px',
        position: 'relative',
      }}
    >
      <Flex
        sx={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          zIndex: '2',
          opacity: '0',
          bg: 'rgba(33, 33, 33, 0.90)',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          left: 0,
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          '&:hover': { opacity: '1', backdropFilter: 'blur(1.5px)' },
        }}
      >
        <Text sx={{ color: 'yellow', fontSize: ['10px', '10px', '12px'] }}>{t('Buy now')}</Text>
        <Image
          src="/images/discover-new-opportunities/caret-right-yellow.svg"
          width={10}
          height={10}
          alt="caret right"
        />
      </Flex>
      <Flex sx={{ gap: ['10px', '10px', '20px'], alignItems: 'center' }}>
        <Flex sx={{ position: 'relative' }}>
          <Box sx={{ display: ['flex', 'flex', 'none'] }}>
            <ServiceTokenDisplay token1={payoutTokenName} size={24} />
          </Box>
          <Box sx={{ display: ['none', 'none', 'flex'] }}>
            <ServiceTokenDisplay token1={payoutTokenName} size={32} />
          </Box>
          <Box sx={{ position: 'absolute', zIndex: 1, right: 0, top: ['-9px', '-9px', '-6px'] }}>
            <SmallChainIcon chain={chainId} height={10} width={10} />
          </Box>
        </Flex>
        <Text sx={{ fontSize: ['12px', '12px', '16px'] }}>{payoutTokenName}</Text>
        {item.isFeatured && <OpportunityBadge type="featured" />}
        {isNew && <OpportunityBadge type="new" />}
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
        <Text sx={{ opacity: '0.6', fontSize: ['10px', '10px', '12px'], fontWeight: 'light' }}>{t('Discount')}</Text>
        <Box
          sx={{ fontSize: ['12px', '12px', '16px'], fontWeight: 'bold', color: discount >= 0 ? 'success' : 'error' }}
        >
          {discount}%
        </Box>
      </Flex>
    </Flex>
  )
}

export default Card

import { Grid } from 'theme-ui'

// Components
import { Flex } from 'components/uikit'
import BondStatsCard from './BondStatsCard'

// Hooks
import useGetHomepageStats from 'hooks/queries/useGetHomepageStats'

// Types
import { BondsStats } from 'utils/types/homepage'
interface ICardsDescription {
  name: BondsStats
  subTitle: string
}

// Constants
const CARDS_DESCRIPTION: ICardsDescription[] = [
  { name: BondsStats.TotalBondsSold, subTitle: 'TOTAL BONDS SOLD' },
  { name: BondsStats.TotalBondedValue, subTitle: 'TOTAL BONDED VALUE' },
  { name: BondsStats.TotalTradeVolume, subTitle: 'TOTAL TRADE VOL' },
  { name: BondsStats.TotalValueLocked, subTitle: 'TOTAL VALUE LOCKED' },
]

const BondsStatsCards = () => {
  const { data: stats, isLoading } = useGetHomepageStats()

  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Grid
        sx={{
          display: ['grid', 'grid', 'flex', 'flex'],
          maxWidth: '1412px',
          mx: '30px',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr', 'inherit', 'inherit'],
          my: ['20px', '20px', '50px'],
        }}
      >
        {CARDS_DESCRIPTION.map(({ name, subTitle }) => (
          <BondStatsCard name={name} amount={stats?.[name] ?? 0} subTitle={subTitle} key={name} isLoading={isLoading} />
        ))}
      </Grid>
    </Flex>
  )
}

export default BondsStatsCards

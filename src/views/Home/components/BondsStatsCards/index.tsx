import { Grid } from 'theme-ui'
import { Flex, Skeleton, Text } from 'components/uikit'
import CountUp from 'react-countup'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import useGetHomepageStats from 'hooks/queries/useGetHomepageStats'

// Utils
import { formatDollar } from 'utils/formatNumbers'

enum CardName {
  TotalBondsSold = 'totalBondsSold',
  TotalBondedValue = 'totalBondedValue',
  TotalTradeVolume = 'totalTradeVolume',
  TotalValueLocked = 'totalValueLocked',
}

interface ICardsDescription {
  name: CardName
  title: number
  subTitle: string
}

// Constants
const CARDS_DESCRIPTION: ICardsDescription[] = [
  { name: CardName.TotalBondsSold, subTitle: 'TOTAL BONDS SOLD', title: 20567 },
  { name: CardName.TotalBondedValue, subTitle: 'TOTAL BONDED VALUE', title: 2345678 },
  { name: CardName.TotalTradeVolume, subTitle: 'TOTAL TRADE VOL', title: 17799308146 },
  { name: CardName.TotalValueLocked, subTitle: 'TOTAL VALUE LOCKED', title: 99308146 },
]

const BondsStatsCards = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { data: stats, isLoading } = useGetHomepageStats()

  const token = stats?.tokens

  console.log({ token })

  const StatsCard = ({ name, title, subTitle }: { name: string; title: number; subTitle: string }) => {
    const formattedAmount = formatDollar({ num: title })
    const lastChar = formattedAmount.slice(formattedAmount.length - 1)
    const withoutFirstAndLastSlice = Number(formattedAmount.slice(1, -1))

    return (
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          mb: '20px',
        }}
      >
        <Text sx={{ fontSize: ['22px', '22px', '30px'], fontWeight: 'bold', mb: ['5px', '5px', '12px'] }}>
          {name !== CardName.TotalBondsSold && '$'}
          {isMobile ? (
            <>
              <CountUp end={withoutFirstAndLastSlice} decimals={2} duration={1} separator="," />
              {name !== CardName.TotalBondsSold && lastChar}
            </>
          ) : (
            <CountUp end={title} decimals={0} duration={3} separator="," />
          )}
        </Text>
        <Text sx={{ fontSize: ['12px', '12px', '14px'], fontWeight: 'light' }}>{t(subTitle)}</Text>
      </Flex>
    )
  }

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
        {CARDS_DESCRIPTION.map(({ name, title, subTitle }) => (
          <StatsCard name={name} title={title} subTitle={subTitle} key={name} />
        ))}
      </Grid>
    </Flex>
  )
}

export default BondsStatsCards

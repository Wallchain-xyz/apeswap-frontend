import CountUp from 'react-countup'
import { Box } from 'theme-ui'

// Components
import { Flex, Skeleton, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'

// Utils
import { formatDollar } from 'utils/formatNumbers'

// Types
import { BondsStats } from 'utils/types/homepage'

const BondStatsCard = ({
  name,
  amount,
  subTitle,
  isLoading,
}: {
  name: string
  amount: number
  subTitle: string
  isLoading: boolean
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const renderCountUp = (): JSX.Element => {
    const isTotalBondsSold = name === BondsStats.TotalBondsSold
    const amountCurrency: string = !isTotalBondsSold ? '$' : ''
    if (isLoading) {
      return (
        <Skeleton
          sx={{ width: ['100%', '100%', '100%'], height: ['22px', '22px', '30px'], mb: ['5px', '5px', '12px'] }}
        />
      )
    } else if (isMobile) {
      const formattedAmount = formatDollar({ num: amount })
      const lastChar = formattedAmount.slice(formattedAmount.length - 1)
      const withoutFirstAndLastSlice = Number(formattedAmount.slice(1, -1))

      return (
        <>
          {amountCurrency}
          <CountUp
            end={isTotalBondsSold ? amount : withoutFirstAndLastSlice}
            decimals={isTotalBondsSold ? 0 : 2}
            duration={1}
            separator=","
          />
          {name !== BondsStats.TotalBondsSold && lastChar}
        </>
      )
    } else {
      return (
        <>
          {amountCurrency}
          <CountUp end={amount} decimals={0} duration={3} separator="," />
        </>
      )
    }
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        mb: '20px',
      }}
    >
      <Flex sx={{ width: ['100%', '80%', '100%'], justifyContent: 'center', display: isLoading ? 'block' : 'flex' }}>
        <Text sx={{ fontSize: ['22px', '22px', '30px'], fontWeight: 'bold', mb: ['5px', '5px', '12px'] }}>
          {renderCountUp()}
        </Text>
      </Flex>
      <Text sx={{ fontSize: ['12px', '12px', '14px'], fontWeight: 'light' }}>{t(subTitle)}</Text>
    </Flex>
  )
}

export default BondStatsCard

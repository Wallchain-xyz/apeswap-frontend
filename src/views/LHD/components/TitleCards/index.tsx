import { Button, Flex, Link, ListTag, Text } from 'components/uikit'
import { useRouter } from 'next/router'
import StatCard from './StatCard'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import useModal from '../../../../hooks/useModal'
import FilterModal from '../SearchBar/FilterModal'

// Hooks
import useGetIndustryStats from 'hooks/queries/useGetIndustryStats'
import useGetHistoricalIndustryStats from 'hooks/queries/useGetHistoricalIndustryStats'

const TitleCards = () => {
  const [onFilterModal] = useModal(<FilterModal openChains={true} />)
  const { push } = useRouter()
  const { t } = useTranslation()
  const { data: industryStats } = useGetIndustryStats()
  const { data: historicalIndustryStats } = useGetHistoricalIndustryStats()

  const { chainsSupported, averageTotalScore, tokensTracked } = industryStats ?? {
    chainsSupported: 0,
    averageTotalScore: 0,
    tokensTracked: 0,
  }

  const { averageTotalScore: historicalAverageTotalScore } = historicalIndustryStats ?? { averageTotalScore: 0 }

  const industryAverageChange =
    Math.round(((historicalAverageTotalScore - averageTotalScore) / historicalAverageTotalScore) * 10000) / 100

  const openTutorialModal = () => {
    push({ search: 'modal=tutorial' })
  }

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.titleContainer}>
        <Flex sx={{ width: '100%' }}>
          <Text sx={styles.titleText}>{t('Liquidity Health Dashboard')}</Text>
          <Flex sx={{ ml: 1 }}>
            <ListTag variant="beta" />
          </Flex>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text sx={styles.detailText}>
            {t(
              "ApeSwap's data visualization tool provides insights into the decentralized liquidity profile and sustainability of crypto projects.",
            )}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text onClick={() => openTutorialModal()} sx={styles.btnText}>
            {t('Tutorial')}
          </Text>
          <Text
            onClick={() => window.open('https://github.com/ApeSwapFinance/lhd-config', '_blank')}
            sx={styles.btnText}
          >
            {t('Submit data update')}
          </Text>
        </Flex>
      </Flex>
      <Flex sx={styles.cardsContainer}>
        <StatCard
          title="Industry Average"
          value={Math.round(averageTotalScore * 100)}
          footerInfo={
            <>{`${industryAverageChange > 0 ? `+ ${industryAverageChange}` : industryAverageChange}% in last 7 days`}</>
          }
        />
        <StatCard
          title="Chains Supported"
          value={chainsSupported}
          footerInfo={
            <Button variant="text" size="sm" onClick={onFilterModal} target="_blank" sx={styles.cardBtnText}>
              See which chains
            </Button>
          }
        />
        <StatCard
          title="Supported Tokens"
          value={tokensTracked}
          footerInfo={
            <Link href="https://github.com/ApeSwapFinance/lhd-config" target="_blank" sx={{ color: 'yellow' }}>
              Verify Your Project?
            </Link>
          }
        />
      </Flex>
    </Flex>
  )
}

export default TitleCards

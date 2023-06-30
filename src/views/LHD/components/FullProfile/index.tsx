import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFullProfile, useFetchProfile } from 'state/lhd/hooks'
import { Flex, Spinner, Svg, Text } from 'components/uikit'
import { chartExtras, TokenProfile } from 'state/lhd/types'
import Chart from '../Chart'
import { useTranslation } from 'contexts/Localization'
import InfoCards from './components/InfoCards'
import LiquidityConcentration from './components/LiquidityConcentration'
import { styles } from './styles'
import TopSectionCards from './components/TopSectionCards'
import AreYouContributor from '../AreYouContributor'
import ExemptAssetNotice from './components/ExemptAssetNotice'

const FullProfile = ({
  chainID,
  address,
}: {
  chainID: string | string[] | undefined
  address: string | string[] | undefined
}) => {
  const fetchProfile = useFetchProfile()
  const fullProfile: TokenProfile | null = useFullProfile()
  const { t } = useTranslation()
  const router = useRouter()
  const DEX_MISSING_ASSETS = ['CRV']

  const [queryString, setQueryString] = useState('')

  const [chartPassBackData, setChartPassBackData] = useState<chartExtras>({
    sustainabilityLower: 0,
    sustainabilityUpper: 0,
    liquidityDebt: 0,
  })

  useEffect(() => {
    const qs = router.asPath.split('?')[1] !== undefined ? router.asPath.split('?')[1] : ''

    if (queryString === '') {
      setQueryString(qs)
    }

    if (qs) {
      router.replace(router.asPath.split('?')[0], router.asPath.split('?')[0])
    }
  }, [])

  useEffect(() => {
    if (chainID && address) {
      fetchProfile(chainID, address)
    }
  }, [chainID, address, fetchProfile])

  let handleChartCallback = (chartData: chartExtras) => {
    setChartPassBackData(chartData)
  }

  const handleBackButton = () => {
    router.push(
      { pathname: `/liquidity-health?${queryString ? queryString : Math.random() * 10}` },
      `/liquidity-health${queryString ? '?' + queryString : ''}`,
    )
  }

  if (fullProfile) {
    return (
      <Flex sx={styles.mainContainer}>
        <Flex sx={styles.topContainer}>
          <Text onClick={handleBackButton} sx={styles.back}>
            <Flex sx={{ mr: '5px' }}>
              <Svg icon="caret" direction="left" width={7} />
            </Flex>
            {t('Back')}
          </Text>
          <Text sx={styles.lastUpdated}>
            {t('Last updated')} {Math.round((Date.now() - parseInt(fullProfile?.createdAt)) / 36000) / 100}
            {t(' hours ago')}
          </Text>
        </Flex>
        {DEX_MISSING_ASSETS.includes(fullProfile?.addressMapping?.tokenSymbol) ? (
          <ExemptAssetNotice phraseCondition="dex" />
        ) : fullProfile?.mcap[0]?.amount > 100000000 ? (
          <ExemptAssetNotice phraseCondition="mcap" />
        ) : (
          <></>
        )}
        <TopSectionCards fullProfile={fullProfile} />
        <Flex sx={styles.lowerContainer}>
          <Flex sx={styles.layout}>
            <Flex sx={styles.chartCont}>
              <Flex sx={styles.titleContainer}>
                <Text sx={styles.titleText}>{t('Token Liquidity Strength')}</Text>
              </Flex>
              <Chart chartData={fullProfile?.healthChartData} passBackData={handleChartCallback} />
            </Flex>
            <Flex sx={styles.infoCardMobile}>
              <InfoCards fullProfile={fullProfile} chartExtras={chartPassBackData} />
            </Flex>
            <Flex sx={styles.liquidityConCont}>
              <LiquidityConcentration fullProfile={fullProfile} />
            </Flex>
          </Flex>
          <Flex sx={styles.infoCardDesktop}>
            <InfoCards fullProfile={fullProfile} chartExtras={chartPassBackData} />
          </Flex>
        </Flex>
        <AreYouContributor />
        <Text sx={styles.formula}>Formula version: {fullProfile.formulaVersion}</Text>
      </Flex>
    )
  }
  return (
    <Flex sx={styles.loadingSpinner}>
      <Spinner size={200} />
    </Flex>
  )
}

export default FullProfile

import React, { useEffect } from 'react'
import { useFullProfile, useFetchProfile } from 'state/lhd/hooks'
import { Flex, Link, Spinner, Svg, Text } from 'components/uikit'
import { ExternalDataOption, TokenProfile } from 'state/lhd/types'
import Chart from '../Chart'
import { useTranslation } from 'contexts/Localization'
import useModal from 'hooks/useModal'
import SharableCard from '../SharableCard'
import InfoCards from './components/InfoCards'
import LiquidityConcentration from './components/LiquidityConcentration'
import { styles } from './styles'
import TopSectionCards from './components/TopSectionCards'
import { Helmet } from 'react-helmet'
import Head from 'next/head'


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

  // const cardImage = `https://hosting.com/folder/${address}`; // Replace with your dynamic image URL logic
  const cardImage = `https://i.imgur.com/rF0bm3d.png` // Replace with your dynamic image URL logic

  useEffect(() => {
    if (chainID && address) {
      fetchProfile(chainID, address)
    }
  }, [chainID, address, fetchProfile])

  if (fullProfile) {
    return (
      <>
        {/* META TEST */}
     <Head>
  <meta property="og:image" content={cardImage} />
  <meta name="twitter:image" content={cardImage} />
  <meta property="og:title" content={`Token Health`} />
  <meta property="og:description" content="LHD desc" />
  <meta property="og:url" content={`https://apeswap.finance/liquidity-health/${address}`} />
  <meta property="og:type" content="website" />
  {/* <meta name="twitter:title" content={`${Token} Health`} />  */}
  <meta name="twitter:description" content="LHD Description" />
  <meta name="twitter:card" content="summary_large_image"/>
</Head>

        <Flex sx={styles.mainContainer}>
          <Flex sx={styles.topContainer}>
            <Link href={'/liquidity-health'} sx={{ textDecoration: 'none' }}>
              <Text sx={styles.back}>
                <Flex sx={{ mr: '5px' }}>
                  <Svg icon="caret" direction="left" width={7} />
                </Flex>
                {t('Back')}
              </Text>
            </Link>
            <Text sx={styles.lastUpdated}>
              {t('Last updated:')} {new Date(parseInt(fullProfile?.createdAt)).toLocaleString()}
            </Text>
          </Flex>
          <TopSectionCards fullProfile={fullProfile} />
          <Flex sx={styles.lowerContainer}>
            <Flex sx={styles.layout}>
              <Flex sx={styles.chartCont}>
                <Flex sx={styles.titleContainer}>
                  <Text sx={styles.titleText}>{t('Token Liquidity Health')}</Text>
                </Flex>
                <Chart chartData={fullProfile?.healthChartData} />
              </Flex>
              <Flex sx={styles.infoCardMobile}>
                <InfoCards fullProfile={fullProfile} />
              </Flex>
              <Flex sx={styles.liquidityConCont}>
                <LiquidityConcentration fullProfile={fullProfile} />
              </Flex>
            </Flex>
            <Flex sx={styles.infoCardDesktop}>
              <InfoCards fullProfile={fullProfile} />
            </Flex>
          </Flex>
          <Text sx={styles.formula}>Formula version: {fullProfile.formulaVersion}</Text>
        </Flex>
      </>
    )
  }
  return (
    <Flex sx={styles.loadingSpinner}>
      <Spinner size={200} />
    </Flex>
  )
}

export default FullProfile

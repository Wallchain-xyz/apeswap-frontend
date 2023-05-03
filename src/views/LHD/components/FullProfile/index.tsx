import React from 'react'
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

const FullProfile = ({ chainID, address }: {
  chainID: string | string[] | undefined,
  address: string | string[] | undefined
}) => {
  useFetchProfile(chainID, address)
  const fullProfile: TokenProfile | null = useFullProfile()
  const { t } = useTranslation()

  if (fullProfile) {
    return (
      <Flex sx={styles.mainContainer}>
        <Flex sx={styles.topContainer}>
          <Link href={'/liquidity-health'} sx={{ textDecoration: 'none' }}>
            <Text sx={styles.back}>
              <Flex sx={{ mr: '5px' }}>
                <Svg icon='caret' direction='left' width={7} />
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
        <Text sx={styles.formula}>
          Formula version: {fullProfile.formulaVersion}
        </Text>
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

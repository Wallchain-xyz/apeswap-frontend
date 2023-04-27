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
        <Flex sx={{ width: '100%', mt: '15px', flexDirection: ['column', 'column', 'column', 'row'] }}>
          <Flex sx={{
            minWidth: ['100%', '100%', '100%', 'calc(100% - 370px)'],
            width: ['100%', '100%', '100%', 'calc(100% - 370px)'],
            flexDirection: 'column',
            mr: ['0px', '0px', '0px', '20px'],
          }}>
            <Flex sx={{
              width: ['100vw', '100vw', '100%'],
              background: 'white2',
              borderRadius: '10px',
              ml: ['-10px', '-10px', '0px'],
              height: ['380px', '380px', '380px', '430px'],
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Chart />
            </Flex>
            <Flex sx={{ width: '100%', display: ['flex', 'flex', 'flex', 'none'] }}>
              <InfoCards fullProfile={fullProfile} />
            </Flex>
            <Flex sx={{
              width: ['100vw', '100vw', '100%'],
              background: 'white2',
              borderRadius: '10px',
              mt: '20px',
              ml: ['-10px', '-10px', '0px'],
              height: ['358px'],
            }}>
              <LiquidityConcentration fullProfile={fullProfile} />
            </Flex>
          </Flex>
          <Flex sx={{
            width: ['100%', '100%', '100%', '380px'],
            display: ['none', 'none', 'none', 'flex'],
          }}>
            <InfoCards fullProfile={fullProfile} />
          </Flex>
        </Flex>
        <Text sx={{
          fontWeight: 300,
          fontSize: ['10px', '10px', '10px', '12px'],
          color: 'textDisabled',
        }}>
          Formula version: {fullProfile.formulaVersion}
        </Text>
      </Flex>
    )
  }
  return (
    <Flex sx={{ width: '100%', height: 'calc(100vh - 60px)', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size={200} />
    </Flex>
  )
}

export default FullProfile
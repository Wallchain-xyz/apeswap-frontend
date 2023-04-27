import React from 'react'
import { Button, Flex, Svg, Text } from 'components/uikit'
import Image from 'next/image'
import { Box } from 'theme-ui'
import PriceChange from '../PercentageChange'
import IconButton from '../IconButton'
import ChainsIcons from '../ChainsIcons'
import ProgressBar from '../../../ProgressBar'
import { getColor } from '../../../../utils/getColor'
import { ExternalDataOption, TokenProfile } from 'state/lhd/types'
import useModal from 'hooks/useModal'
import SharableCard from '../../../SharableCard'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'

const TopSectionCards = ({fullProfile}: {fullProfile: TokenProfile}) => {
  const { t } = useTranslation()
  const firstValidMcap = fullProfile?.mcap.find((input: ExternalDataOption) => input?.amount) as ExternalDataOption
  const [onCreateCard] = useModal(<SharableCard tokenSymbol={fullProfile?.addressMapping?.tokenSymbol}
                                                tokenImageURL={fullProfile?.addressMapping?.tokenLogoUrl}
                                                totalScore={fullProfile?.totalScore}
                                                healthScore={fullProfile?.healthScore}
                                                concentrationScore={fullProfile?.concentrationScore}
                                                ownershipScore={fullProfile?.ownershipScore}
                                                tokenAddresses={fullProfile?.addressMapping.tokenAddresses} />)
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.leftContainer}>
        <Flex sx={{ width: '100%' }}>
          <Flex sx={{ width: '100%', flexDirection: 'column' }}>
            <Flex sx={styles.nameBtnContainer}>
              <Flex>
                <Flex sx={styles.iconImgCont}>
                  <Image src={fullProfile?.addressMapping?.tokenLogoUrl}
                         alt={'token img'}
                         width={23}
                         height={23}
                         style={{ borderRadius: '25px' }} />
                </Flex>
                <Text sx={{
                  fontWeight: 700,
                  fontSize: ['22px'],
                  lineHeight: ['30px'],
                  mx: '10px',
                }}>
                  {fullProfile?.addressMapping?.tokenSymbol}
                </Text>
                <Box sx={{ background: 'white3', padding: '2px 5px', borderRadius: '10px', mr: '5px' }}>
                  <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
                    ${fullProfile?.currentPrice[0]?.amount.toFixed(5)}
                    <PriceChange priceChange={fullProfile?.priceChange24hr?.toFixed(2)} />
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                mt: ['10px', '10px', '0px'],
              }}>
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.siteUrl} icon='filledURL' />
                {/*TODO: Which audits should we show?*/}
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.auditUrls?.[0]} icon='tickShield' />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.twitterUrl} icon='twitter' />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.telegramUrl} icon='send' />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.discordUrl} icon='discord' />
              </Flex>
            </Flex>
            <Flex sx={{ width: '100%', alignItems: 'center', mt: '10px' }}>
              <Flex sx={{
                width: '50px',
                height: '20px',
                background: 'linear-gradient(0deg, rgba(253, 251, 245, 0.5), rgba(253, 251, 245, 0.5)), #FFB300',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}>
                <Text sx={{ fontWeight: 500, fontSize: ['8px'], lineHeight: ['12px'], color: 'input' }}>
                  {t('Rank #')} ?
                </Text>
              </Flex>
              <Flex sx={{ width: '65px', height: '100%', marginLeft: '10px' }}>
                <ChainsIcons tokenAddresses={fullProfile?.addressMapping.tokenAddresses} />
              </Flex>
              <Text sx={{ fontWeight: 400, fontSize: ['12px'], lineHeight: ['18px'], color: 'textDisabled' }}>
                {t('Market Cap:')} ${firstValidMcap?.amount.toLocaleString(undefined)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          background: 'white2',
          borderRadius: '10px',
          padding: ['10px', '10px', '10px', '20px'],
          flexDirection: ['column', 'column', 'column', 'row'],
          mt: ['15px', '15px', '15px', '0px'],
        }}>
        <Flex sx={{ width: '100%', flexDirection: 'row' }}>
          <Flex sx={{ flexDirection: 'column', width: '100%', maxWidth: '90px' }}>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500, lineHeight: '20px' }}>
                {t('Health')}
              </Text>
            </Flex>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500, lineHeight: '20px' }}>
                {t('Ownership')}
              </Text>
            </Flex>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500, lineHeight: '20px' }}>
                {t('Concentration')}
              </Text>
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: 'column', width: '100%' }}>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.healthScore * 100)} position='right' />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.ownershipScore * 100)} position='right' />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.concentrationScore * 100)} position='right' />
            </Flex>
          </Flex>
          <Flex sx={{ width: '100%', maxWidth: '70px', flexDirection: 'column', alignItems: 'center', ml: '10px' }}>
            <Text sx={{ fontWeight: 400, fontSize: ['16px'], lineHeight: ['20px'], color: 'textDisabled' }}>
              {t('SCORE')}
            </Text>
            <Text sx={{
              fontWeight: 700,
              fontSize: ['55px'],
              lineHeight: ['40px'],
              color: getColor(fullProfile.totalScore * 100),
            }}>
              {Math.round(fullProfile.totalScore * 100)}
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ mt: ['10px', '10px', '10px', '0px'] }}>
          <Button variant='tertiary'
                  sx={{
                    color: 'text',
                    width: ['100%'],
                    textTransform: 'capitalize',
                    flexDirection: ['row', 'row', 'row', 'column-reverse'],
                    mx: ['0px', '0px', '0px', '15px'],
                    minWidth: '65px',
                    maxHeight: '60px',
                    alignItems: 'center',
                  }}
                  onClick={onCreateCard}
          >
            <Text sx={{ fontWeight: 500, fontSize: ['10px'], lineHeight: ['17px'] }}>
              {t('Share')}
            </Text>
            <Svg icon='share' width={17} color="text" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TopSectionCards

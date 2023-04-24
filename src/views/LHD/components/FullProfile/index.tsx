import React from 'react'
import { useFullProfile, useFetchProfile } from '../../../../state/lhd/hooks'
import { Button, Flex, Link, Svg, Text, Tooltip } from '../../../../components/uikit'
import { Box } from 'theme-ui'
import { ExternalDataOption, TokenProfile } from '../../../../state/lhd/types'
import PriceChange from './components/PercentageChange'
import IconButton from './components/IconButton'
import Chart from '../Chart'
import { useTranslation } from '../../../../contexts/Localization'
import Image from 'next/image'
import ChainsIcons from './components/ChainsIcons'
import ProgressBar from '../ProgressBar'
import { getColor } from '../../utils/getColor'
import TooltipBubble from '../../../../components/uikit/Tooltip'
import { formatDollar } from '../../../../utils/formatNumbers'
import useModal from '../../../../hooks/useModal'
import SharableCard from '../SharableCard'

const FullProfile = ({ chainID, address }: {
  chainID: string | string[] | undefined,
  address: string | string[] | undefined
}) => {
  useFetchProfile(chainID, address)
  const fullProfile: TokenProfile | null = useFullProfile()
  const { t } = useTranslation()
  const firstValidMcap = fullProfile?.mcap.find((input: ExternalDataOption) => input?.amount) as ExternalDataOption
  const [onCreateCard] = useModal(<SharableCard tokenSymbol={fullProfile?.addressMapping?.tokenSymbol}
                                                tokenImageURL={fullProfile?.addressMapping?.tokenLogoUrl}
                                                totalScore={fullProfile?.totalScore}
                                                healthScore={fullProfile?.healthScore}
                                                concentrationScore={fullProfile?.concentrationScore}
                                                ownershipScore={fullProfile?.ownershipScore}
                                                tokenAddresses={fullProfile?.addressMapping.tokenAddresses}/>)

  if (fullProfile) {
    return (
      <Flex sx={{ mt: '30px', width: '100%', flexDirection: 'column' }}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Link href={'/lhd'} sx={{ textDecoration: 'none' }}>
            <Text sx={{
              fontSize: ['12px', '12px', '12px', '14px'],
              lineHeight: '20px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Flex sx={{ mr: '5px' }}>
                <Svg icon='caret' direction='left' width={7} />
              </Flex>
              {t('Back')}
            </Text>
          </Link>
          <Text sx={{
            fontWeight: 300,
            fontSize: ['10px', '10px', '10px', '12px'],
            color: 'textDisabled',
          }}>
            {t('Last updated:')} {new Date(parseInt(fullProfile?.createdAt)).toLocaleString()}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', flexDirection: ['column', 'column', 'column', 'row'] }}>
          <Flex sx={{
            width: ['100%', '100%', 'unset'],
            minWidth: ['', '', '', '460px'],
            background: 'white2',
            borderRadius: '10px',
            padding: '20px',
            alignItems: 'flex-start',
            mr: ['0px', '0px', '0px', '15px'],
          }}>
            <Flex sx={{ width: '100%' }}>
              <Flex sx={{ width: '100%', flexDirection: 'column' }}>
                <Flex sx={{ width: '100%', alignItems: ['flex-start'], flexDirection: ['column', 'column', 'row'] }}>
                  <Flex>
                    <Flex sx={{
                      minWidth: '25px',
                      height: '25px',
                      mt: ['2px'],
                      background: '#fff',
                      borderRadius: '25px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Image src={fullProfile?.addressMapping?.tokenLogoUrl}
                             alt={'token img'}
                             width={39}
                             height={39}
                             style={{
                               width: '93%', height: '93%',
                               borderRadius: '25px',
                             }} />
                    </Flex>
                    <Text sx={{
                      fontWeight: 700,
                      fontSize: ['22px'],
                      lineHeight: ['30px'],
                      mx: '10px',
                    }}>
                      {fullProfile?.addressMapping?.tokenSymbol}
                    </Text>
                    <Box sx={{ background: 'white3', padding: '2px 5px', borderRadius: '10px', mr: '10px' }}>
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
                    <IconButton href={fullProfile?.addressMapping?.profileLinks?.siteUrl} icon='URL' />
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
                <Svg icon='share' width={17} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={{ width: '100%', mt: '15px', flexDirection: ['column', 'column', 'column', 'row'] }}>
          <Flex sx={{
            minWidth: ['100vw', '100vw', '100%', '460px', 'calc(100% - 350px)'],
            background: 'white2',
            borderRadius: '10px',
            mr: ['0px', '0px', '0px', '20px'],
            ml: ['-10px', '-10px', '0px'],
            height: ['380px', '380px', '380px', '430px'],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Chart />
          </Flex>
          <Flex sx={{
            width: '100%',
            background: 'white2',
            borderRadius: '10px',
            mt: ['15px', '15px', '15px', '0px'],
            height: ['380px', '380px', '380px', '430px'],
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
            <Flex sx={{ width: '100%', justifyContent: 'center', mt: ['20px'] }}>
              <Text sx={{ fontWeight: 600, fontSize: ['16px'], lineHeight: ['20px'] }}>
                {t('Liquidity Health Summary')}
              </Text>
            </Flex>
            <Flex sx={{ width: '100%', mt: ['10px'], p: ['20px'], flexDirection: 'column' }}>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Total Valid Liquidity')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Total Valid Liquidity</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {formatDollar({ num: fullProfile?.totalValidLiquidity })}
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Owned Extractable Liquidity')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Owned Extractable Liquidity</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {formatDollar({ num: fullProfile?.extractableLiquidity })}
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Liquidity Debt')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Liquidity Debt</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  pending data for this
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Sustainability Range (Upper)')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Sustainability Range (Upper)</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  pending data for this
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Sustainability Range (Lower)')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Sustainability Range (Lower)</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  pending data for this
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Unlocked Supply')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Unlocked Supply</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {formatDollar({ num: fullProfile?.unlockedSupply })}
                </Text>
              </Flex>
              <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {t('Circulating Supply')}
                  <TooltipBubble
                    placement='bottomLeft'
                    transformTip='translate(0%, 0%)'
                    width='180px'
                    body={<>Circulating Supply</>}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
                  </TooltipBubble>
                </Text>
                <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
                  {formatDollar({ num: fullProfile?.circulatingSupply[0].amount })}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {chainID}-{address}
        <br />
        {fullProfile && (
          <>
            {fullProfile?.addressMapping?.tokenSymbol}: {(fullProfile?.totalScore * 100).toFixed()}
          </>
        )}
      </Flex>
    )
  }
  return (
    <>
      Loading..
    </>
  )
}

export default FullProfile
import React from 'react'
import { useFullProfile, useFetchProfile } from '../../../../state/lhd/hooks'
import { Flex, Link, Svg, Text } from '../../../../components/uikit'
import ServiceTokenDisplay from '../../../../components/ServiceTokenDisplay'
import { Box } from 'theme-ui'
import { TokenProfile } from '../../../../state/lhd/types'
import PriceChange from './components/PercentageChange'
import IconButton from './components/IconButton'
import Chart from '../Chart'
import { useTranslation } from '../../../../contexts/Localization'

const FullProfile = ({ chainID, address }: {
  chainID: string | string[] | undefined,
  address: string | string[] | undefined
}) => {
  useFetchProfile(chainID, address)
  const fullProfile: TokenProfile | null = useFullProfile()
  const { t } = useTranslation()

  if (fullProfile) {
    return (
      <Flex sx={{ mt: '30px', width: '100%', flexDirection: 'column' }}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Link href={'/lhd'} sx={{ textDecoration: 'none' }}>
            <Text sx={{
              fontSize: ['12px','12px','12px','14px'],
              lineHeight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Flex sx={{mr: '5px'}}>
                <Svg icon='caret' direction='left' width={7} />
              </Flex>
              {t('Back')}
            </Text>
          </Link>
          <Text sx={{
            fontWeight: 300,
            fontSize: ['10px','10px','10px','12px'],
            color: 'textDisabled'
          }}>
            {t('Last updated:')} wen dev
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', flexDirection: ['column', 'column', 'column', 'row'] }}>
          <Flex sx={{
            width: ['100%', '100%', 'unset'],
            minWidth: ['', '', '', '460px'],
            background: 'white2',
            borderRadius: '10px',
            padding: '20px',
            alignItems: 'center',
            mr: ['0px', '0px', '0px', '15px'],
          }}>
            <Flex sx={{ width: '100%', alignItems: 'center' }}>
              <ServiceTokenDisplay token1={fullProfile?.addressMapping?.tokenSymbol} size={25} />
              <Text sx={{
                fontWeight: 700,
                fontSize: ['22px'],
                mx: '10px',
              }}>{fullProfile?.addressMapping?.tokenSymbol}</Text>
              <Box sx={{ background: 'white3', padding: '2px 5px', borderRadius: '10px', mr: '10px' }}>
                <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
                  ${fullProfile?.currentPrice[0]?.amount}
                  <PriceChange priceChange={fullProfile?.currentPrice[0]?.amount.toFixed(2)} />
                </Text>
              </Box>
              <IconButton>
                <Link href={fullProfile?.addressMapping?.profileLinks?.siteUrl ?? ''} target='_blank'>
                  <Svg icon='URL' width={10} />
                </Link>
              </IconButton>
              <IconButton>
                <Link href={fullProfile?.addressMapping?.profileLinks?.siteUrl ?? ''} target='_blank'>
                  <Svg icon='URL' width={10} />
                </Link>
              </IconButton>
              <IconButton>
                <Link href={fullProfile?.addressMapping?.profileLinks?.siteUrl ?? ''} target='_blank'>
                  <Svg icon='URL' width={10} />
                </Link>
              </IconButton>
              <IconButton>
                <Link href={fullProfile?.addressMapping?.profileLinks?.siteUrl ?? ''} target='_blank'>
                  <Svg icon='URL' width={10} />
                </Link>
              </IconButton>
              <IconButton>
                <Link href={fullProfile?.addressMapping?.profileLinks?.siteUrl ?? ''} target='_blank'>
                  <Svg icon='URL' width={10} />
                </Link>
              </IconButton>
            </Flex>
          </Flex>
          <Flex
            sx={{
              width: '100%',
              background: 'white2',
              borderRadius: '10px',
              padding: '20px',
              flexDirection: 'column',
              mt: ['15px', '15px', '15px', '0px'],
            }}>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500 }}>
                Health {(fullProfile.healthScore * 100).toFixed()}%
              </Text>
            </Flex>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500 }}>
                Concentration {(fullProfile.concentrationScore * 100).toFixed()}%
              </Text>
            </Flex>
            <Flex>
              <Text sx={{ fontSize: '10px', fontWeight: 500 }}>
                Ownership {(fullProfile.ownershipScore * 100).toFixed()}%
              </Text>
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
            justifyContent: 'center',
          }}>
            Liquidity Health Summary
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
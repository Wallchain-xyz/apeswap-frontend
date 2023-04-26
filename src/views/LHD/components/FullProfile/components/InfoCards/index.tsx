import React from 'react'
import { Flex, Text } from 'components/uikit'
import HealthSummaryRow from './HealthSummaryRow'
import { formatDollar } from 'utils/formatNumbers'
import { useTranslation } from 'contexts/Localization'
import { LiquidityOwner, LiquidityPool, TokenProfile } from 'state/lhd/types'
import { styles } from './styles'
import dynamic from 'next/dynamic'
import { Svg } from 'components/uikit'
import IconButton from '../IconButton'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { BLOCK_EXPLORER } from 'config/constants/chains'

const DoughnutChart = dynamic(() => import('./DoughnutChart'), {
  ssr: false,
})

//TODO: remove dummyArray and add the icons to the rows

const InfoCards = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()

  const whitelistedOwners = fullProfile.liquidityPools.flatMap((pool: LiquidityPool) => {
    return pool.liquidityOwners.map((owner: LiquidityOwner) => ({
      ...owner,
      ...pool,
      liquidityOwners: undefined,
    }))
  })
  //just to test a card with lots of rows
  const dummyArray = [...whitelistedOwners, ...whitelistedOwners, ...whitelistedOwners, ...whitelistedOwners]

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={{ ...styles.cardContainer, mt: ['15px', '15px', '15px', '0px'] }}>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>
            {t('Liquidity Health Summary')}
          </Text>
        </Flex>
        <Flex sx={styles.healthRowsContainer}>
          <HealthSummaryRow ttTitle={t('Total Valid Liquidity')}
                            ttBody={<>Total Valid Liquidity</>}
                            value={formatDollar({ num: fullProfile?.totalValidLiquidity })} />
          <HealthSummaryRow ttTitle={t('Total Extractable Liquidity')}
                            ttBody={<>Total Extractable Liquidity</>}
                            value={formatDollar({ num: fullProfile?.extractableLiquidity })}
                            circleColor={'#1179A6'} />
          <HealthSummaryRow ttTitle={t('Owned Extractable Liquidity')}
                            ttBody={<>Owned Extractable Liquidity</>}
                            value={formatDollar({ num: fullProfile?.ownedLiquidity })}
                            circleColor={'#904DC4'} />
          <HealthSummaryRow ttTitle={t('Liquidity Debt')}
                            ttBody={<>Liquidity Debt</>}
                            value={'pending data'}
                            circleColor={'#DF4141'} />
          <HealthSummaryRow ttTitle={t('Sustainability Range (Upper)')}
                            ttBody={<>Sustainability Range (Upper)</>}
                            value={'pending data'}
                            circleColor={'#39A712'} />
          <HealthSummaryRow ttTitle={t('Sustainability Range (Lower)')}
                            ttBody={<>Sustainability Range (Lower)</>}
                            value={'pending data'}
                            circleColor={'#BFDDB5'} />
          <HealthSummaryRow ttTitle={t('Unlocked Supply')}
                            ttBody={<>Unlocked Supply</>}
                            value={formatDollar({ num: fullProfile?.unlockedSupply })} />
          <HealthSummaryRow ttTitle={t('Circulating Supply')}
                            ttBody={<>Circulating Supply</>}
                            value={formatDollar({ num: fullProfile?.circulatingSupply[0].amount })} />
        </Flex>
      </Flex>
      <Flex sx={{
        ...styles.cardContainer,
        mt: ['15px', '15px', '15px', '20px'],
        height: ['', '', '', '458px'],
      }}>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>
            {t('Liquidity Ownership')}
          </Text>
        </Flex>
        <Flex sx={styles.ownershipContainer}>
          <Flex sx={styles.chart}>
            <DoughnutChart owned={fullProfile?.validOwnedLiquidity}
                           notOwned={fullProfile.totalValidLiquidity - fullProfile.validOwnedLiquidity} />
          </Flex>
          <Flex sx={styles.chartDetails}>
            <HealthSummaryRow ttTitle={t('Owned')}
                              value={formatDollar({ num: fullProfile.validOwnedLiquidity })}
                              circleColor={'#38A611'}
                              lineHeight='24px' />
            <HealthSummaryRow ttTitle={t('Not Owned')}
                              value={formatDollar({ num: fullProfile.totalValidLiquidity - fullProfile.validOwnedLiquidity })}
                              circleColor={'#F4BE37'}
                              lineHeight='24px' />
          </Flex>
        </Flex>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>
            {t('Whitelisted Addresses')}
          </Text>
        </Flex>
        <Flex sx={styles.whiteContainer}>
          <Flex sx={styles.ownerRowsContainer}>
            {//change this before merge
              dummyArray.length > 0 ? dummyArray.map((whiteListedOwner) => {
                  return (
                    <Flex sx={styles.rowContainer} key={whiteListedOwner.lpAddress}>
                      <Text sx={{ display: 'flex', alignItems: 'center' }}>
                        {whiteListedOwner.baseToken.symbol}-{whiteListedOwner.quoteToken.symbol}
                        <IconButton href={`${BLOCK_EXPLORER[whiteListedOwner.chainId as unknown as SupportedChainId]}/`}
                                    icon='filledURL' simpleBtn />
                      </Text>
                      <Text sx={{ display: 'flex', alignItems: 'center' }}>
                        {formatDollar({ num: whiteListedOwner.amount })}
                        <Flex sx={{ ml: '3px' }}>
                          {whiteListedOwner.reason === 'known' ? (
                            <Svg icon='tickShield' color='success' />
                          ) : (
                            <Svg icon='yellowQuestion' />
                          )}
                        </Flex>
                      </Text>
                    </Flex>
                  )
                })
                : (
                  <>monkey</>
                )
            }
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InfoCards
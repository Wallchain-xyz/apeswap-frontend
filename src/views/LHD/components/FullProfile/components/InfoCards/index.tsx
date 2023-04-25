import React from 'react'
import { Flex, Text } from 'components/uikit'
import HealthSummaryRow from './HealthSummaryRow'
import { formatDollar } from 'utils/formatNumbers'
import { useTranslation } from 'contexts/Localization'
import { LiquidityOwner, LiquidityPool, TokenProfile } from 'state/lhd/types'
import { styles } from './styles'
import dynamic from 'next/dynamic'
import { Svg } from '../../../../../../components/uikit'
import IconButton from '../IconButton'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { BLOCK_EXPLORER } from '../../../../../../config/constants/chains'

const PieChart = dynamic(() => import('./PieChart'), {
  ssr: false,
})

const InfoCards = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()

  const whitelistedOwners = fullProfile.liquidityPools.flatMap((pool: LiquidityPool) => {
    return pool.liquidityOwners.map((owner: LiquidityOwner) => ({
      ...owner,
      ...pool,
      liquidityOwners: undefined,
    }))
  })
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
      <Flex sx={{ ...styles.cardContainer, mt: ['15px', '15px', '15px', '20px'], height: '458px' }}>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>
            {t('Liquidity Ownership')}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', my: '20px' }}>
          <Flex sx={{ width: '40%', pl: '30px' }}>
            <PieChart owned={fullProfile?.ownedLiquidity}
                      notOwned={fullProfile.totalValidLiquidity - fullProfile.ownedLiquidity} />
          </Flex>
          <Flex sx={{ width: '60%', flexDirection: 'column', justifyContent: 'center', px: '30px' }}>
            <HealthSummaryRow ttTitle={t('Owned')}
                              value={formatDollar({ num: fullProfile.ownedLiquidity })}
                              circleColor={'#38A611'} />
            <HealthSummaryRow ttTitle={t('Not Owned')}
                              value={formatDollar({ num: fullProfile.totalValidLiquidity - fullProfile.ownedLiquidity })}
                              circleColor={'#F4BE37'} />
          </Flex>
        </Flex>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>
            {t('Whitelisted Addresses')}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', p: '20px', maxHeight: '219px' }}>
          <Flex sx={{ width: '100%', height: '100%', overflow: 'auto', flexDirection: 'column', px:'10px' }}>
            {//change this before merge
              dummyArray.length > 0 ? dummyArray.map((whiteListedOwner) => {
                  return (
                    <Flex sx={{
                      width: '100%',
                      justifyContent: 'space-between',
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: '14px',
                    }} key={whiteListedOwner.lpAddress}>
                      <Text sx={{ display: 'flex', alignItems: 'center' }}>
                        {whiteListedOwner.baseToken.symbol}-{whiteListedOwner.quoteToken.symbol}
                        <IconButton href={`${BLOCK_EXPLORER[whiteListedOwner.chainId as unknown as SupportedChainId]}/`}
                                    icon='filledURL' simpleBtn />
                      </Text>
                      <Text>{formatDollar({ num: whiteListedOwner.amount })}</Text>
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
import { Flex, Text } from 'components/uikit'
import HealthSummaryRow from './HealthSummaryRow'
import { formatDollar, formatValue } from 'utils/formatNumbers'
import { useTranslation } from 'contexts/Localization'
import { LiquidityOwner, LiquidityPool, TokenProfile } from 'state/lhd/types'
import { styles } from './styles'
import dynamic from 'next/dynamic'
import { Svg } from 'components/uikit'
import IconButton from '../IconButton'
import { Button } from '../../../../../../components/uikit'
import TooltipBubble from '../../../../../../components/uikit/Tooltip'
import TokenImage from '../../../../../../components/TokenImage'
import { CHAIN_DETAILS } from 'views/LHD/utils/config'

const DoughnutChart = dynamic(() => import('./DoughnutChart'), {
  ssr: false,
})

const InfoCards = ({ fullProfile, chartExtras }: { fullProfile: TokenProfile; chartExtras: any }) => {
  const { t } = useTranslation()

  const whitelistedOwners = fullProfile.liquidityPools
    .flatMap((pool: LiquidityPool) => {
      return pool.liquidityOwners.map((owner: LiquidityOwner) => ({
        ...owner,
        ...pool,
        liquidityOwners: undefined,
      }))
    })
    .filter((owner) => {
      return owner.isHardAssetPair
    })

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={{ ...styles.cardContainer, mt: ['15px', '15px', '15px', '0px'] }}>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>{t('Liquidity Strength Summary')}</Text>
        </Flex>
        <Flex sx={styles.healthRowsContainer}>
          <HealthSummaryRow
            ttTitle={t('Total Valid Liquidity')}
            ttBody={<>Total Valid Liquidity</>}
            value={formatDollar({ num: fullProfile?.totalValidLiquidity })}
          />
          <HealthSummaryRow
            ttTitle={t('Total Extractable Liquidity')}
            ttBody={<>Total Extractable Liquidity</>}
            value={formatDollar({ num: fullProfile?.extractableLiquidity })}
            circleColor={'#1179A6'}
          />
          <HealthSummaryRow
            ttTitle={t('Owned Extractable Liquidity')}
            ttBody={<>Owned Extractable Liquidity</>}
            value={formatDollar({ num: fullProfile?.ownedExtractableLiquidity })}
            circleColor={'#904DC4'}
          />
          <HealthSummaryRow
            ttTitle={t('Liquidity Debt')}
            ttBody={<>Liquidity Debt</>}
            value={
              (fullProfile?.mcap[0].amount / 100) * chartExtras?.liquidityDebt > 0
                ? formatDollar({ num: (fullProfile?.mcap[0].amount / 100) * chartExtras?.liquidityDebt })
                : '$0'
            }
            circleColor={'#DF4141'}
          />
          <HealthSummaryRow
            ttTitle={t('Sustainability Range (Upper)')}
            ttBody={<>Sustainability Range (Upper)</>}
            value={formatDollar({ num: (fullProfile?.mcap[0].amount / 100) * chartExtras?.sustainabilityUpper })}
            circleColor={'#39A712'}
          />
          <HealthSummaryRow
            ttTitle={t('Sustainability Range (Lower)')}
            ttBody={<>Sustainability Range (Lower)</>}
            value={formatDollar({ num: (fullProfile?.mcap[0].amount / 100) * chartExtras?.sustainabilityLower })}
            circleColor={'#BFDDB5'}
          />
          <HealthSummaryRow
            ttTitle={t('Unlocked Supply')}
            ttBody={<>Unlocked Supply</>}
            value={formatValue({ num: fullProfile?.unlockedSupply })}
          />
          <HealthSummaryRow
            ttTitle={t('Circulating Supply')}
            ttBody={<>Circulating Supply</>}
            value={formatValue({ num: fullProfile?.circulatingSupply[0].amount })}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          ...styles.cardContainer,
          mt: ['15px', '15px', '15px', '20px'],
          height: ['', '', '', '458px'],
        }}
      >
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.titleText}>{t('Liquidity Ownership')}</Text>
        </Flex>
        {whitelistedOwners.length > 0 ? (
          <>
            <Flex sx={styles.ownershipContainer}>
              <Flex sx={styles.chart}>
                <DoughnutChart
                  owned={fullProfile?.validOwnedLiquidity}
                  notOwned={fullProfile.totalValidLiquidity - fullProfile.validOwnedLiquidity}
                />
              </Flex>
              <Flex sx={styles.chartDetails}>
                <HealthSummaryRow
                  ttTitle={t('Owned')}
                  value={formatDollar({ num: fullProfile.validOwnedLiquidity })}
                  circleColor={'#38A611'}
                  lineHeight="24px"
                />
                <HealthSummaryRow
                  ttTitle={t('Not Owned')}
                  value={formatDollar({ num: fullProfile.totalValidLiquidity - fullProfile.validOwnedLiquidity })}
                  circleColor={'#F4BE37'}
                  lineHeight="24px"
                />
              </Flex>
            </Flex>
            <Flex sx={styles.titleContainer}>
              <Text sx={styles.titleText}>{t('Whitelisted Addresses')}</Text>
            </Flex>
            <Flex sx={styles.whiteContainer}>
              <Flex sx={styles.ownerRowsContainer}>
                {whitelistedOwners.map((whiteListedOwner, index) => {
                  const chainInfo = CHAIN_DETAILS.find(
                    (chainOption) => chainOption.chainId === whiteListedOwner.chainId,
                  )
                  return (
                    <Flex sx={styles.rowContainer} key={whiteListedOwner.lpAddress + index}>
                      <Text sx={{ display: 'flex', alignItems: 'center' }}>
                        <Flex sx={{ position: 'relative', minWidth: ['40px'] }}>
                          <Flex sx={styles.imgCont}>
                            <TokenImage url={whiteListedOwner.baseToken.tokenLogoUrl} size={22} />
                          </Flex>
                          <Flex sx={{ ...styles.imgCont, position: 'absolute', right: '0px', zIndex: 0 }}>
                            <TokenImage url={whiteListedOwner.quoteToken.tokenLogoUrl} size={22} />
                          </Flex>
                        </Flex>
                        {whiteListedOwner?.baseToken?.symbol?.toUpperCase()}-
                        {whiteListedOwner?.quoteToken?.symbol?.toUpperCase()}
                        <IconButton
                          href={`${chainInfo?.blockExplorer?.url}address/${whiteListedOwner.walletAddress}`}
                          icon="filledURL"
                          simpleBtn
                        />
                      </Text>
                      <Text sx={{ display: 'flex', alignItems: 'center' }}>
                        {formatDollar({ num: whiteListedOwner.amount })}
                        <Flex sx={{ ml: '3px' }}>
                          {whiteListedOwner.reason === 'known' ? (
                            <Svg icon="tickShield" color="success" />
                          ) : (
                            <TooltipBubble
                              placement="bottomRight"
                              transformTip="translate(4%, -4%)"
                              width="200px"
                              body={
                                <>
                                  {t(
                                    whiteListedOwner.reason === 'burned'
                                      ? 'We suspect this is owned liquidity due to the LP being burned.'
                                      : 'We suspect this is owned liquidity from a locking contract or multi-sig wallet.',
                                  )}
                                </>
                              }
                              sx={{ '&::before': { right: '-5%' }, borderRadius: '7px' }}
                            >
                              <Flex sx={{ ml: '5px' }}>
                                <Svg icon="yellowQuestion" width="12px" />
                              </Flex>
                            </TooltipBubble>
                          )}
                        </Flex>
                      </Text>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex sx={styles.emptyMonkeyCont}>
            <Svg icon="placeholderMonkey" />
            <Text sx={{ fontWeight: 700, fontSize: ['21px'], lineHeight: ['31.5px'], mt: '15px' }}>
              {t('Ownership data not found')}
            </Text>
            <Text sx={{ fontWeight: 400, fontSize: ['12px'], lineHeight: ['18px'], textAlign: 'center', mt: '15px' }}>
              {t(`If you’re a contributor to this project, you can submit updated liquidity data through GitHub.`)}
            </Text>
            <Button
              onClick={() => window.open('https://github.com/ApeSwapFinance/lhd-config', '_blank')}
              sx={{ mt: '15px' }}
            >
              {t('SUBMIT DATA UPDATE')}
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default InfoCards

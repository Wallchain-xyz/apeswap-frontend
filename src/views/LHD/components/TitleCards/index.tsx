import React from 'react'
import { Flex, Link, Text } from 'components/uikit'
import StatCard from './StatCard'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { useIndustryAvg } from '../../../../state/lhd/hooks'

const TitleCards = () => {
  const { t } = useTranslation()
  const { averageChange, averageTotalScore, chainsSupported, tokensVerified } = useIndustryAvg()
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.titleContainer}>
        <Flex sx={{ width: '100%' }}>
          <Text sx={styles.titleText}>{t('Liquidity Health Dashboard')}</Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text sx={styles.detailText}>
            {t('ApeSwap’s data visualization tool that provides insights into the liquidity levels and sustainability of cryptocurrency projects.')}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Link href=''>
            <Text sx={styles.btnText}>
              {t('Learn More')}
            </Text>
          </Link>
          <Link href='https://github.com/ApeSwapFinance/lhd-config'>
            <Text
              sx={styles.btnText}>
              {t('Submit data update')}
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={styles.cardsContainer}>
        <StatCard
          title='Industry Average'
          value={(parseFloat(averageTotalScore) * 100).toFixed()}
          footerInfo={<>{`${averageChange ?? '????'}% on the last 7 days`}</>}
        />
        <StatCard
          title='Chains Supported'
          value={chainsSupported}
          footerInfo={<Link href={'where.dev'} target='_blank' sx={{ color: 'yellow' }}>See which chains</Link>}
        />
        <StatCard
          title='Verified Tokens'
          value={tokensVerified}
          footerInfo={<Link href={'where.dev'} target='_blank' sx={{ color: 'yellow' }}>Verify Your Project?</Link>}
        />
      </Flex>
    </Flex>
  )
}

export default TitleCards
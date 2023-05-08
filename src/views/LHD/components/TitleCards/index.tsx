import React from 'react'
import { Flex, Link, Text } from 'components/uikit'
import StatCard from './StatCard'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'

const TitleCards = () => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.titleContainer}>
        <Flex sx={{ width: '100%' }}>
          <Text sx={styles.titleText}>{t('Liquidity Health Dashboard')}</Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Text sx={styles.detailText}>
            {t('Apeswap’s data visualization tool that provides insights into the liquidity levels and sustainability of cryptocurrency projects.')}
          </Text>
        </Flex>
        <Flex sx={{ width: '100%', mt: '10px' }}>
          <Link href=''>
            <Text sx={styles.btnText}>
              {t('Learn More')}
            </Text>
          </Link>
          <Link href=''>
            <Text
              sx={styles.btnText}>
              {t('Improve your score')}
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={styles.cardsContainer}>
        <StatCard
          title='Industry Average'
          value={'60'}
          footerInfo={<>+0,45% on the last 7 days</>}
        />
        <StatCard
          title='Chain supported'
          value={'19'}
          footerInfo={<Link href={'where.dev'} target='_blank' sx={{ color: 'yellow' }}>See which chains</Link>}
        />
        <StatCard
          title='Verified tokens'
          value={'235'}
          footerInfo={<Link href={'where.dev'} target='_blank' sx={{ color: 'yellow' }}>Verify your Project?</Link>}
        />
      </Flex>
    </Flex>
  )
}

export default TitleCards
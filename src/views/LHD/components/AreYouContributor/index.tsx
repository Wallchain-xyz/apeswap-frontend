import React from 'react'
import { Button, Flex, Text } from '../../../../components/uikit'
import { useTranslation } from '../../../../contexts/Localization'
import { styles } from './styles'

const Index = () => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.contributorCont}>
      <Text sx={styles.title}>
        {t('Are you a contributor to this project?')}
      </Text>
      <Text sx={styles.info}>
        {t('Visit our documentation to learn more about how Liquidity Scores are calculated. Or, submit updated liquidity data through GitHub.')}
      </Text>
      <Flex sx={styles.btnCont}>
        <Button variant='secondary'
                sx={{ ...styles.btn, m: ['0 0 10px 0', '0 0 10px 0', '0 0 10px 0', '0 20px 0 0'] }}>
          {t('LEARN MORE')}
        </Button>
        <Button sx={{ ...styles.btn, width: ['100%', '100%', '100%', '215px'] }}>
          {t('SUBMIT DATA UPDATE')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Index
import { useMemo } from 'react'
import { styles } from './styles'
import { Box } from 'theme-ui'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { grayIcons } from './grayChains'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import useSelectChain from 'hooks/useSelectChain'
import { useRouter } from 'next/router'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Button, Flex, Link, Text } from 'components/uikit'
import Image from 'next/image'
import { useHomepageStats } from 'state/homepage/hooks'

const DefiRedefined = () => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()
  const switchNetwork = useSelectChain()
  const { push } = useRouter()

  const randomImage = useMemo(() => {
    // this function returns a random number between 1 and 10, which is the amount of bill images
    return Math.floor(Math.random() * (10 + 1))
  }, [])

  const handleNetworkSwitch = (chainId: SupportedChainId) => {
    push('/treasury-bills')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Join our growing network of')}{' '}
          {rawStats?.bondingPartnerCount && (
            <Text sx={styles.counterText}>
              <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={3} separator="," />{' '}
            </Text>
          )}
          {t('communities that are building project-owned liquidity through Treasury Bills.')}
        </Text>
        <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '0px'] }}>
          <Text sx={styles.availableOn}>{t('BILLS AVAILABLE ON')}</Text>
          {AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS].map((chainId) => {
            return (
              <Flex
                key={chainId}
                sx={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={() => handleNetworkSwitch(chainId)}
              >
                {grayIcons[chainId]}
              </Flex>
            )
          })}
        </Flex>
        <Link href="/treasury-bills" sx={{ textDecoration: 'none' }}>
          <Flex sx={styles.billImage}>
            <Box
              sx={{ ...styles.image, backgroundImage: `url('/images/homepage/treasury-bills-${randomImage}.jpg')` }}
            />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={styles.learnMoreButton}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link href="/treasury-bills" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '16px'], width: '138px' }}>{t('Buy a bill')}</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'lvl1' }} onClick={() => push(`/treasury-bills`)}>
          <Image
            src={`/images/homepage/treasury-bills-${randomImage}.jpg`}
            sx={styles.image}
            alt=""
            width={500}
            height={500}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined

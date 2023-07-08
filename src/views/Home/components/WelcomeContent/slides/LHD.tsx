import { styles } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'

// Components
import { Button, Flex, Link, Text } from 'components/uikit'

// Hooks
import { useHomepageStats } from 'state/homepage/hooks'

const LHD = ({ randomLHDImage }: { randomLHDImage: number }) => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()
  const { push } = useRouter()
  const { colorMode } = useThemeUI()

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={styles.slideTitle}>{t('Gain The Upper Hand')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Take your analysis to the next level with liquidity health data across')}{' '}
          {rawStats?.bondingPartnerCount && (
            <Text sx={styles.counterText}>
              <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={3} separator="," />{' '}
            </Text>
          )}
          {t('projects and counting.')}
        </Text>
        <Text sx={styles.availableOn}>{t('LIQUIDITY HEALTH DASHBOARD BETA NOW LIVE!')}</Text>
        <Link href="/liquidity-health">
          <Flex
            sx={{
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '25px',
              display: ['flex', 'flex', 'none'],
            }}
          >
            <Image src={`/images/lhd/liquidity-white.svg`} alt="liquidity health drop" width={20} height={25} />
            <Text sx={{ fontSize: '16px' }}>{t('Liquidity Health Dashboard')}</Text>
          </Flex>
          <Flex sx={{ ...styles.billImage, position: 'relative', justifyContent: 'start', marginTop: '10px' }}>
            <Image
              src={`/images/homepage/lhd/lhd-chart-mobile-${colorMode}.svg`}
              alt="liquidity health dashboard"
              sx={{
                ...styles.image,
                py: '0px',
                objectFit: 'cover',
                width: '300px',
                height: 'fit-content',
              }}
              width={150}
              height={150}
            />
            <Image
              src={`/images/homepage/lhd/lhd-card-${randomLHDImage}.svg`}
              alt="liquidity health dashboard"
              sx={{
                ...styles.image,
                position: 'absolute',
                top: '25px',
                left: '100px',
                height: '70px',
                borderRadius: '0px',
              }}
              width={400}
              height={400}
            />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={styles.learnMoreButton}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/liquidity-health-dashboard',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link href="/liquidity-health" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '16px'], width: '138px' }}>{t('Join beta')}</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '0', '0', '100%'], justifyContent: 'center' }}>
        <Flex
          sx={{ ...styles.imageWrapper, position: 'relative', padding: '0px' }}
          onClick={() => push(`/liquidity-health`)}
        >
          <Flex sx={{ gap: '5px', mb: '18px' }}>
            <Image
              src={`/images/homepage/lhd/lhd-drop-${colorMode}.svg`}
              alt="liquidity health drop"
              width={20}
              height={25}
            />
            <Text sx={{ fontSize: '20px' }}>{t('Liquidity Health Dashboard')}</Text>
          </Flex>
          <Image
            src={`/images/homepage/lhd/lhd-chart-${colorMode}.svg`}
            alt="liquidity health dashboard"
            sx={{ ...styles.image, border: '3px solid #FFB300', objectFit: 'cover', height: '90%', alignSelf: 'end' }}
            width={150}
            height={150}
          />
          <Image
            src={`/images/homepage/lhd/lhd-card-${randomLHDImage}.svg`}
            alt="liquidity health dashboard"
            sx={{
              ...styles.image,
              position: 'absolute',
              top: ['auto', 'auto', 'auto', '80px', '65px'],
              left: ['auto', 'auto', 'auto', '100px', '180px'],
              height: ['auto', 'auto', 'auto', '100px', '150px'],
            }}
            width={400}
            height={400}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LHD

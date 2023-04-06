import { styles } from './styles'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useRouter } from 'next/router'
import { Button, Flex, Link, Text } from 'components/uikit'
import useSelectChain from 'hooks/useSelectChain'
import Image from 'next/image'

const ApeSwapV3 = () => {
  const { t } = useTranslation()
  const switchNetwork = useSelectChain()
  const { push } = useRouter()

  const handleNetworkSwitch = (chainId: SupportedChainId) => {
    push('/add-liquidity')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={{ ...styles.slideTitle }}>{t('Apeswap Liquidity V3')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Insert text about Liquidity V3 here, please dont make it super long.')}
        </Text>
        <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '0px'] }}>
          <Text sx={styles.availableOn}>{t('AVAILABLE ON')}</Text>
          <Bnb
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleNetworkSwitch(SupportedChainId.BSC)}
          />
          <Poly
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleNetworkSwitch(SupportedChainId.POLYGON)}
          />
          <Tlos
            sx={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleNetworkSwitch(SupportedChainId.TLOS)}
          />
          <Arbitrum sx={{ cursor: 'pointer' }} onClick={() => handleNetworkSwitch(SupportedChainId.ARBITRUM_ONE)} />
        </Flex>
        <Link href="/add-liquidity" sx={{ textDecoration: 'none' }}>
          <Flex sx={styles.billImage}>
            <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage/add-liquidity-0.png')` }} />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={{ ...styles.learnMoreButton }}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link href="/add-liquidity" sx={{ textDecoration: 'none' }}>
            <Button sx={{ fontSize: ['14px', '14px', '16px'], minWidth: ['140px', '140px'] }}>
              {t('Add liquidity')}
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'none' }} onClick={() => push(`/treasury-bills`)}>
          <Image src="/images/homepage/add-liquidity-0.png" sx={styles.image} alt="" width={500} height={500} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ApeSwapV3

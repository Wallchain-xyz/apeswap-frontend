import React from 'react'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useTranslation } from 'contexts/Localization'
import styles from './styles'
import { useRouter } from 'next/router'
import useModal from 'hooks/useModal'
import { Flex, Link, Svg, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import DexSettings from 'components/DexSettings'
import SquidBridge from '../SquidBridge/SquidBridge'
import ZapSlippage from '../ZapSlippage'

interface DexNavProps {
  zapSettings?: boolean
}

const DexNav: React.FC<DexNavProps> = ({ zapSettings }) => {
  const BRIDGE_SUPPORTED_CHAINS = [
    SupportedChainId.BSC,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.POLYGON,
    SupportedChainId.MAINNET,
  ]
  const { t } = useTranslation()
  const { pathname, push } = useRouter()
  const { chainId } = useWeb3React()
  const [onBridgeModal] = useModal(<SquidBridge />)

  const onLiquidity =
    pathname?.includes('add-liquidity') ||
    pathname?.includes('liquidity') ||
    pathname?.includes('remove') ||
    pathname?.includes('find') ||
    pathname?.includes('zap') ||
    pathname?.includes('migrate') ||
    pathname?.includes('unstake')

  const [onPresentSettingsModal] = useModal(<DexSettings />)
  const [onPresentZapSettingsModal] = useModal(<ZapSlippage />)
  // const [onPresentModal] = useModal(<MoonPayModal />)

  const handleSwitch = () => {
    push(
      pathname.includes('/v3-swap')
        ? 'https://dex.apeswap.finance/swap'
        : pathname.includes('/v3-add-liquidity')
          ? 'https://dex.apeswap.finance/add-liquidity'
          : 'https://dex.apeswap.finance/liquidity',
    )
  }

  return (
    <Flex sx={styles.dexNavContainer}>
      <Flex sx={{ ...styles.navLinkContainer, justifyContent: 'flex-start' }}>
        <Text
          size="14px"
          variant="link"
          sx={{
            ...styles.navLink,
            color: !pathname?.includes('swap') && 'textDisabled',
            mr: '20px',
          }}
          onClick={() => push('/v3-swap')}
          id="swap-link"
        >
          {t('Swap')}
        </Text>
        <Text
          size="14px"
          variant="link"
          sx={{
            ...styles.navLink,
            color: !onLiquidity && 'textDisabled',
          }}
          onClick={() => push('/v3-add-liquidity')}
          id="liquidity-link"
          className="liquidity"
        >
          {t('Liquidity')}
        </Text>
      </Flex>
      <Flex sx={styles.navIconContainer}>
        <Flex sx={{ width: '90px', justifyContent: 'space-between', mt: '5px' }}>
          <Link href="?modal=tutorial">
            <Svg icon="quiz" />
          </Link>
          <Flex
            sx={styles.iconCover}
            onClick={
              BRIDGE_SUPPORTED_CHAINS.includes(chainId as number)
                ? onBridgeModal
                : () => window.open('https://jumper.exchange', '_blank')
            }
          >
            <Svg icon="bridge" />
          </Flex>
          <Flex
            onClick={zapSettings ? onPresentZapSettingsModal : onPresentSettingsModal}
            sx={{ cursor: 'pointer', mb: '5px' }}
          >
            <Svg icon="cog" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DexNav

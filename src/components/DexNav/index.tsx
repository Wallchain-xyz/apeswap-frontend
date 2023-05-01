// import track from 'utils/track'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
// import MoonPayModal from 'views/Topup/MoonpayModal'
// import SettingsModal from '../../../../components/Menu/GlobalSettings/SettingsModal'
import styles from './styles'
import { useRouter } from 'next/router'
import useModal from 'hooks/useModal'
import { Flex, Link, Svg, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import { Switch } from 'theme-ui'
import DexSettings from 'components/DexSettings'
import SquidBridge from '../SquidBridge/SquidBridge'

interface DexNavProps {
  zapSettings?: boolean
}

const DexNav: React.FC<DexNavProps> = ({ zapSettings }) => {
  const BRIDGE_SUPPORTED_CHAINS = [SupportedChainId.BSC, SupportedChainId.ARBITRUM_ONE, SupportedChainId.POLYGON, SupportedChainId.MAINNET]
  const { t } = useTranslation()
  const { pathname, push, asPath } = useRouter()
  const { chainId } = useWeb3React()
  const [onBridgeModal] = useModal(<SquidBridge />)

  const v2Flag = pathname.includes('/v2')
  const swapFlag = pathname.includes('/swap')

  const onLiquidity =
    pathname?.includes('add-liquidity') ||
    pathname?.includes('liquidity') ||
    pathname?.includes('remove') ||
    pathname?.includes('find') ||
    pathname?.includes('zap') ||
    pathname?.includes('migrate') ||
    pathname?.includes('unstake')

  const [onPresentSettingsModal] = useModal(<DexSettings />)
  // const [onPresentModal] = useModal(<MoonPayModal />)

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
            ml: '5px',
          }}
          onClick={() => push('/swap')}
          id="swap-link"
        >
          {t('Swap')}
        </Text>
        {chainId && [SupportedChainId.BSC, SupportedChainId.POLYGON].includes(chainId) && (
          <Text
            size="14px"
            variant="link"
            sx={{
              ...styles.navLink,
              color: !onLiquidity && 'textDisabled',
            }}
            onClick={() => push(SupportedChainId.MAINNET ? '/add-liquidity' : '/zap')}
            id="liquidity-link"
            className="liquidity"
          >
            {t('Liquidity')}
          </Text>
        )}
      </Flex>
      <Flex sx={styles.navIconContainer}>
        {/* <RunFiatButton
          sx={{ marginRight: '2px', width: '20px' }}
          mini
          t={t}
          runFiat={onPresentModal}
          track={track}
          position="DEX"
          chainId={chainId}
        />
        <CogIcon sx={{ cursor: 'pointer' }} onClick={onPresentSettingsModal} /> */}
        <Flex
          onClick={() => push(pathname.includes('/v2') ? '/add-liquidity' : '/add-liquidity/v2')}
          sx={{
            position: 'relative',
            mr: '10px',
            height: 'fit-content',
            minWidth: 'fit-content',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <Text
            size="13px"
            weight={700}
            color="primaryBright"
            sx={{ position: 'absolute', zIndex: 1, right: v2Flag ? 3 : 11, mt: '2px' }}
          >
            {v2Flag ? 'V2' : 'V3'}
          </Text>
          <Switch
            onChange={() => push(pathname.includes('/v2') ? '/add-liquidity' : '/add-liquidity/v2')}
            checked={!v2Flag}
            sx={{
              mr: '0px',
              width: '50px',
              borderRadius: '10px',
              backgroundColor: 'yellow',
              '& > div': {
                transform: 'translateX(0%)',
              },
              'input:checked ~ &': {
                background: 'linear-gradient(90deg, rgba(161, 101, 82, 1) 0%, rgba(255, 179, 0, 1)) 100%',
                '> div': {
                  transform: 'translateX(28px)',
                },
              },
            }}
          />
        </Flex>
        <Flex sx={{ width: '90px', justifyContent: 'space-between', mt: '5px' }}>
          <Link href="?modal=tutorial">
            <Svg icon="quiz" />
          </Link>
          <Flex
            sx={styles.iconCover}
            onClick={
              BRIDGE_SUPPORTED_CHAINS.includes(chainId as number)
                ? onBridgeModal
                : () => window.open('https://app.multichain.org/#/router', '_blank')
            }
          >
            <Svg icon="bridge" />
          </Flex>
          <Flex onClick={onPresentSettingsModal} sx={{ cursor: 'pointer', mb: '5px' }}>
            <Svg icon="cog" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(DexNav)

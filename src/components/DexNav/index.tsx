// import track from 'utils/track'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
// import MoonPayModal from 'views/Topup/MoonpayModal'
// import SettingsModal from '../../../../components/Menu/GlobalSettings/SettingsModal'
import styles from './styles'
import { useRouter } from 'next/router'
import useModal from 'hooks/useModal'
import { Flex, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'

interface DexNavProps {
  zapSettings?: boolean
}

const DexNav: React.FC<DexNavProps> = ({ zapSettings }) => {
  const { t } = useTranslation()
  const { pathname, push } = useRouter()
  const { chainId } = useWeb3React()

  const onLiquidity =
    pathname?.includes('add-liquidity') ||
    pathname?.includes('liquidity') ||
    pathname?.includes('remove') ||
    pathname?.includes('find') ||
    pathname?.includes('zap') ||
    pathname?.includes('migrate') ||
    pathname?.includes('unstake')

  // const [onPresentSettingsModal] = useModal(<SettingsModal zapSettings={zapSettings} />)
  // const [onPresentModal] = useModal(<MoonPayModal />)

  return (
    <Flex sx={styles.dexNavContainer}>
      <Flex sx={{ ...styles.navLinkContainer, justifyContent: 'flex-start' }}>
        <Text
          size="14px"
          sx={{
            ...styles.navLink,
            color: !pathname?.includes('swap') && 'textDisabled',
            mr: '30px',
          }}
          onClick={() => push('/swap')}
          id="swap-link"
        >
          {t('Swap')}
        </Text>
        <Text
          size="14px"
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
      </Flex>
      <Link href="/add-liquidity/v2">v2</Link>
      <Link href="/add-liquidity">v3</Link>

      <Flex sx={{ ...styles.navIconContainer }}>
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
      </Flex>
    </Flex>
  )
}

export default React.memo(DexNav)

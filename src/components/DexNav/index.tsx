import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styles from './styles'
import { useRouter } from 'next/router'
import useModal from 'hooks/useModal'
import { Flex, Link, Svg, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import DexSettings from 'components/DexSettings'
import ZapSlippage from '../ZapSlippage'
import { ChainId, DEX_ONLY_CHAINS } from 'config/constants/chains'

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

  const [onPresentSettingsModal] = useModal(<DexSettings />)
  const [onPresentZapSettingsModal] = useModal(<ZapSlippage />)

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
          onClick={() => push('/swap')}
          id="swap-link"
        >
          {t('Swap')}
        </Text>
        {!DEX_ONLY_CHAINS.includes(chainId as ChainId) && (
          <Text
            size="14px"
            variant="link"
            sx={{
              ...styles.navLink,
              color: !onLiquidity && 'textDisabled',
            }}
            onClick={() => push('/zap')}
            id="liquidity-link"
            className="liquidity"
          >
            {t('Liquidity')}
          </Text>
        )}
      </Flex>
      <Flex sx={styles.navIconContainer}>
        <Flex sx={{ width: '60px', justifyContent: 'space-between', mt: '5px' }}>
          <Link href="?modal=tutorial">
            <Svg icon="quiz" />
          </Link>
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

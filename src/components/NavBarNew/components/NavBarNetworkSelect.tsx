import { SupportedChainId } from '@ape.swap/sdk-core'
import { isSupportedChain } from 'utils'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useTranslation } from 'contexts/Localization'

// Components
import { Flex, Svg, Text } from 'components/uikit'
import NetworkDropdown from './NetworkDropdown'

// Constants
import { NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'
import { styles } from '../styles'

const NavBarNetworkSelect = () => {
  const { chainId } = useWeb3React()
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { t } = useTranslation()

  const isSupported = isSupportedChain(chainId)

  return (
    <Flex
      onClick={() => setIsHovered(!isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={styles.networkSelectContainer}
    >
      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        <Svg
          icon={!chainId ? NETWORK_ICONS[SupportedChainId.BSC] : isSupported ? NETWORK_ICONS[chainId] : 'error'}
          width="25px"
        />
        <Text sx={styles.networkSelectorText}>
          {!chainId
            ? NETWORK_LABEL[SupportedChainId.BSC]
            : isSupported
            ? NETWORK_LABEL[chainId]?.toUpperCase()
            : t('Unsupported')}{' '}
        </Text>
      </Flex>
      <Svg icon="navCaret" width="8px" color="text" direction={isHovered ? 'up' : 'down'} />
      <NetworkDropdown isVisible={isHovered} />
    </Flex>
  )
}

export default NavBarNetworkSelect

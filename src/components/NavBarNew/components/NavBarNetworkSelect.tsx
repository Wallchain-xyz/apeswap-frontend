import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Text } from 'components/uikit'
import { NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import { Spinner } from 'theme-ui'
import { isSupportedChain } from 'utils'
import NetworkDropdown from './NetworkDropdown'

const NavBarNetworkSelect = () => {
  const { chainId } = useWeb3React()
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [requestPending, setRequestPending] = useState<boolean>(false)
  const { t } = useTranslation()

  const isSupported = isSupportedChain(chainId)

  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        '&:hover': { bg: 'navbar' },
        height: '34px',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '7px',
        borderRadius: '6px',
        position: 'relative',
      }}
    >
      <Flex sx={{ width: '100%', alignItems: 'center' }}>
        {requestPending ? (
          <Spinner size={22} />
        ) : (
          <Svg
            icon={!chainId ? NETWORK_ICONS[SupportedChainId.BSC] : isSupported ? NETWORK_ICONS[chainId] : 'error'}
            width="25px"
          />
        )}
        <Text margin="0px 7.5px" sx={{ lineHeight: '0px', fontSize: '14px' }}>
          {requestPending
            ? t('Requesting')
            : !chainId
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

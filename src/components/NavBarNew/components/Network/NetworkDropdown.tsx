// Components
import { Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useThemeUI } from 'theme-ui'
import useSelectChain from 'hooks/useSelectChain'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedNetwork } from 'state/user/reducer'

// Constants
import { MAINNET_CHAINS, NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'

const NetworkDropdown = ({
  isVisible,
  onSetRequestPending,
}: {
  isVisible: boolean
  onSetRequestPending?: (reqFlag: boolean) => void
}) => {
  const selectChain = useSelectChain()
  const dispatch = useAppDispatch()
  const { chainId: selectedChainId } = useWeb3React()
  const { colorMode } = useThemeUI()

  return (
    <Flex
      sx={{
        ...styles.networkDropdownMainContainer,
        display: isVisible ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
      }}
    >
      {MAINNET_CHAINS.map((chainId: SupportedChainId) => {
        return (
          <Flex
            fullWidth
            key={chainId}
            sx={styles.networkOptionContainer}
            onClick={async () => {
              if (onSetRequestPending) {
                onSetRequestPending(true)
                selectChain(chainId)
                  .then(() => onSetRequestPending(false))
                  .catch(() => onSetRequestPending(false))
              } else {
                selectChain(chainId)
              }
              dispatch(updateSelectedNetwork({ chainId: chainId }))
            }}
          >
            <Flex sx={styles.networkOptionContent}>
              <Svg icon={NETWORK_ICONS[chainId]} width="27.5px" />
              <Text weight="400" size="15px" ml="10px" sx={{ lineHeight: '0px' }}>
                {NETWORK_LABEL[chainId]}
              </Text>
              <Flex sx={{ ml: 'auto' }}>
                {selectedChainId === chainId && <Svg icon="successOutline" width="18px" />}
              </Flex>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default NetworkDropdown

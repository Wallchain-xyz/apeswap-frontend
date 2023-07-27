import { SupportedChainId } from '@ape.swap/sdk-core'

// Constants
import { MAINNET_CHAINS, NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useThemeUI } from 'theme-ui'
import useSelectChain from 'hooks/useSelectChain'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedNetwork } from 'state/user/reducer'

// Components
import { Flex, Svg, Text } from 'components/uikit'

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
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '35px',
        right: '0px',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
        width: '220px',
        px: '15px',
        py: '10px',
        borderRadius: 'normal',
        backdropFilter: 'blur(15px)',
      }}
    >
      {MAINNET_CHAINS.map((chainId: SupportedChainId) => {
        return (
          <Flex
            fullWidth
            key={chainId}
            sx={{
              borderRadius: '10px',
              margin: '5px 0px',
              padding: '0px 10px',
              height: '45px',
              '&:hover': { bg: 'white3' },
            }}
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
            <Flex
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
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

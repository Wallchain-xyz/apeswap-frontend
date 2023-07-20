import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Link, Modal, Svg, Text } from 'components/uikit'
import { MAINNET_CHAINS, NETWORK_ICONS, NETWORK_LABEL } from 'config/constants/chains'
import useSelectChain from 'hooks/useSelectChain'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedNetwork } from 'state/user/reducer'

const NetworkModal = ({
  onDismiss,
  onSetRequestPending,
}: {
  onDismiss: () => void
  onSetRequestPending?: (reqFlag: boolean) => void
}) => {
  const selectChain = useSelectChain()
  const dispatch = useAppDispatch()
  const { chainId: selectedChainId } = useWeb3React()
  return (
    <Modal title="Network" onDismiss={onDismiss}>
      <Flex sx={{ flexDirection: 'column' }}>
        {MAINNET_CHAINS.map((chainId: SupportedChainId) => {
          return (
            <Button
              fullWidth
              variant={selectedChainId === chainId ? 'secondary' : 'tertiary'}
              key={chainId}
              sx={{
                margin: '5px 0px',
                height: '45px',
                alignItems: 'center',
                justifyContent: 'center',
                background: selectedChainId === chainId ? 'white2' : 'white4',
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
                onDismiss()
              }}
            >
              <Flex
                sx={{
                  width: 'fit-content',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Svg icon={NETWORK_ICONS[chainId]} width="27.5px" />
                <Text weight="normal" size="15px" ml="10px" sx={{ lineHeight: '0px' }}>
                  {NETWORK_LABEL[chainId]}
                </Text>
              </Flex>
            </Button>
          )
        })}
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '10px' }}>
          <Link
            href="https://jumper.exchange"
            sx={{ fontWeight: 500, textDecoration: 'none' }}
            target="_blank"
          >
            Bridge Tokens <Svg icon="caret" direction="right" />
          </Link>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default NetworkModal

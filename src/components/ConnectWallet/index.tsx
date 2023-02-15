import { Button, Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import useModal from 'hooks/useModal'
import ConnectWalletModal from './ConnectWalletModal'

const ConnectWalletButton = ({ navBarFlag }: { navBarFlag?: boolean }) => {
  const [onPresentWalletConnectModal] = useModal(
    <ConnectWalletModal onDismiss={() => null} />,
    true,
    true,
    'ConnectWalletModal',
  )
  const { t } = useTranslation()
  return (
    <Flex sx={{ height: '100%', alignItems: 'center' }}>
      <Button
        fullWidth={!navBarFlag}
        onClick={onPresentWalletConnectModal}
        sx={{ height: navBarFlag ? '32.5px' : '40px', padding: '10px 10px', alignItems: 'center' }}
      >
        <Text color="primaryBright" size="14px" weight={600} sx={{ mt: '1px' }}>
          {t('Connect')}
        </Text>
      </Button>
    </Flex>
  )
}

export default ConnectWalletButton

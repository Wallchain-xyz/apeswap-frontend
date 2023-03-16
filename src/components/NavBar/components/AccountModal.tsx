import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'
import { Link } from 'theme-ui'
import { getEtherscanLink } from 'utils'

const AccountModal = ({ onDismiss }: { onDismiss: () => void }) => {
  const dispatch = useAppDispatch()
  const { account, chainId, connector } = useWeb3React()
  const { t } = useTranslation()
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }, [connector])
  return (
    <Modal minWidth="fit-content" title="Your Wallet">
      <Text weight={700} size="18px" sx={{ margin: '20px 0px' }}>
        {account}
      </Text>
      <Flex sx={{ margin: '10px 0px' }}>
        <Link
          href={getEtherscanLink(account || '', 'address', chainId ?? SupportedChainId.BSC)}
          target="_blank"
          sx={{ ':hover': { textDecoration: 'none' }, ':active': { textDecoration: 'none' } }}
        >
          <Text mr="5px">{t('View on Explorer')}</Text>
          <Svg icon="external" />
        </Link>
        <Text
          sx={{ cursor: 'pointer' }}
          onClick={() => navigator.clipboard.writeText(JSON.stringify(account))}
          ml="20px"
          mr="5px"
        >
          {t('Copy Address')}
          <Svg icon="copy" width={12} />
        </Text>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '30px' }}>
        <Button
          size="sm"
          onClick={() => {
            disconnect(), dispatch(updateSelectedWallet({ wallet: undefined })), onDismiss()
          }}
          sx={{ alignSelf: 'center' }}
          variant="secondary"
        >
          <Text color="yellow">Logout</Text>
        </Button>
      </Flex>
    </Modal>
  )
}

export default AccountModal

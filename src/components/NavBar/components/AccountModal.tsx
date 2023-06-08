import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'
import { Link } from 'theme-ui'
import { getEtherscanLink } from 'utils'

const AccountModal = ({ onDismiss }: { onDismiss: () => void }) => {
  const dispatch = useAppDispatch()
  const { account, chainId, connector } = useWeb3React()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }, [connector])
  return (
    <Modal title="Your Wallet" sx={{ width: ['310px', '310px', '310px', '520px'] }}>
      <Text weight={700} size="18px" sx={{ margin: '20px 0px' }}>
        {isMobile ? `${account?.slice(0, 15)}....${account?.slice(account.length - 4, account.length)}` : account}
      </Text>
      <Flex sx={{ margin: '10px 0px' }}>
        <Link
          href={getEtherscanLink(account || '', 'address', chainId ?? SupportedChainId.BSC)}
          target="_blank"
          sx={{ ':hover': { textDecoration: 'none' }, ':active': { textDecoration: 'none' } }}
        >
          <Text sx={{ mr: '5px', fontSize: '14px' }}>{t('View on Explorer')}</Text>
          <Svg icon="external" />
        </Link>
        <Flex onClick={() => navigator.clipboard.writeText(account || '')} sx={{ cursor: 'pointer' }}>
          <Text sx={{ ml: '20px', mr: '5px', fontSize: '14px' }}>{t('Copy Address')}</Text>
          <Svg icon="copy" width={12} />
        </Flex>
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '25px' }}>
        <Button
          size="sm"
          onClick={() => {
            disconnect(), dispatch(updateSelectedWallet({ wallet: undefined })), onDismiss()
          }}
          sx={{ alignSelf: 'center', height: '28px' }}
          variant="secondary"
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  )
}

export default AccountModal

import React, { useCallback, useState } from 'react'
import { SupportedChainId, Currency, Token } from '@ape.swap/sdk-core'
import { Button, Text, Flex, Modal, Svg } from 'components/uikit'
import { ArrowUpCircle } from 'react-feather'
import { useTranslation } from 'contexts/Localization'
import { getEtherscanLink } from 'utils'
import { Link, Spinner } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { Pair } from '@ape.swap/v2-sdk'
import useCurrencyLogoURIs from 'lib/hooks/useCurrencyLogoURIs'

export function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '15px 0px',
        borderRadius: '10px',
      }}
    >
      <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={150} />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          background: 'white3',
          padding: '10px 20px',
          margin: '10px',
          borderRadius: '10px',
        }}
      >
        <Text size="20px" weight={500} margin="5px 0px" sx={{ textAlign: 'center' }}>
          {t('Waiting For Confirmation')}
        </Text>
        <Flex margin="10px 0px">
          <Text weight={700} sx={{ textAlign: 'center' }}>
            {pendingText}
          </Text>
        </Flex>
        <Text size="14px" weight={400}>
          {t('Confirm this transaction in your wallet')}
        </Text>
      </Flex>
    </Flex>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  currencyToAdd?: Currency | undefined
  LpToAdd?: Pair
}) {
  const { provider, connector, chainId } = useWeb3React()

  const [success, setSuccess] = useState<boolean | undefined>()

  const token: Token | undefined = currencyToAdd?.wrapped
  const { t } = useTranslation()

  const logoURL = useCurrencyLogoURIs(token)[0]

  const addToken = useCallback(() => {
    if (!token?.symbol || !connector.watchAsset) return
    connector
      .watchAsset({
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals,
        image: logoURL,
      })
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false))
  }, [connector, logoURL, token])

  return (
    <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ArrowUpCircle strokeWidth={1} size={97} color="rgba(255, 179, 0, 1)" />
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
          <Text size="20px">{t('Transaction Submitted')}</Text>
          {chainId && hash && (
            <Link mt="10px" color="text" href={getEtherscanLink(hash, 'transaction', chainId)}>
              {t('View on explorer')}
            </Link>
          )}
          {currencyToAdd && connector.watchAsset && (
            <Button variant="tertiary" mt="20px" onClick={addToken}>
              <Flex>
                <Text>{t(`Add %symbol% to Metamask`, { symbol: currencyToAdd.symbol || '' })}</Text>
                <Svg icon="metamask" width="16px" />
              </Flex>{' '}
            </Button>
          )}
          <Button fullWidth onClick={onDismiss} style={{ height: '50px', fontSize: '20px' }} mt="20px">
            {t('Close')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Flex variant="flex.dexContainer" sx={{ padding: '0px' }}>
      <div>{topContent()}</div>
      <div>{bottomContent()}</div>
    </Flex>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Flex>
      <Flex justify="center">
        <Svg icon="error" />
        <Text color="error" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </Text>
        <Flex justifyContent="center" pt="24px">
          <Button onClick={onDismiss}>{t('Dismiss')}</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface ConfirmationModalProps {
  title: string
  onDismiss: () => void
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Flex sx={{ width: '420px' }}>
      <Modal title={title} onDismiss={handleDismiss} maxWidth="100%">
        <Flex sx={{ width: '380px', maxWidth: '100%' }}>
          {attemptingTxn ? (
            <ConfirmationPendingContent pendingText={pendingText} />
          ) : hash ? (
            <TransactionSubmittedContent hash={hash} onDismiss={onDismiss} currencyToAdd={currencyToAdd} />
          ) : (
            content()
          )}
        </Flex>
      </Modal>
    </Flex>
  )
}

export default TransactionConfirmationModal

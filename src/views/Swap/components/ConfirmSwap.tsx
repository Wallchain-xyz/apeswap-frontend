import CurrencyLogo from 'components/CurrencyLogo'
import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCallback } from 'react'
import RouteDetails from './RouteDetails'
import { Route } from '@lifi/sdk'
import { useCurrency } from '../../../hooks/Tokens'
import { humanOutputAmount, parseOutputAmount } from '../utils'
import styles from './styles'
import { useAppDispatch } from 'state/hooks'
import { routingApi } from 'state/routing/slice'

const ConfirmSwap = ({
                       selectedRoute,
                       attemptingTxn,
                       txHash,
                       swapErrorMessage,
                       onConfirm,
                       onDismiss,
  fee
                     }: {
  selectedRoute: Route
  attemptingTxn: boolean
  txHash: string | undefined
  swapErrorMessage: string | undefined
  onConfirm?: () => void
  onDismiss: () => void
  fee: number
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currencyIn = useCurrency(selectedRoute?.fromToken?.address)
  const currencyOut = useCurrency(selectedRoute?.toToken?.address)
  const fullInputAmount = parseOutputAmount(selectedRoute?.fromAmount ?? '', selectedRoute?.fromToken?.decimals)
  const fullExpectedOutputAmount = parseOutputAmount(selectedRoute?.toAmount, selectedRoute?.toToken?.decimals)

  const shortInputAmount = humanOutputAmount(selectedRoute?.fromAmount, selectedRoute?.fromToken?.decimals)
  const shortExpectedOutputAmount = humanOutputAmount(selectedRoute?.toAmount, selectedRoute?.toToken?.decimals)
  const minimumOut = humanOutputAmount(selectedRoute?.toAmountMin, selectedRoute?.toToken?.decimals)
  // text to show while loading
  const pendingText = `${t('Swapping')} ${shortInputAmount ?? ''} ${
    selectedRoute?.fromToken?.symbol ?? ''
  } for ${shortExpectedOutputAmount ?? ''} ${selectedRoute?.toToken?.symbol ?? ''}`

  const handleDismiss = useCallback(() => {
    if (swapErrorMessage?.includes('Exchange rate has changed!')) {
      // if the exchange rate has changed delete quotes and refetch them
      dispatch(routingApi.util.invalidateTags(['routes']))
      onDismiss()
    } else {
      onDismiss()
    }
  }, [dispatch, onDismiss, swapErrorMessage])

  return (
    <Modal
      title={swapErrorMessage?.includes('user rejected transaction') ?
        'Transaction Rejected'
        : swapErrorMessage?.includes('Exchange rate has changed!') ?
          'Rate Changed'
          : swapErrorMessage?.includes('transaction failed') ?
            'Transaction failed'
            :'Confirm Swap'}>
      <Flex sx={{ width: '420px', maxWidth: '100%', flexDirection: 'column' }}>
        {swapErrorMessage ? (
          <TransactionErrorContent
            onDismiss={handleDismiss}
            message={
              swapErrorMessage?.includes('INSUFFICIENT_OUTPUT_AMOUNT')
                ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
                : swapErrorMessage?.includes('user rejected transaction') ?
                  t('Did you reject the transaction? I thought you were an Ape!')
                  : swapErrorMessage?.includes('transaction failed') ?
                    t('It seems your transaction failed. Please check your tokens, amounts and slippage, then try again')
                    : swapErrorMessage
            }
          />
        ) : attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={handleDismiss} />
        ) : (
          <>
            <Flex sx={styles.inputContainer}>
              <Text>{fullInputAmount}</Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencyIn} />
                <Text ml='10px'>{currencyIn?.symbol}</Text>
              </Flex>
            </Flex>
            <Flex sx={{ justifyContent: 'center' }}>
              <Flex sx={styles.container}>
                <Flex sx={styles.subContainer}>
                  <Svg icon='arrow' color='primaryBright' />
                </Flex>
              </Flex>
            </Flex>
            <Flex sx={styles.outputContainer}>
              <Text>{fullExpectedOutputAmount}</Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencyOut} />
                <Text ml='10px'>{currencyOut?.symbol}</Text>
              </Flex>
            </Flex>
            <RouteDetails route={selectedRoute} fee={fee}/>
            <Text size='14px' weight={300} sx={{ textAlign: 'center' }} margin='15px 0px'>
              Output is estimated. You will receive at least{' '}
              <span sx={{ fontWeight: 700 }}>
                {minimumOut} {currencyOut?.symbol}
              </span>{' '}
              or the transaction will be cancelled.
            </Text>
            <Button fullWidth onClick={onConfirm}>
              <Text color='primaryBright'>Confirm</Text>
            </Button>
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default ConfirmSwap

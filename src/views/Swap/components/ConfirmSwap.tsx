import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useMemo } from 'react'
import { InterfaceTrade } from 'state/routing/types'
import { computeRealizedPriceImpact } from 'utils/prices'
import TradeDetails from './TradeDetails'

const ConfirmSwap = ({
  trade,
  allowedSlippage,
  attemptingTxn,
  txHash,
  onConfirm,
  onDismiss,
}: {
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  attemptingTxn: boolean
  txHash: string | undefined
  onConfirm: () => void
  onDismiss: () => void
}) => {
  const { t } = useTranslation()
  const currencyIn = trade?.inputAmount.currency
  const currencyOut = trade?.outputAmount.currency
  const inputAmount = trade?.inputAmount
  const expectedOutputAmount = trade?.outputAmount
  const minimumOut = trade?.minimumAmountOut(allowedSlippage).toSignificant(6)
  // text to show while loading
  const pendingText = `${t('Swapping')} ${trade?.inputAmount?.toSignificant(6) ?? ''} ${
    trade?.inputAmount?.currency.symbol ?? ''
  } for ${trade?.outputAmount?.toSignificant(6) ?? ''} ${trade?.outputAmount?.currency.symbol ?? ''}`
  return (
    <Modal minWidth="300px" maxWidth="95%" title="Confirm Swap">
      <Flex sx={{ width: '420px', maxWidth: '100%', flexDirection: 'column' }}>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : txHash ? (
          <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} />
        ) : (
          <>
            <Flex
              sx={{
                justifyContent: 'space-between',
                height: '50px',
                background: 'white3',
                borderRadius: '10px',
                alignItems: 'center',
                padding: '0px 10px',
                transform: 'translate(0px, 10px)',
              }}
            >
              <Text>{inputAmount?.toSignificant(6)}</Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencyIn} />
                <Text ml="10px">{currencyIn?.symbol}</Text>
              </Flex>
            </Flex>
            <Flex sx={{ justifyContent: 'center' }}>
              <Flex
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '30px',
                  width: '30px',
                  borderRadius: '15px',
                  background: 'white2',
                  zIndex: 10,
                }}
              >
                <Flex
                  sx={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '10px',
                    background: 'yellow',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Svg icon="arrow" />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              sx={{
                justifyContent: 'space-between',
                height: '50px',
                background: 'white3',
                borderRadius: '10px',
                alignItems: 'center',
                padding: '0px 10px',
                transform: 'translate(0px, -10px)',
              }}
            >
              <Text>{expectedOutputAmount?.toSignificant(6)}</Text>
              <Flex sx={{ alignItems: 'center' }}>
                <CurrencyLogo currency={currencyOut} />
                <Text ml="10px">{currencyOut?.symbol}</Text>
              </Flex>
            </Flex>
            <TradeDetails trade={trade} allowedSlippage={allowedSlippage} />
            <Text size="14px" weight={300} sx={{ textAlign: 'center' }} margin="15px 0px">
              Output is estimated. You will receive at least{' '}
              <span sx={{ fontWeight: 700 }}>
                {minimumOut} {currencyOut?.symbol}
              </span>{' '}
              or the transaction will be cancelled.
            </Text>
            <Button fullWidth onClick={onConfirm}>
              <Text>Confirm</Text>
            </Button>
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default ConfirmSwap

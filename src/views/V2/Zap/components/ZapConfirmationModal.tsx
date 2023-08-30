import { Modal } from 'components/uikit'
import React, { useEffect } from 'react'
import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { useTranslation } from 'contexts/Localization'
import { ChainId, getChainInfo } from 'config/constants/chains'
import { useZapState } from 'state/zap/hooks'
import { useWeb3React } from '@web3-react/core'
import { MergedZap } from 'state/zap/actions'
import { ZapVersion } from '@ape.swap/apeswap-lists'

export interface ZapConfirmationModalProps {
  title?: string
  onDismiss: () => void
  txHash?: string
  zapVersion?: ZapVersion
  zap?: MergedZap
  zapErrorMessage?: string
  inputCurrencyAmount?: string
  inputCurrencySymbol?: string
  toTokenAmount?: string
  outputCurrencySymbol?: string
}

const ZapConfirmationModal: React.FC<ZapConfirmationModalProps> = ({
  zap,
  zapVersion = ZapVersion.ZapV1,
  title,
  onDismiss,
  txHash,
  zapErrorMessage,
  inputCurrencyAmount,
  inputCurrencySymbol,
  toTokenAmount,
  outputCurrencySymbol,
}) => {
  const { currencyIn, pairOut } = zap ?? {}
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const { typedValue } = useZapState()
  const chainParams = getChainInfo(chainId as ChainId)
  const currencyInputSymbol =
    currencyIn?.currency?.symbol === 'ETH' ? chainParams?.nativeCurrency.symbol : currencyIn?.currency?.symbol

  const pendingTextZapV1 = `Zapping ${typedValue || inputCurrencyAmount} ${currencyInputSymbol || inputCurrencySymbol}
   into ${pairOut?.liquidityMinted?.toSignificant(4)} ${pairOut?.pair?.token0?.wrapped?.symbol}-${
    pairOut?.pair?.token1?.wrapped?.symbol
  } LP`

  const pendingTextWido = `Zapping ${inputCurrencyAmount} ${inputCurrencySymbol}
  into ${toTokenAmount} ${outputCurrencySymbol} LP`

  const pendingText = zapVersion === ZapVersion.Wido ? pendingTextWido : pendingTextZapV1

  return (
    <Modal
      title={title}
      onDismiss={onDismiss}
      sx={{
        zIndex: 120,
        overflowY: 'auto',
        maxHeight: 'calc(100% - 30px)',
        width: '380px',
      }}
    >
      {zapErrorMessage ? (
        <TransactionErrorContent
          onDismiss={onDismiss}
          message={
            zapErrorMessage.includes('INSUFFICIENT')
              ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
              : zapErrorMessage.includes('user rejected transaction')
              ? t('Transaction rejected')
              : zapErrorMessage
          }
        />
      ) : !txHash ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : (
        <TransactionSubmittedContent hash={txHash} onDismiss={onDismiss} LpToAdd={pairOut?.pair ?? undefined} />
      )}
    </Modal>
  )
}

export default React.memo(ZapConfirmationModal)

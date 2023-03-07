/** @jsxImportSource theme-ui */
import { Modal } from 'components/uikit'
import React from 'react'
import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { useTranslation } from 'contexts/Localization'
import { ZapInput } from '@ape.swap/v2-zap-sdk'
import { CHAIN_PARAMS, getChainInfo } from 'config/constants/chains'
import { useZapState } from 'state/zap/hooks'
import { useWeb3React } from '@web3-react/core'

export interface ZapConfirmationModalProps {
  title?: string
  onDismiss: () => void
  txHash?: string
  zap: ZapInput
  zapErrorMessage?: string
}

const modalProps = {
  sx: {
    zIndex: 12,
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '420px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const ZapConfirmationModal: React.FC<ZapConfirmationModalProps> = ({
  zap,
  title,
  onDismiss,
  txHash,
  zapErrorMessage,
}) => {
  const { currencyIn, pairOut } = zap
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const { typedValue } = useZapState()
  const chainParams = getChainInfo(chainId)
  const currencyInputSymbol =
    currencyIn?.currency?.symbol === 'ETH' ? chainParams?.nativeCurrency.symbol : currencyIn?.currency?.symbol

  const pendingText = `Zapping ${typedValue} ${currencyInputSymbol}
   into ${pairOut?.liquidityMinted?.toSignificant(4)} ${pairOut?.pair?.token0?.wrapped?.symbol}-${
    pairOut?.pair?.token1?.wrapped?.symbol
  } LP`

  return (
    <Modal title={title} {...modalProps} onDismiss={onDismiss}>
      {zapErrorMessage ? (
        <TransactionErrorContent
          onDismiss={onDismiss}
          message={
            zapErrorMessage.includes('INSUFFICIENT')
              ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
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

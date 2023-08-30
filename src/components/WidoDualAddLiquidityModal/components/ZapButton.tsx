import { FC, useState } from 'react'

// Components
import { Button } from 'components/uikit'
import ZapConfirmationModal from 'views/V2/Zap/components/ZapConfirmationModal'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useSignTransaction } from 'state/transactions/hooks'
import useGetWidoTokenAllowance from 'state/zap/providers/wido/useGetWidoTokenAllowance'
import useModal from 'hooks/useModal'

// Utils
import track from 'utils/track'
import { utils } from 'ethers'

// Types
import { QuoteResult } from 'wido'
import { ZapVersion } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { TransactionType } from 'state/transactions/types'

enum ButtonActions {
  Approve = 'approve',
  Zap = 'zap',
}

interface ZapButtonProps {
  inputCurrencyAmount: string
  hasSufficientBal: boolean
  isWidoQuoteLoading: boolean
  widoQuote: QuoteResult | undefined | null
  inputTokenAddress: string
  inputTokenDecimals: number
  toTokenAddress: string
  inputCurrencySymbol: string
  lpTokenSymbol: string
  toChainId: SupportedChainId
  fromChainId: SupportedChainId
}

const ZapButton: FC<ZapButtonProps> = ({
  inputCurrencyAmount,
  hasSufficientBal,
  widoQuote,
  isWidoQuoteLoading,
  inputTokenAddress,
  inputTokenDecimals,
  toTokenAddress,
  inputCurrencySymbol,
  lpTokenSymbol,
  toChainId,
  fromChainId,
}) => {
  const [zapErrorMessage, setZapErrorMessage] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')

  const { t } = useTranslation()
  const { signTransaction } = useSignTransaction()

  const { requiresApproval, approveWidoSpender, isApproveWidoSpenderLoading } = useGetWidoTokenAllowance({
    inputTokenAddress,
    inputTokenDecimals,
    toTokenAddress,
    zapVersion: ZapVersion.Wido,
    toChainId,
    fromChainId,
    tokenAmount: inputCurrencyAmount,
  })

  const { to, data, value, isSupported: isWidoSupported = false, toTokenAmount = '0' } = widoQuote ?? {}

  const zapAmountOutput = utils.formatUnits(toTokenAmount, inputTokenDecimals)

  const [onPresentAddLiquidityModal] = useModal(
    <ZapConfirmationModal
      title={t('Confirm ZAP')}
      onDismiss={() => {
        setZapErrorMessage('')
        setTxHash('')
      }}
      txHash={txHash}
      zapErrorMessage={zapErrorMessage}
      inputCurrencySymbol={inputCurrencySymbol}
      inputCurrencyAmount={parseFloat(inputCurrencyAmount).toFixed(4)}
      toTokenAmount={parseFloat(zapAmountOutput).toFixed(4)}
      outputCurrencySymbol={lpTokenSymbol}
      zapVersion={ZapVersion.Wido}
    />,
    true,
    true,
    'widoZapConfirmationModal',
  )

  const getButtonLabel = (): string => {
    switch (true) {
      case inputCurrencyAmount === '':
        return t('Enter an amount')
      case !hasSufficientBal:
        return t('Insufficient Balance')
      default:
        return t('Zap Liquidity')
    }
  }

  const handleConfirmZap = () => {
    onPresentAddLiquidityModal()
    setZapErrorMessage('')
    signTransaction({ dataToSign: { to, data, value }, txInfo: { type: TransactionType.ZAP } })
      .then((txHash) => {
        setTxHash(txHash || '')
        track({
          event: 'zap',
          chain: fromChainId,
          data: {
            cat: 'liquidity',
            token1: inputCurrencySymbol,
            token2: lpTokenSymbol,
            amount: inputCurrencyAmount,
            usdAmount: toTokenAmount,
          },
        })
      })
      .catch((error: any) => {
        setZapErrorMessage(error.message)
        console.error(error)
      })
  }

  const buttonAction = {
    [ButtonActions.Zap]: {
      action: () => (isWidoSupported ? handleConfirmZap() : console.error('Error: Wido zap not supported')),
      isDisabled: !(Number(inputCurrencyAmount) > 0) || !hasSufficientBal || isWidoQuoteLoading,
      label: getButtonLabel(),
    },
    [ButtonActions.Approve]: {
      action: () => approveWidoSpender(),
      isDisabled: isApproveWidoSpenderLoading,
      label: `${t('Enable')} ${inputCurrencySymbol}`,
    },
  }

  const btnAction = requiresApproval ? ButtonActions.Approve : ButtonActions.Zap

  const { action, isDisabled, label } = buttonAction[btnAction]

  return (
    <Button
      fullWidth
      disabled={isDisabled}
      onClick={action}
      // TODO: add load state
    >
      {label}
    </Button>
  )
}

export default ZapButton

import { FC } from 'react'

// Components
import { Button } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useSignTransaction } from 'state/transactions/hooks'
import useGetWidoTokenAllowance from 'state/zap/providers/wido/useGetWidoTokenAllowance'

// Utils
import track from 'utils/track'

// Types
import { QuoteResult } from 'wido'
import { ZapVersion } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'

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
  lpPrincipalTokenSymbol: string
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
  lpPrincipalTokenSymbol,
  toChainId,
  fromChainId,
}) => {
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

  const { to, data, value, isSupported: isWidoSupported = false, toTokenAmount = '' } = widoQuote ?? {}

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

  const buttonAction = {
    [ButtonActions.Zap]: {
      action: () =>
        isWidoSupported
          ? signTransaction({ to, data, value })
              .then(() => {
                track({
                  event: 'zap',
                  chain: fromChainId,
                  data: {
                    cat: 'liquidity',
                    token1: inputCurrencySymbol,
                    token2: lpPrincipalTokenSymbol,
                    amount: inputCurrencyAmount,
                    usdAmount: toTokenAmount,
                  },
                })
              })
              .catch((error: any) => {
                console.error(error)
              })
          : console.error('Error: Wido zap not supported'),
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
    <Button fullWidth disabled={isDisabled} onClick={action}>
      {label}
    </Button>
  )
}

export default ZapButton

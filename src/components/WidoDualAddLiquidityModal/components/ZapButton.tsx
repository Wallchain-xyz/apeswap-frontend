import { FC } from 'react'

// Components
import { Button } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useSignTransaction } from 'state/transactions/hooks'

// Types
import { QuoteResult } from 'wido'

interface ZapButtonProps {
  inputCurrencyAmount: string
  hasSufficientBal: boolean
  isWidoQuoteLoading: boolean
  widoQuote: QuoteResult | undefined | null
}

const ZapButton: FC<ZapButtonProps> = ({ inputCurrencyAmount, hasSufficientBal, widoQuote, isWidoQuoteLoading }) => {
  const { t } = useTranslation()
  const { signTransaction } = useSignTransaction()

  const { to, data, value, isSupported: isWidoSupported = false } = widoQuote ?? {}

  const requireAllowanceApproval = false

  const getButtonLabel = () => {
    switch (true) {
      case inputCurrencyAmount === '':
        return t('Enter an amount')
      case !hasSufficientBal:
        return t('Insufficient Balance')
      default:
        return t('Zap Liquidity')
    }
  }

  const getButtonAction = () => {
    if (isWidoSupported && !isWidoQuoteLoading) {
      signTransaction({ to, data, value })
    }
    requireAllowanceApproval ? console.log('zap') : console.log('request auth')
  }

  return (
    <Button
      fullWidth
      disabled={!(Number(inputCurrencyAmount) > 0) || !hasSufficientBal || isWidoQuoteLoading}
      onClick={getButtonAction}
    >
      {getButtonLabel()}
    </Button>
  )
}

export default ZapButton

import { FC, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'

// Components
import DexPanel from 'components/DexPanel'
import { Modal } from 'components/uikit'
import { Flex } from 'theme-ui'

// Utils
import { maxAmountSpend } from 'utils/maxAmountSpend'

// Types
import { Field } from 'state/zap/actions'
import { Currency } from '@ape.swap/sdk-core'
import { Pricing } from 'components/DexPanel/types'

// Constants
const NATIVE_CURR_ID = 'ETH'

interface WidoDualAddLiquidityModalProps {
  onDismiss?: () => void
}

const WidoDualAddLiquidityModal: FC<WidoDualAddLiquidityModalProps> = ({ onDismiss }) => {
  const [inputCurrencyId, setInputCurrencyId] = useState<string>(NATIVE_CURR_ID)
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState<string>('')

  const { account } = useWeb3React()
  const { t } = useTranslation()

  const inputCurrency = useCurrency(inputCurrencyId)

  const handleCurrencySelect = (curr: Currency) => {
    console.log({ curr })
    setInputCurrencyId(curr.isToken ? curr.address : curr.isNative ? NATIVE_CURR_ID : '')
    setInputCurrencyAmount('0')
  }

  const inputCurrencyBalance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const inputCurrencyMaxSpend = maxAmountSpend(inputCurrencyBalance)

  const handleMaxInput = () => {
    setInputCurrencyAmount(inputCurrencyMaxSpend?.toExact() as string)
  }

  return (
    <Modal title={t('Liquidity')} onDismiss={onDismiss}>
      <Flex sx={{ marginTop: '30px' }}>
        <DexPanel
          value={inputCurrencyAmount}
          panelText="From:"
          currency={inputCurrency}
          otherCurrency={null}
          fieldType={Field.INPUT}
          onCurrencySelect={(curr: Currency) => handleCurrencySelect(curr)}
          onUserInput={(amount) => setInputCurrencyAmount(amount)}
          handleMaxInput={handleMaxInput}
          isZapInput
          pricing={Pricing.PRICEGETTER}
        />
      </Flex>
    </Modal>
  )
}

export default WidoDualAddLiquidityModal

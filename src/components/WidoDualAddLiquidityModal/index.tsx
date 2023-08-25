import { FC, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Components
import DexPanel from 'components/DexPanel'
import { Modal } from 'components/uikit'
import { Flex, NumericInput, Text } from 'components/uikit'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Spinner } from 'theme-ui'
import Dots from 'components/Dots'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'

// Utils
import { maxAmountSpend } from 'utils/maxAmountSpend'

// Types
import { Field } from 'state/zap/actions'
import { Currency, SupportedChainId } from '@ape.swap/sdk-core'
import { Pricing } from 'components/DexPanel/types'
import { Token } from '@ape.swap/apeswap-lists'

// Constants
const NATIVE_CURR_ID = 'ETH'

interface WidoDualAddLiquidityModalProps {
  onDismiss?: () => void
  lpToken: Token
  lpTokenA: Token
  lpTokenB: Token
}

const WidoDualAddLiquidityModal: FC<WidoDualAddLiquidityModalProps> = ({ onDismiss, lpToken, lpTokenA, lpTokenB }) => {
  const [inputCurrencyId, setInputCurrencyId] = useState<string>(NATIVE_CURR_ID)
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState<string>('')

  const { account, chainId } = useWeb3React()
  const { t } = useTranslation()

  const lpPrincipalToken = useCurrency(lpToken.address[chainId as SupportedChainId])
  const lpTokenACurrency = useCurrency(lpTokenA.address[chainId as SupportedChainId])
  const lpTokenBCurrency = useCurrency(lpTokenB.address[chainId as SupportedChainId])

  const inputCurrency = useCurrency(inputCurrencyId)
  const [usdVal] = useTokenPriceUsd(inputCurrency)

  const inputCurrencyBalance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const lpPrincipalTokenBalance = useCurrencyBalance(account ?? undefined, lpPrincipalToken ?? undefined)

  const inputCurrencyMaxSpend = maxAmountSpend(inputCurrencyBalance)

  // TODO: Replace this value to Wido quote value
  const mockedValue = '123'

  const handleCurrencySelect = (curr: Currency) => {
    console.log({ curr })
    setInputCurrencyId(curr.isToken ? curr.address : curr.isNative ? NATIVE_CURR_ID : '')
    setInputCurrencyAmount('0')
  }

  const handleMaxInput = () => {
    setInputCurrencyAmount(inputCurrencyMaxSpend?.toExact() as string)
  }

  return (
    <Modal title={t('Liquidity')} onDismiss={onDismiss}>
      <Flex sx={{ flexDirection: 'column', pt: '30px', gap: '10px' }}>
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

        <Text>{t('To:')}</Text>
        <Flex
          sx={{
            position: 'relative',
            width: '100%',
            height: '94px',
            background: 'white3',
            padding: '10px',
            borderRadius: '10px',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Flex sx={{ width: '100%', height: 'auto', justifyContent: 'space-between' }}>
            <NumericInput value={mockedValue} onUserInput={() => null} />
            <Flex
              sx={{
                minWidth: 'max-content',
                height: '40px',
                background: 'white4',
                padding: '5px 10px',
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .3s linear',
                '&:active': {
                  transform: 'scale(0.9)',
                },
                ':hover': { background: 'navMenuLogo' },
              }}
            >
              <DoubleCurrencyLogo currency0={lpTokenBCurrency} currency1={lpTokenACurrency} size={30} />
              <Text sx={{ fontSize: '14px', margin: '0px 7.5px', textTransform: 'uppercase' }}>{lpToken.symbol}</Text>
            </Flex>
          </Flex>
          <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text size="12px" sx={{ opacity: 0.8 }}>
                {!usdVal && inputCurrencyAmount !== '0.0' ? (
                  <Spinner width="15px" height="15px" />
                ) : inputCurrencyAmount !== '0.0' && usdVal !== 0 && inputCurrencyAmount ? (
                  `$${(usdVal * parseFloat(inputCurrencyAmount)).toFixed(2)}`
                ) : null}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
              {account ? (
                <Text size="12px" sx={{ opacity: 0.8 }}>
                  {t('Balance: %balance%', { balance: lpPrincipalTokenBalance?.toSignificant(6) || 'loading' })}
                  {!lpPrincipalTokenBalance && <Dots />}
                </Text>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default WidoDualAddLiquidityModal

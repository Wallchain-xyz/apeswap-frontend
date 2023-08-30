import { FC, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'

// Components
import DexPanel from 'components/DexPanel'
import { Box } from 'theme-ui'
import { Modal, Svg, Link } from 'components/uikit'
import { Flex, NumericInput, Text } from 'components/uikit'
import ZapButton from './components/ZapButton'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Spinner } from 'theme-ui'
import Dots from 'components/Dots'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import useGetWidoQuote from 'state/zap/providers/wido/useGetWidoQuote'

// Utils
import { maxAmountSpend } from 'utils/maxAmountSpend'

// Types
import { Field } from 'state/zap/actions'
import { Currency, SupportedChainId } from '@ape.swap/sdk-core'
import { Pricing } from 'components/DexPanel/types'
import { Token, ZapVersion } from '@ape.swap/apeswap-lists'
import { Token as CoreToken } from '@ape.swap/sdk-core'

// Constants
const NATIVE_CURR_ID = 'ETH'
import { WIDO_NATIVE_TOKEN_ID } from 'config/constants/misc'

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
  const inputCurrencyMaxSpend = maxAmountSpend(inputCurrencyBalance)?.toExact() || '0'

  const lpPrincipalTokenBalance = useCurrencyBalance(account ?? undefined, lpPrincipalToken ?? undefined)

  const { address: lpPrincipalTokenAddress } = lpPrincipalToken as CoreToken
  const { symbol: inputCurrencySymbol = '' } = inputCurrency as CoreToken
  const { symbol: lpTokenSymbol } = lpToken

  const formatInputCurrency = () => {
    if (inputCurrency?.isNative) {
      return { ...inputCurrency, address: WIDO_NATIVE_TOKEN_ID }
    }
    // @ts-ignore
    return inputCurrency?.address ? inputCurrency : inputCurrency.tokenInfo
  }

  const {
    address: inputCurrencyAddress,
    decimals: inputTokenDecimals,
    chainId: inputTokenChainId,
  } = formatInputCurrency()

  const { data: widoQuote, isLoading: isWidoQuoteLoading } = useGetWidoQuote({
    inputTokenAddress: inputCurrencyAddress,
    inputTokenDecimals,
    toTokenAddress: lpPrincipalTokenAddress,
    zapVersion: ZapVersion.Wido,
    fromChainId: inputTokenChainId,
    toChainId: chainId as SupportedChainId,
    tokenAmount: inputCurrencyAmount,
  })

  const { toTokenAmount = '0' } = widoQuote ?? {}

  const zapAmountOutput = utils.formatUnits(toTokenAmount, inputTokenDecimals)

  const handleCurrencySelect = (curr: Currency) => {
    setInputCurrencyId(curr.isToken ? curr.address : curr.isNative ? NATIVE_CURR_ID : '')
    setInputCurrencyAmount('0')
  }

  const handleMaxInput = () => {
    setInputCurrencyAmount(inputCurrencyMaxSpend)
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
        <Flex sx={{ position: 'relative', mt: '10px' }}>
          <Text>{t('To:')}</Text>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Svg icon="ZapArrow" />
          </Box>
        </Flex>
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
            <NumericInput value={zapAmountOutput} onUserInput={() => null} />
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
        <ZapButton
          inputCurrencyAmount={inputCurrencyAmount}
          hasSufficientBal={Number(inputCurrencyMaxSpend) >= Number(inputCurrencyAmount)}
          widoQuote={widoQuote}
          isWidoQuoteLoading={isWidoQuoteLoading}
          inputTokenAddress={inputCurrencyAddress}
          inputTokenDecimals={inputTokenDecimals}
          toTokenAddress={lpPrincipalTokenAddress}
          inputCurrencySymbol={inputCurrencySymbol}
          lpTokenSymbol={lpTokenSymbol}
          toChainId={chainId as SupportedChainId}
          fromChainId={inputTokenChainId}
        />
        <Flex sx={{ marginTop: '10px', justifyContent: 'center' }}>
          <Link
            href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
            target="_blank"
            textAlign="center"
            sx={{ textDecoration: 'none' }}
          >
            <Text style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 400, borderBottom: '1px solid' }}>
              Learn more{'>'}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default WidoDualAddLiquidityModal

import React, { useCallback, useEffect, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { Currency, CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { Field } from 'state/zap/actions'
import { useDerivedZapInfo, useSetZapInputList, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { styles } from './styles'
import { useZapCallback } from 'hooks/useZapCallback'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { Box, Switch } from 'theme-ui'
import track from 'utils/track'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { Flex, Link, Svg, Text } from 'components/uikit'
import ZapPanel from 'views/V2/Zap/components/ZapPanel'
import DistributionPanel from 'views/V2/Zap/components/DistributionPanel/DistributionPanel'
import ZapLiquidityActions from 'views/V2/Zap/components/ZapLiquidityActions'
import DexPanel from 'components/DexPanel'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { Pair } from '@ape.swap/v2-sdk'
import { ZapType } from '@ape.swap/v2-zap-sdk'
import LoadingBestRoute from 'views/Swap/components/LoadingBestRoute'
import { TradeState } from 'state/routing/types'
import ModalProvider from '../../contexts/ModalContext'
import { Pricing } from '../DexPanel/types'
import { useRouter } from 'next/router'
import { ZapVersion } from '@ape.swap/apeswap-lists'

// Hooks
import useGetWidoQuote from 'state/zap/providers/wido/useGetWidoQuote'
import { useV2Pair } from 'hooks/useV2Pairs'
import { useSignTransaction } from 'state/transactions/hooks'

// Utils
import getCurrencyInfo from 'utils/getCurrencyInfo'

// Types
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { TransactionType } from 'state/transactions/types'
interface ZapLiquidityProps {
  handleConfirmedTx: (hash: string, pairOut: Pair) => void
  poolAddress: string
  pid: string
  zapIntoProductType: ZapType
  zapable: boolean
  txHash?: string
}

const ZapLiquidity: React.FC<ZapLiquidityProps> = ({
  handleConfirmedTx,
  poolAddress,
  pid,
  zapIntoProductType,
  zapable,
  txHash,
}) => {
  useSetZapInputList()
  const [zapErrorMessage, setZapErrorMessage] = useState<string>('')
  const [stakeIntoProduct, setStakeIntoProduct] = useState<boolean>(true)
  const [disableZap, setDisableZap] = useState<boolean>(false)

  const { route } = useRouter()
  const { t } = useTranslation()
  const { chainId = SupportedChainId.BSC } = useWeb3React()
  const { signTransaction } = useSignTransaction()

  const { INPUT, typedValue, recipient, zapType, OUTPUT } = useZapState()
  const [zapSlippage] = useUserZapSlippageTolerance()

  const currencyA = INPUT.currencyId
  const { currency1, currency2 } = OUTPUT
  const outputCurrencyA = useCurrency(currency1)
  const outputCurrencyB = useCurrency(currency2)
  const inputCurrency = useCurrency(currencyA)

  const [, outputPair] = useV2Pair(outputCurrencyA as Currency, outputCurrencyB as Currency)

  const { address: outputCurrencyId, chainId: outputCurrencyChainId } = getCurrencyInfo({
    currencyA: outputCurrencyA as WrappedTokenInfo,
    currencyB: outputCurrencyB as WrappedTokenInfo,
    pair: outputPair,
  })

  const {
    address: inputTokenAddress,
    decimals: inputTokenDecimals,
    chainId: inputCurrencyChainId,
  } = getCurrencyInfo({
    currencyA: inputCurrency as WrappedTokenInfo,
  })

  const { data: widoQuote, isLoading: isWidoQuoteLoading } = useGetWidoQuote({
    inputTokenAddress: inputTokenAddress,
    inputTokenDecimals: inputTokenDecimals,
    toTokenAddress: outputCurrencyId,
    zapVersion: ZapVersion.ZapV1,
    fromChainId: inputCurrencyChainId,
    toChainId: outputCurrencyChainId,
  })

  const { to, data, value, isSupported: isWidoSupported = false } = widoQuote ?? {}
  const isBondsPage = route.includes('bonds')
  const shouldUseWido = isWidoSupported && isBondsPage

  const { zap, inputError: zapInputError, currencyBalances, zapRouteState } = useDerivedZapInfo()
  const { onUserInput, onInputSelect, onCurrencySelection, onSetZapType } = useZapActionHandlers()

  const [tokenPrice] = useTokenPriceUsd(zap.currencyIn.currency)

  const handleCurrencySelect = useCallback(
    (field: Field, currency: Currency[]) => {
      onUserInput(field, '')
      onCurrencySelection(field, currency)
    },
    [onCurrencySelection, onUserInput],
  )

  const handleOutputSelect = useCallback(
    (currencyIdA: Currency, currencyIdB: Currency) => {
      onCurrencySelection(Field.OUTPUT, [currencyIdA, currencyIdB])
      setDisableZap(true)
      onSetZapType(ZapType.ZAP)
      setStakeIntoProduct(false)
    },
    [onCurrencySelection, onSetZapType],
  )

  const handleStakeIntoProduct = (value: boolean) => {
    setStakeIntoProduct(value)
    if (value) {
      onSetZapType(zapIntoProductType)
    } else {
      onSetZapType(ZapType.ZAP)
    }
  }

  const { callback: zapCallback } = useZapCallback(zap, zapType, zapSlippage, recipient, poolAddress, '', pid)

  const handleZap = useCallback(() => {
    const zapMethod = shouldUseWido
      ? signTransaction({ dataToSign: { to, data, value }, txInfo: { type: TransactionType.ZAP } })
      : zapCallback()

    if (shouldUseWido) {
      console.log('Signing Wido buy tx')
    }

    setZapErrorMessage('')
    zapMethod
      .then((hash: any) => {
        handleConfirmedTx(hash, zap?.pairOut.pair)
        const amount = getBalanceNumber(new BigNumber(zap.currencyIn.inputAmount.toString()))
        track({
          event: 'zap',
          chain: chainId,
          data: {
            cat: 'liquidity',
            token1: zap.currencyIn.currency.symbol,
            token2: `${zap.currencyOut1.outputCurrency.symbol}-${zap.currencyOut2.outputCurrency.symbol}`,
            amount,
            usdAmount: amount * tokenPrice,
          },
        })
      })
      .catch((error: any) => {
        setZapErrorMessage(error.message)
      })
  }, [chainId, handleConfirmedTx, tokenPrice, zap, zapCallback])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapErrorMessage if user closes the error modal
    setZapErrorMessage('')
  }, [])

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = {
        [Field.INPUT]: maxAmountSpend(currencyBalances[Field.INPUT]),
        [Field.OUTPUT]: maxAmountSpend(currencyBalances[Field.OUTPUT]),
      }
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onUserInput],
  )

  // reset input value to zero on first render
  useEffect(() => {
    onUserInput(Field.INPUT, '')
    onSetZapType(zapable ? zapIntoProductType : ZapType.ZAP)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [zapable])

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        {zapable && zap?.pairOut?.pair?.token0?.symbol && (
          <Flex sx={{ marginBottom: '10px', fontSize: '12px', alignItems: 'center' }}>
            <Text>
              {t('Stake in')}{' '}
              {`${zap?.pairOut?.pair?.token0?.wrapped?.symbol} - ${zap?.pairOut?.pair?.token1?.wrapped.symbol} ${t(
                'Farm',
              )}`}
            </Text>
            <Box sx={{ width: '50px', marginLeft: '10px' }}>
              <Switch
                checked={stakeIntoProduct}
                onChange={() => handleStakeIntoProduct(!stakeIntoProduct)}
                sx={styles.switchStyles}
                disabled={disableZap}
              />
            </Box>
          </Flex>
        )}
        <Flex sx={{ marginTop: '30px' }}>
          <DexPanel
            value={typedValue}
            panelText="From:"
            currency={inputCurrency}
            otherCurrency={null}
            fieldType={Field.INPUT}
            onCurrencySelect={(cur: Currency) => handleCurrencySelect(Field.INPUT, [cur])}
            onUserInput={(val: string) => onUserInput(Field.INPUT, val)}
            handleMaxInput={handleMaxInput}
            isZapInput
            pricing={Pricing.PRICEGETTER}
          />
        </Flex>
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          <Svg icon="ZapArrow" />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
          onSelect={handleOutputSelect}
          lpPair={zap.pairOut.pair}
        />

        {zapRouteState === TradeState.LOADING && (
          <Flex mt="10px">
            <LoadingBestRoute />
          </Flex>
        )}
        {typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={zap} />
          </Flex>
        )}
        <ModalProvider>
          <ZapLiquidityActions
            zapInputError={zapInputError}
            zap={zap}
            handleZap={handleZap}
            zapErrorMessage={zapErrorMessage}
            zapRouteState={zapRouteState}
            handleDismissConfirmation={handleDismissConfirmation}
            isWidoQuoteLoading={isWidoQuoteLoading && !widoQuote}
            shouldUseWido={shouldUseWido}
            widoQuote={widoQuote}
            inputTokenAddress={inputTokenAddress}
            inputTokenDecimals={inputTokenDecimals}
            inputTokenChainId={inputCurrencyChainId}
            outputTokenChainId={outputCurrencyChainId}
            toTokenAddress={outputCurrencyId}
          />
        </ModalProvider>
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
    </div>
  )
}

export default React.memo(ZapLiquidity)

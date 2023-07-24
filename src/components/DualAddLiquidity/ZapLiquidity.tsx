import React, { useCallback, useEffect, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { Field } from 'state/zap/actions'
import { useDerivedZapInfo, useSetZapInputList, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { styles } from './styles'
import { useZapCallback } from 'lib/hooks/zap/useZapCallback'
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

  const { t } = useTranslation()
  const { chainId } = useWeb3React()

  const { INPUT, typedValue, recipient, zapType } = useZapState()
  const [zapSlippage] = useUserZapSlippageTolerance()

  const currencyA = INPUT.currencyId

  const inputCurrency = useCurrency(currencyA)

  const { bestMergedZaps, inputError: zapInputError, currencyBalances, zapRouteState } = useDerivedZapInfo()
  const { onZapUserInput, onZapCurrencySelection, onSetZapType } = useZapActionHandlers()

  const [tokenPrice] = useTokenPriceUsd(bestMergedZaps.currencyIn.currency)

  const handleCurrencySelect = useCallback(
    (field: Field, currency: Currency[]) => {
      onZapUserInput(field, '')
      onZapCurrencySelection(field, currency)
    },
    [onZapCurrencySelection, onZapUserInput],
  )

  const handleOutputSelect = useCallback(
    (currencyIdA: Currency, currencyIdB: Currency) => {
      onZapCurrencySelection(Field.OUTPUT, [currencyIdA, currencyIdB])
      setDisableZap(true)
      onSetZapType(ZapType.ZAP)
      setStakeIntoProduct(false)
    },
    [onZapCurrencySelection, onSetZapType],
  )

  const handleStakeIntoProduct = (value: boolean) => {
    setStakeIntoProduct(value)
    if (value) {
      onSetZapType(zapIntoProductType)
    } else {
      onSetZapType(ZapType.ZAP)
    }
  }

  const { callback: zapCallback } = useZapCallback(bestMergedZaps, zapType, zapSlippage, recipient, poolAddress, '', pid)

  const handleZap = useCallback(() => {
    setZapErrorMessage('')
    zapCallback()
      .then((hash: any) => {
        handleConfirmedTx(hash, bestMergedZaps?.pairOut.pair)
        const amount = getBalanceNumber(new BigNumber(bestMergedZaps.currencyIn.inputAmount.toString()))
        track({
          event: 'zap',
          chain: chainId,
          data: {
            cat: 'liquidity',
            token1: bestMergedZaps.currencyIn.currency.symbol,
            token2: `${bestMergedZaps.currencyOut1.outputCurrency.symbol}-${bestMergedZaps.currencyOut2.outputCurrency.symbol}`,
            amount,
            usdAmount: amount * tokenPrice,
          },
        })
      })
      .catch((error: any) => {
        setZapErrorMessage(error.message)
      })
  }, [chainId, handleConfirmedTx, tokenPrice, bestMergedZaps, zapCallback])

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
        onZapUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onZapUserInput],
  )

  // reset input value to zero on first render
  useEffect(() => {
    onZapUserInput(Field.INPUT, '')
    onSetZapType(zapable ? zapIntoProductType : ZapType.ZAP)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [zapable])

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        {zapable && bestMergedZaps?.pairOut?.pair?.token0?.symbol && (
          <Flex sx={{ marginBottom: '10px', fontSize: '12px', alignItems: 'center' }}>
            <Text>
              {t('Stake in')}{' '}
              {`${bestMergedZaps?.pairOut?.pair?.token0?.wrapped?.symbol} - ${bestMergedZaps?.pairOut?.pair?.token1?.wrapped.symbol} ${t(
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
            onUserInput={(val: string) => onZapUserInput(Field.INPUT, val)}
            handleMaxInput={handleMaxInput}
            isZapInput
          />
        </Flex>
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          <Svg icon="ZapArrow" />
        </Flex>
        <ZapPanel
          value={bestMergedZaps?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
          onSelect={handleOutputSelect}
          lpPair={bestMergedZaps.pairOut.pair}
        />

        {zapRouteState === TradeState.LOADING && (
          <Flex mt="10px">
            <LoadingBestRoute />
          </Flex>
        )}
        {typedValue && parseFloat(typedValue) > 0 && bestMergedZaps?.pairOut?.liquidityMinted && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={bestMergedZaps} />
          </Flex>
        )}
        <ModalProvider>
          <ZapLiquidityActions
            zapInputError={zapInputError}
            zap={bestMergedZaps}
            handleZap={handleZap}
            zapErrorMessage={zapErrorMessage}
            zapRouteState={zapRouteState}
            handleDismissConfirmation={handleDismissConfirmation}
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

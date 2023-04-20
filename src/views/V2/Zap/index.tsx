import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Svg } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import ZapPanel from './components/ZapPanel'
import { Field } from 'state/zap/actions'
import {
  useDefaultCurrencies,
  useDerivedZapInfo,
  useSetZapDexOutputList,
  useSetZapInputList,
  useZapActionHandlers,
  useZapState,
} from 'state/zap/hooks'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { styles } from './styles'
import { useZapCallback } from 'hooks/useZapCallback'
import DistributionPanel from './components/DistributionPanel/DistributionPanel'
import DexPanel from 'components/DexPanel'
import { useWeb3React } from '@web3-react/core'
import { useUserSlippageTolerance, useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import DexNav from 'components/DexNav'
import { V2LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from '../AddLiquidityV2/components/Actions'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'

const ZapLiquidity = ({
  currencyIdA,
  currencyIdB,
  currencyIdC,
}: {
  currencyIdA: string | undefined
  currencyIdB: string | undefined
  currencyIdC: string | undefined
}) => {
  useSetZapInputList()
  useDefaultCurrencies()

  const [{ zapErrorMessage, txHash }, setZapState] = useState<{
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    zapErrorMessage: undefined,
    txHash: undefined,
  })
  const { chainId } = useWeb3React()
  const { INPUT, typedValue, recipient, zapType } = useZapState()
  const zapSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE)

  const currencyA = currencyIdA || INPUT.currencyId

  const inputCurrency = useCurrency(currencyA)

  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo()
  const { onUserInput, onCurrencySelection } = useZapActionHandlers()

  const [tradeValueUsd, setTradeValueUsd] = useState(0)
  const setTradeValueUsdCallback = useCallback((value: number) => setTradeValueUsd(value), [setTradeValueUsd])

  const handleCurrencySelect = useCallback(
    (field: Field, currency: Currency[]) => {
      onCurrencySelection(field, currency)
    },
    [onCurrencySelection],
  )

  const { callback: zapCallback } = useZapCallback(zap as any, zapType, zapSlippage, recipient, '', undefined)

  const handleZap = useCallback(() => {
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
    zapCallback()
      .then((hash: string) => {
        setZapState({
          zapErrorMessage: undefined,
          txHash: hash,
        })
        // track({
        //   event: 'zap',
        //   chain: chainId,
        //   data: {
        //     cat: 'liquidity',
        //     token1: zap.currencyIn.currency.getSymbol(chainId),
        //     token2: `${zap.currencyOut1.outputCurrency.getSymbol(chainId)}-${zap.currencyOut2.outputCurrency.getSymbol(
        //       chainId,
        //     )}`,
        //     amount: getBalanceNumber(new BigNumber(zap.currencyIn.inputAmount.toString())),
        //     usdAmount: tradeValueUsd,
        //   },
        // })
      })
      .catch((error: any) => {
        setZapState({
          zapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [zapCallback, zap, chainId, tradeValueUsd])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapState if user close the error modal
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
  }, [setZapState])

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> | undefined } = {
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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  useSetZapDexOutputList()

  return (
    <Flex variant="flex.dexContainer">
      <DexNav />
      <V2LiquiditySubNav />
      <Flex sx={{ marginBottom: '30px' }} />
      <Flex sx={styles.liquidityContainer}>
        <DexPanel
          value={typedValue}
          panelText="From"
          currency={inputCurrency}
          otherCurrency={null}
          fieldType={Field.INPUT}
          onCurrencySelect={(currency) => handleCurrencySelect(Field.INPUT, [currency])}
          onUserInput={(val: string) => onUserInput(Field.INPUT, val)}
          handleMaxInput={handleMaxInput}
          isZapInput
          setTradeValueUsd={setTradeValueUsdCallback}
        />
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          <Svg icon="ZapArrow" />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
          onSelect={(currency0, currency1) => handleCurrencySelect(Field.OUTPUT, [currency0, currency1])}
          lpPair={zap?.pairOut.pair ?? undefined}
        />
        {typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={zap} />
          </Flex>
        )}
        <ZapLiquidityActions
          zapInputError={zapInputError}
          zap={zap}
          handleZap={handleZap}
          zapErrorMessage={zapErrorMessage}
          txHash={txHash}
          handleDismissConfirmation={handleDismissConfirmation}
        />
      </Flex>
    </Flex>
  )
}

export default ZapLiquidity

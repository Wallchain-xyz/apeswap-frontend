import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { BuyProps, DualCurrencySelector } from './types'
import { styles } from './styles'
import DualCurrencyPanel from 'components/DualCurrencyPanel/DualCurrencyPanel'
import { ZapType } from '@ape.swap/sdk'
import { useCurrency } from 'hooks/Tokens'
import { Box } from 'theme-ui'
import { useUserZapSlippageTolerance } from 'state/user/hooks'
import BillActions from './BillActions'
import track from 'utils/track'
import UpdateSlippage from 'components/DualDepositModal/UpdateSlippage'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { Currency, Percent, SupportedChainId } from '@ape.swap/sdk-core'
import useBuyBill from '../hooks/useBuyBill'
import { Button, Flex, Svg, Text } from 'components/uikit'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { BillValueContainer, TextWrapper } from '../components/Modals/styles'
import { useBillType } from '../hooks/useBillType'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useV2Pair } from 'hooks/useV2Pairs'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { useZapCallback } from 'lib/hooks/zap/useZapCallback'
import BigNumber from 'bignumber.js'
import useAddLiquidityModal from 'components/DualAddLiquidity/hooks/useAddLiquidityModal'
import { useToastError } from 'state/application/hooks'

const Buy: React.FC<BuyProps> = ({ bill, onBillId, onTransactionSubmitted }) => {
  const {
    token,
    quoteToken,
    contractAddress,
    price,
    lpPrice,
    earnToken,
    earnTokenPrice,
    maxTotalPayOut,
    totalPayoutGiven,
    billNftAddress,
    maxPayoutTokens,
  } = bill
  const onAddLiquidityModal = useAddLiquidityModal(undefined, true)

  const dispatch = useAppDispatch()
  const { chainId, account, provider } = useWeb3React()
  const { t } = useTranslation()
  const toastError = useToastError()
  const [pendingTrx, setPendingTrx] = useState(false)

  const { recipient, typedValue } = useZapState()
  const { bestMergedZaps, zapRouteState } = useDerivedZapInfo()
  const { onZapCurrencySelection, onZapUserInput } = useZapActionHandlers()
  const [zapSlippage, setZapSlippage] = useUserZapSlippageTolerance()

  const billsCurrencies = {
    // NOTE: Quote token is currencyB
    currencyA: useCurrency(token.address[chainId as SupportedChainId]),
    currencyB: useCurrency(quoteToken.address[chainId as SupportedChainId]),
  }

  const [currencyA, setCurrencyA] = useState(billsCurrencies.currencyA)
  const [currencyB, setCurrencyB] = useState(billsCurrencies.currencyB)
  const inputCurrencies = [currencyA, currencyB]

  const billType = useBillType(contractAddress[chainId as SupportedChainId] ?? '')

  // TODO: This assumes that the bill principal token is UniswapV2
  // We want to find the pair (if any) to get its balance, if there's no pair use currencyA
  const [, pair] = useV2Pair(inputCurrencies[0] ?? undefined, inputCurrencies[1] ?? undefined)
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    pair?.liquidityToken ?? currencyA ?? undefined,
  )

  // FIXME: Hook
  // TODO: 2% slippage?
  const maxPrice = new BigNumber(price ?? 0).times(102).div(100).toNumber().toFixed(0)
  const rawPriceImpact = new BigNumber(bestMergedZaps?.totalPriceImpact?.toFixed(2) ?? '0').times(100).toNumber()
  const priceImpact = useMemo(() => new Percent(rawPriceImpact, 10_000), [rawPriceImpact])

  /**
   * Buy bill directly with principal tokens.
   * -> NOT for purchasing with Zap
   */
  const { onBuyBill } = useBuyBill(
    contractAddress[chainId as SupportedChainId] ?? '',
    typedValue,
    lpPrice ?? 0,
    price ?? '',
  )

  /**
   * Buy bill using Zap.
   */
  // TODO: Only handling for Zap?
  const onHandleInput = useCallback(
    (val: string) => {
      onZapUserInput(Field.INPUT, val)
    },
    [onZapUserInput],
  )

  useEffect(() => {
    //reset zap state on mount
    onHandleInput('')
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  // TODO: Possibly something to update regarding Wido
  const { callback: zapCallback } = useZapCallback(
    bestMergedZaps,
    ZapType.ZAP_T_BILL,
    zapSlippage,
    recipient,
    contractAddress[chainId as SupportedChainId] || '',
    maxPrice,
  )


  
  
  /**
   * Slippage
   */

  const showUpdateSlippage =
    zapSlippage.lessThan(priceImpact) &&
    !currencyB &&
    parseFloat(selectedCurrencyBalance?.toExact() ?? '0') >= parseFloat(typedValue)

  const updateSlippage = useCallback(() => {
    if (zapSlippage.lessThan(priceImpact)) {
      const newZapSlippage = Math.round(rawPriceImpact + 5)
      const newSlippagePercent = new Percent(newZapSlippage, 10_000)
      setZapSlippage(newSlippagePercent)
    }
  }, [priceImpact, rawPriceImpact, setZapSlippage, zapSlippage])

  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Input Value
   */
  // this logic prevents user to initiate a tx for a higher bill value than the available amount
  const consideredValue = currencyB ? typedValue : bestMergedZaps?.pairOut?.liquidityMinted?.toExact()
  // FIXME: Assumes LP is in 18 decimals?
  const bigValue = new BigNumber(Number(consideredValue)).times(new BigNumber(10).pow(18))
  const billValue = bigValue.div(new BigNumber(price ?? 0))?.toString()

  const available = new BigNumber(maxTotalPayOut ?? 0)
    ?.minus(new BigNumber(totalPayoutGiven ?? 0))
    ?.div(new BigNumber(10).pow(earnToken?.decimals?.[chainId as SupportedChainId] ?? 18))

  // threshold equals to 10 usd in earned tokens (banana or jungle token)
  const thresholdToShow = new BigNumber(5).div(earnTokenPrice ?? 0)
  const safeAvailable = available.minus(thresholdToShow)
  const singlePurchaseLimit = new BigNumber(maxPayoutTokens ?? 0).div(
    new BigNumber(10).pow(earnToken?.decimals?.[chainId as SupportedChainId] ?? 18),
  )
  const displayAvailable = singlePurchaseLimit.lt(safeAvailable) ? singlePurchaseLimit : safeAvailable

  const searchForBillId = useCallback(
    (resp: any, billNftAddress: string) => {
      const { logs, transactionHash } = resp
      const findBillNftLog = logs.find((log: any) => log.address.toLowerCase() === billNftAddress.toLowerCase())
      const getBillNftIndex = findBillNftLog.topics[findBillNftLog.topics.length - 1]
      const convertHexId = parseInt(getBillNftIndex, 16)
      onBillId(convertHexId.toString(), transactionHash)
    },
    [onBillId],
  )

  // TODO: HandleBuy
  const handleBuy = useCallback(async () => {
    if (!provider || !chainId || !billNftAddress || !account) return
    setPendingTrx(true)
    onTransactionSubmitted(true)

    if (currencyB) {
      await onBuyBill()
        .then((resp: any) => {
          searchForBillId(resp, billNftAddress)
          dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
          dispatch(fetchBillsUserDataAsync(chainId, account))
        })
        .catch((e) => {
          console.error(e)
          toastError(e)
          setPendingTrx(false)
          onTransactionSubmitted(false)
        })
    } else {
      // FIXME: Add something like this
      // dispatch(onZapBill({ provider }))

      // TODO: Will replace this with updated store
      await zapCallback()
        .then((hash: any) => {
          setPendingTrx(true)
          setZapSlippage(originalSlippage)
          provider
            ?.waitForTransaction(hash)
            .then((receipt) => {
              const { logs } = receipt
              const findBillNftLog = logs.find((log) => log.address.toLowerCase() === billNftAddress?.toLowerCase())
              const getBillNftIndex = findBillNftLog?.topics[findBillNftLog.topics.length - 1]
              const convertHexId = parseInt(getBillNftIndex ?? '', 16)
              onBillId(convertHexId.toString(), hash)
              dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
              dispatch(fetchBillsUserDataAsync(chainId, account))
            })
            .catch((e) => {
              console.error(e)
              setPendingTrx(false)
              onTransactionSubmitted(false)
            })
          track({
            event: 'zap',
            chain: chainId,
            data: {
              cat: 'bill',
              token1: bestMergedZaps.currencyIn.currency.symbol,
              token2: `${bestMergedZaps.currencyOut1.outputCurrency.symbol}-${bestMergedZaps.currencyOut2.outputCurrency.symbol}`,
              amount: getBalanceNumber(new BigNumber(bestMergedZaps.currencyIn.inputAmount.toString())),
            },
          })
          track({
            // TODO: There isn't an event called bond
            event: 'bond',
            chain: chainId,
            data: {
              cat: 'buy',
              type: billType ?? '',
              address: contractAddress[chainId as SupportedChainId],
              typedValue,
              usdAmount: parseFloat(bestMergedZaps?.pairOut?.liquidityMinted?.toExact()) * (lpPrice ?? 0),
            },
          })
        })
        .catch((e: any) => {
          setZapSlippage(originalSlippage)
          console.error(e)
          toastError(e)
          setPendingTrx(false)
          onTransactionSubmitted(false)
        })
    }
  }, [
    account,
    chainId,
    currencyB,
    provider,
    billNftAddress,
    onBillId,
    dispatch,
    onBuyBill,
    onTransactionSubmitted,
    searchForBillId,
    zapCallback,
    bestMergedZaps,
    typedValue,
    billType,
    contractAddress,
    lpPrice,
    originalSlippage,
    setZapSlippage,
    toastError,
  ])

  const handleMaxInput = useCallback(() => {
    onHandleInput(maxAmountSpend(selectedCurrencyBalance)?.toExact() ?? '')
  }, [onHandleInput, selectedCurrencyBalance])

  const handleCurrencySelect = useCallback(
    (currency: DualCurrencySelector) => {
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB)
      onHandleInput('')
      if (!currency?.currencyB) {
        // if there's no currencyB use zap logic
        onZapCurrencySelection(Field.INPUT, [currency.currencyA])
        // FIXME: This logic may not work with Wido Zap, but maybe :thinking:
        onZapCurrencySelection(
          Field.OUTPUT,
          // @ts-ignore
          [billsCurrencies?.currencyA, billsCurrencies?.currencyB],
        )
      }
    },
    [billsCurrencies.currencyA, billsCurrencies.currencyB, onZapCurrencySelection, onHandleInput],
  )

  return (
    <Flex sx={styles.buyContainer}>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <DualCurrencyPanel
          handleMaxInput={handleMaxInput}
          onUserInput={onHandleInput}
          value={typedValue}
          onCurrencySelect={handleCurrencySelect}
          // @ts-ignore
          inputCurrencies={billType !== 'reserve' ? inputCurrencies : [inputCurrencies[0]]}
          // @ts-ignore
          lpList={[billsCurrencies]}
          enableZap={billType !== 'reserve'}
        />
      </Flex>
      <Flex sx={styles.detailsContainer}>
        <BillValueContainer>
          <TextWrapper>
            <Text size="12px" pr={1}>
              {t('Bond Value')}:{' '}
              <span style={{ fontWeight: 700 }}>
                {billValue === 'NaN' ? '0' : parseFloat(billValue)?.toLocaleString(undefined)} {earnToken?.symbol}
              </span>
            </Text>
          </TextWrapper>
          <TextWrapper>
            <Text size="12px">
              {t('Max per Bond')}:{' '}
              <span style={{ fontWeight: 700 }}>
                {!available ? '0' : parseFloat(displayAvailable.toString())?.toLocaleString(undefined)}{' '}
                {earnToken?.symbol}
              </span>
            </Text>
          </TextWrapper>
        </BillValueContainer>
        <Flex sx={styles.buttonsContainer}>
          {billType !== 'reserve' && (
            <Box sx={styles.getLpContainer}>
              <Button
                variant="secondary"
                onClick={() => onAddLiquidityModal(token, quoteToken, '', '', false)}
                sx={{ width: '100%' }}
              >
                {t('Get LP')}
                <Flex sx={{ ml: '10px' }}>
                  <Svg icon="ZapIcon" color="yellow" />
                </Flex>
              </Button>
            </Box>
          )}
          {/* NOTE: Buy Button */}
          <Box sx={billType !== 'reserve' ? styles.buyButtonContainer : styles.buyButtonContainerFull}>
            {/* NOTE Enable button happens here */}
            <BillActions
              bill={bill}
              zap={bestMergedZaps}
              zapRouteState={zapRouteState}
              currencyB={currencyB as Currency}
              handleBuy={handleBuy}
              billValue={billValue}
              value={typedValue}
              purchaseLimit={displayAvailable.toString()}
              balance={selectedCurrencyBalance?.toExact() ?? ''}
              pendingTrx={pendingTrx}
              errorMessage={
                zapSlippage && zapSlippage.lessThan(priceImpact ?? '0') && !currencyB ? 'Change Slippage' : null
              }
            />
          </Box>
          {showUpdateSlippage && !pendingTrx && (
            <Flex sx={styles.updateSlippage}>
              <UpdateSlippage priceImpact={rawPriceImpact} updateSlippage={updateSlippage} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Buy)

import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { Flex } from 'components/uikit'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import { BigNumber } from 'ethers'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import {
  useRangeHopCallbacks,
  useV3DerivedMintInfo,
  useV3MintActionHandlers,
  useV3MintState,
} from 'state/mint/v3/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useDerivedPositionInfo } from 'hooks/useDerivedPositionInfo'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { useHandleCurrencyASelect, useHandleCurrencyBSelect, useHandleFeeSelect } from './hooks'
import DexPanel from 'components/DexPanel'
import { Bound, Field } from 'state/mint/v3/actions'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import FeeSelector from './components/FeeSelector'
import RangeSelectors from './components/RangeSelectors'
import LiquidityChart from './components/LiquidityChart'

const AddLiquidity = ({
  currencyIdA,
  currencyIdB,
  feeAmountFromUrl,
  tokenId,
}: {
  currencyIdA: string
  currencyIdB: string
  feeAmountFromUrl?: string
  tokenId?: string
}) => {
  const { account, chainId, provider } = useWeb3React()
  const positionManager = useV3NFTPositionManagerContract()
  const { query } = useRouter()

  // check for existing position if tokenId in url
  const { position: existingPositionDetails, loading: positionLoading } = useV3PositionFromTokenId(
    tokenId ? BigNumber.from(tokenId) : undefined,
  )

  const hasExistingPosition = !!existingPositionDetails && !positionLoading
  const { position: existingPosition } = useDerivedPositionInfo(existingPositionDetails)

  const baseCurrency = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  // fee selection from url
  const feeAmount: FeeAmount | undefined =
    feeAmountFromUrl && Object.values(FeeAmount).includes(parseFloat(feeAmountFromUrl))
      ? parseFloat(feeAmountFromUrl)
      : undefined

  // prevent an error if they input ETH/WETH
  const quoteCurrency =
    baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB

  // mint state
  const { independentField, typedValue, startPriceTypedValue, rightRangeTypedValue, leftRangeTypedValue } =
    useV3MintState()

  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    parsedAmounts,
    currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit,
  } = useV3DerivedMintInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    existingPosition,
  )

  const { onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput, onStartPriceInput } =
    useV3MintActionHandlers(noLiquidity)

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const handleCurrencyASelect = useHandleCurrencyASelect({ currencyIdB, currencyIdA })
  const handleCurrencyBSelect = useHandleCurrencyBSelect({ currencyIdA, currencyIdB })
  const handleFeeSelect = useHandleFeeSelect({ currencyIdA, currencyIdB, onLeftRangeInput, onRightRangeInput })

  useEffect(() => {
    if (query.minPrice && typeof query.minPrice === 'string' && !leftRangeTypedValue && !isNaN(query.minPrice as any)) {
      onLeftRangeInput(query.minPrice)
    }
    if (
      query.maxPrice &&
      typeof query.maxPrice === 'string' &&
      !rightRangeTypedValue &&
      !isNaN(query.maxPrice as any)
    ) {
      onRightRangeInput(query.maxPrice)
    }
  }, [query, rightRangeTypedValue, leftRangeTypedValue, onRightRangeInput, onLeftRangeInput])

  // get value and prices at ticks
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } = pricesAtTicks

  const { getDecrementLower, getIncrementLower, getDecrementUpper, getIncrementUpper, getSetFullRange } =
    useRangeHopCallbacks(baseCurrency ?? undefined, quoteCurrency ?? undefined, feeAmount, tickLower, tickUpper, pool)

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center', flexDirection: 'row-reverse' }}>
      <Flex variant="flex.dexContainer">
        <DexNav />
        <Flex sx={{ mt: '30px' }} />
        <DexPanel
          panelText="Token 1"
          onCurrencySelect={handleCurrencyASelect}
          onUserInput={onFieldAInput}
          value={formattedAmounts[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A] ?? null}
          otherCurrency={currencies[Field.CURRENCY_B] ?? null}
        />
        <Flex sx={{ mt: '60px' }} />
        <DexPanel
          panelText="Token 2"
          onCurrencySelect={handleCurrencyBSelect}
          onUserInput={onFieldBInput}
          value={formattedAmounts[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B] ?? null}
          otherCurrency={currencies[Field.CURRENCY_A] ?? null}
        />
      </Flex>
      {/* <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, width: '0px' }}
          animate={{ width: 'fit-content', opacity: 1 }}
          transition={{ opacity: { duration: 0.3 }, width: { duration: 0.3 } }}
          exit={{ width: '0px', opacity: 0 }}
          sx={{ overflow: 'hidden' }}
        > */}
      <Flex variant="flex.v3SubDexContainer">
        <FeeSelector
          feeAmount={feeAmount}
          currencyIdA={currencyIdA}
          currencyIdB={currencyIdB}
          onHandleFeeSelect={handleFeeSelect}
        />
        <LiquidityChart
          currencyA={baseCurrency ?? undefined}
          currencyB={quoteCurrency ?? undefined}
          feeAmount={feeAmount}
          ticksAtLimit={ticksAtLimit}
          price={price ? parseFloat((invertPrice ? price.invert() : price).toSignificant(8)) : undefined}
          priceLower={priceLower}
          priceUpper={priceUpper}
          onLeftRangeInput={onLeftRangeInput}
          onRightRangeInput={onRightRangeInput}
          interactive={!hasExistingPosition}
        />
        <RangeSelectors
          priceLower={priceLower}
          priceUpper={priceUpper}
          currencyA={currencies[Field.CURRENCY_A] ?? null}
          currencyB={currencies[Field.CURRENCY_B] ?? null}
          ticksAtLimit={ticksAtLimit}
          getDecrementLower={getDecrementLower}
          getIncrementLower={getIncrementLower}
          getDecrementUpper={getDecrementUpper}
          getIncrementUpper={getIncrementUpper}
          onLeftRangeInput={onLeftRangeInput}
          onRightRangeInput={onRightRangeInput}
        />
      </Flex>
      {/* </motion.div>
      </AnimatePresence> */}
    </Flex>
  )
}

export default AddLiquidity

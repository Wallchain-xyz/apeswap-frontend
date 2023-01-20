import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { Button, Flex, IconButton, NumericInput, Text } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { Bound } from 'state/mint/v3/actions'
import RangeSelector from './RangeSelector'

const RangeSelectors = ({
  priceLower,
  priceUpper,
  currencyA,
  currencyB,
  ticksAtLimit,
  getDecrementLower,
  getIncrementLower,
  getDecrementUpper,
  getIncrementUpper,
  onLeftRangeInput,
  onRightRangeInput,
}: {
  priceLower?: Price<Token, Token>
  priceUpper?: Price<Token, Token>
  currencyA?: Currency | null
  currencyB?: Currency | null
  ticksAtLimit: Partial<Record<Bound, boolean | undefined>>
  getDecrementLower: () => string
  getIncrementLower: () => string
  getDecrementUpper: () => string
  getIncrementUpper: () => string
  onLeftRangeInput: (typedValue: string) => void
  onRightRangeInput: (typedValue: string) => void
}) => {
  const tokenA = (currencyA ?? undefined)?.wrapped
  const tokenB = (currencyB ?? undefined)?.wrapped
  const isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB)

  const leftPrice = isSorted ? priceLower : priceUpper?.invert()
  const rightPrice = isSorted ? priceUpper : priceLower?.invert()

  // Min price variables
  const minPriceDisbaled = ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]
  const minPriceValue = minPriceDisbaled ? '0' : leftPrice?.toSignificant(5) ?? ''

  // Max price variables
  const maxPriceDisabled = ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]
  const maxPriceValue = maxPriceDisabled ? '∞' : rightPrice?.toSignificant(5) ?? ''

  console.log(ticksAtLimit)
  console.log(maxPriceDisabled)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <RangeSelector
        rangeType="Min Price"
        value={minPriceValue}
        disabled={minPriceDisbaled}
        tokenASymbol={currencyA?.symbol}
        tokenBSymbol={currencyB?.symbol}
        onRangeInput={onLeftRangeInput}
        onDecrementRange={isSorted ? getDecrementLower : getIncrementUpper}
        onIncrementRange={isSorted ? getIncrementLower : getDecrementUpper}
      />
      <RangeSelector
        rangeType="Max Price"
        value={maxPriceValue}
        disabled={maxPriceDisabled}
        tokenASymbol={currencyA?.symbol}
        tokenBSymbol={currencyB?.symbol}
        onRangeInput={onRightRangeInput}
        onDecrementRange={isSorted ? getDecrementUpper : getIncrementLower}
        onIncrementRange={isSorted ? getIncrementUpper : getDecrementLower}
      />
    </Flex>
  )
}

export default RangeSelectors

import { Flex } from 'components/uikit'
import FeeSelector from './FeeSelector'
import LiquidityChart from './LiquidityChart'
import RangeSelector from './RangeSelectors'
import { DESKTOP_DISPLAY } from './styles'
import { LiquidityParamsInterface } from './types'

const DesktopLiquidityParams = ({
  feeAmount,
  price,
  currencyA,
  currencyB,
  priceLower,
  priceUpper,
  ticksAtLimit,
  getDecrementLower,
  getIncrementLower,
  getDecrementUpper,
  getIncrementUpper,
  onHandleFeeSelect,
  onLeftRangeInput,
  onRightRangeInput,
}: LiquidityParamsInterface) => {
  return (
    <Flex variant="flex.v3SubDexContainer" sx={{ display: DESKTOP_DISPLAY }}>
      <FeeSelector
        feeAmount={feeAmount}
        currencyA={currencyA}
        currencyB={currencyB}
        onHandleFeeSelect={onHandleFeeSelect}
      />
      <LiquidityChart
        id="desktopLiquidityChart"
        currencyA={currencyA ?? undefined}
        currencyB={currencyB ?? undefined}
        feeAmount={feeAmount}
        ticksAtLimit={ticksAtLimit}
        price={price}
        priceLower={priceLower}
        priceUpper={priceUpper}
        onLeftRangeInput={onLeftRangeInput}
        onRightRangeInput={onRightRangeInput}
        interactive={true}
      />
      <RangeSelector
        priceLower={priceLower}
        priceUpper={priceUpper}
        currencyA={currencyA ?? undefined}
        currencyB={currencyB ?? undefined}
        ticksAtLimit={ticksAtLimit}
        getDecrementLower={getDecrementLower}
        getIncrementLower={getIncrementLower}
        getDecrementUpper={getDecrementUpper}
        getIncrementUpper={getIncrementUpper}
        onLeftRangeInput={onLeftRangeInput}
        onRightRangeInput={onRightRangeInput}
      />
    </Flex>
  )
}

export default DesktopLiquidityParams

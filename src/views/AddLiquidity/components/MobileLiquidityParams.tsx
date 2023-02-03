import { Currency } from '@ape.swap/sdk-core'
import TokenSelector from 'components/TokenSelector'
import { Flex, Text } from 'components/uikit'
import FeeSelector from './FeeSelector'
import LiquidityChart from './LiquidityChart'
import RangeSelector from './RangeSelectors'
import { MOBILE_DISPLAY } from './styles'
import { LiquidityParamsInterface } from './types'

interface MobileParamsInterface extends LiquidityParamsInterface {
  handleCurrencyASelect: (currencyA: Currency) => void
  handleCurrencyBSelect: (currencyB: Currency) => void
}

const MobileLiquidityParams = ({
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
  handleCurrencyASelect,
  handleCurrencyBSelect,
}: MobileParamsInterface) => {
  return (
    <Flex sx={{ flexDirection: 'column', display: MOBILE_DISPLAY }}>
      <Flex
        sx={{
          padding: '20px',
          background: 'white3',
          borderRadius: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          mb: '20px',
        }}
      >
        <TokenSelector onCurrencySelect={handleCurrencyASelect} currency={currencyA} otherCurrency={currencyB} />
        <Flex sx={{ background: 'white4', borderRadius: '10px', padding: '2.5px 7.5px', margin: '0px 10px' }}>
          <Text weight={700}>+</Text>
        </Flex>
        <TokenSelector onCurrencySelect={handleCurrencyBSelect} currency={currencyB} otherCurrency={currencyA} />
      </Flex>
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

export default MobileLiquidityParams

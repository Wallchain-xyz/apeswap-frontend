import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { format } from 'd3'
import { FeeAmount } from '@ape.swap/v3-sdk'
import { Flex } from 'components/uikit'
import { Bound } from 'state/mint/v3/actions'
import Chart from './Chart'
import { ZoomLevels } from './types'

// TODO: Move to constants file
const ZOOM_LEVELS: Record<FeeAmount, ZoomLevels> = {
  [FeeAmount.LOWEST]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.LOW]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.MEDIUM]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
  [FeeAmount.HIGH]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
}

const LiquidityChart = ({
  currencyA,
  currencyB,
  feeAmount,
  ticksAtLimit,
  price,
  priceLower,
  priceUpper,
  onLeftRangeInput,
  onRightRangeInput,
  interactive,
}: {
  currencyA: Currency | undefined
  currencyB: Currency | undefined
  feeAmount?: FeeAmount
  ticksAtLimit: { [bound in Bound]?: boolean | undefined }
  price: number | undefined
  priceLower?: Price<Token, Token>
  priceUpper?: Price<Token, Token>
  onLeftRangeInput: (typedValue: string) => void
  onRightRangeInput: (typedValue: string) => void
  interactive: boolean
}) => {
  //   const { isLoading, error, formattedData } = useDensit({
  //     currencyA,
  //     currencyB,
  //     feeAmount,
  //   })

  //   return (
  //     <Flex sx={{ mt: '20px', width: '100%', background: 'white3', height: '126px', borderRadius: '10px' }}>
  //       <Chart
  //         data={{ series: formattedData, current: price }}
  //         dimensions={{ width: 400, height: 200 }}
  //         margins={{ top: 10, right: 2, bottom: 20, left: 0 }}
  //         styles={{
  //           area: {
  //             selection: theme.accentAction,
  //           },
  //           brush: {
  //             handle: {
  //               west: saturate(0.1, tokenAColor) ?? theme.accentFailure,
  //               east: saturate(0.1, tokenBColor) ?? theme.accentAction,
  //             },
  //           },
  //         }}
  //         interactive={interactive}
  //         brushLabels={brushLabelValue}
  //         brushDomain={brushDomain}
  //         onBrushDomainChange={onBrushDomainChangeEnded}
  //         zoomLevels={ZOOM_LEVELS[feeAmount ?? FeeAmount.MEDIUM]}
  //         ticksAtLimit={ticksAtLimit}
  //       />
  //     </Flex>
  //   )
  // }
  return <></>
}

export default LiquidityChart

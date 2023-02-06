import { Currency, Price, Token } from '@ape.swap/sdk-core'
import { Pool } from '@ape.swap/v3-sdk'
import { Flex, Svg, Text } from 'components/uikit'
import { Bound } from 'state/mint/v3/actions'
import { formatTickPrice } from 'utils/formatTickPrice'
import RangeTag from './RangeTag'

const PriceRangeSection = ({
  currencyQuote,
  currencyBase,
  removed,
  inRange,
  inverted,
  manuallyInverted,
  pool,
  priceUpper,
  priceLower,
  tickAtLimit,
  setManuallyInverted,
}: {
  currencyQuote: Currency | undefined
  currencyBase: Currency | undefined
  removed: boolean | undefined
  inRange: boolean
  inverted: boolean | undefined
  manuallyInverted: boolean
  pool: Pool | null | undefined
  priceUpper: Price<Token, Token> | undefined
  priceLower: Price<Token, Token> | undefined
  tickAtLimit: {
    LOWER: boolean | undefined
    UPPER: boolean | undefined
  }
  setManuallyInverted: (manuallyInverted: boolean) => void
}) => {
  return (
    <>
      <Flex
        sx={{
          height: '30px',
          margin: '20px 0px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Text mr="5px"> Price Range </Text>
          <RangeTag removed={removed} inRange={inRange} />
        </Flex>
        <Flex onClick={() => setManuallyInverted(!manuallyInverted)}>
          <Svg icon="trade" width="20px" />
        </Flex>
      </Flex>
      <Flex sx={{ height: '123px' }}>
        <Flex sx={{ width: '100%', flexDirection: 'column', mr: '10px' }}>
          <Flex
            sx={{
              height: '100%',
              mb: '10px',
              borderRadius: '10px',
              background: 'white3',
              padding: '5px 10px',
              flexDirection: 'column',
            }}
          >
            <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
              <Text> Min Price </Text>
              <Text> {formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)}</Text>
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'flex-end', height: '10px' }}>
              <Text size="12px" opacity={0.7} sx={{ lineHeight: '16px' }}>
                {currencyQuote?.symbol} per {currencyBase?.symbol}
              </Text>
            </Flex>
          </Flex>
          <Flex
            sx={{
              height: '100%',
              mt: '10px',
              borderRadius: '10px',
              background: 'white3',
              padding: '5px 10px',
              flexDirection: 'column',
            }}
          >
            <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
              <Text> Max Price </Text>
              <Text> {formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)}</Text>
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'flex-end', height: '10px' }}>
              <Text size="12px" opacity={0.7} sx={{ lineHeight: '16px' }}>
                {currencyQuote?.symbol} per {currencyBase?.symbol}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            width: '100%',
            borderRadius: '10px',
            ml: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'white3',
          }}
        >
          <Text>Current Price</Text>
          <Text size="20px" weight={700} margin="5px 0px">
            {(inverted ? pool?.token1Price : pool?.token0Price)?.toSignificant(6)}{' '}
          </Text>
          <Text size="12px" opacity={0.7} sx={{ lineHeight: '16px' }}>
            {currencyQuote?.symbol} per {currencyBase?.symbol}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default PriceRangeSection

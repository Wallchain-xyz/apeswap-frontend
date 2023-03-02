import { Currency, CurrencyAmount, Percent, Price, Token } from '@ape.swap/sdk-core'
import { Pool, Position } from '@ape.swap/v3-sdk'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Button, Flex, Modal, NumericInput, Text } from 'components/uikit'
import { BigNumber } from 'ethers'
import { Bound } from 'state/mint/v3/actions'
import PriceRangeSection from 'views/Positions/components/PriceRangeSection'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'

const ConfirmAddLiquidity = ({
  parsedAmounts,
  baseCurrency,
  quoteCurrency,
  position,
  outOfRange,
  noLiquidity,
  ticksAtLimit,
}: {
  parsedAmounts: {
    CURRENCY_A?: CurrencyAmount<Currency> | undefined
    CURRENCY_B?: CurrencyAmount<Currency> | undefined
  }
  ticksAtLimit: {
    LOWER: boolean | undefined
    UPPER: boolean | undefined
  }
  baseCurrency: Currency | undefined | null
  quoteCurrency: Currency | undefined | null
  position: Position | undefined
  outOfRange: boolean
  noLiquidity: boolean | undefined
}) => {
  const feeAmount = position?.pool.fee
  const inverted = true
  return (
    <Modal title="Add Liquidity" minWidth="300px" maxWidth="95%">
      <Flex sx={{ maxWidth: '100%', width: '420px', flexDirection: 'column' }}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            mt: '10px',
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <DoubleCurrencyLogo currency0={quoteCurrency} currency1={baseCurrency} />
            <Text weight={600}>
              &nbsp;{quoteCurrency?.symbol}&nbsp;/&nbsp;{baseCurrency?.symbol}
            </Text>
            <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
              <Text size="10px" sx={{ lineHeight: '9px' }}>
                {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
              </Text>
            </Flex>
          </Flex>
          <RangeTag removed={false} inRange={!outOfRange} />
        </Flex>
        <Flex sx={{ ...styles.subContainer, mt: '10px', background: 'white3' }}>
          <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <CurrencyLogo currency={quoteCurrency} size={18} />
              <Text ml="5px" size="14px">
                {quoteCurrency?.symbol}
              </Text>
            </Flex>
            <Flex>
              <Text size="14px" mr="10px">
                {inverted ? position?.amount0.toSignificant(4) : position?.amount1.toSignificant(4)}
              </Text>
            </Flex>
          </Flex>
          <Flex
            sx={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '25px',
            }}
          >
            <Flex sx={{ alignItems: 'center' }}>
              <CurrencyLogo currency={baseCurrency} size={18} />
              <Text size="14px" ml="5px">
                {baseCurrency?.symbol}
              </Text>
            </Flex>
            <Flex>
              <Text size="14px" mr="10px">
                {inverted ? position?.amount1.toSignificant(4) : position?.amount0.toSignificant(4)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <PriceRangeSection
          currencyQuote={quoteCurrency}
          currencyBase={baseCurrency}
          removed={false}
          inRange={!outOfRange}
          inverted={inverted}
          manuallyInverted={false}
          pool={position?.pool}
          priceUpper={position?.token0PriceUpper}
          priceLower={position?.token0PriceLower}
          tickAtLimit={ticksAtLimit}
          setManuallyInverted={() => null}
        />
        <Text margin="10px 0px" weight={700}>
          Add liquidity
        </Text>
      </Flex>
    </Modal>
  )
}

export default ConfirmAddLiquidity

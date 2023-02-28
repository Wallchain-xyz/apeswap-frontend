import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { Flex, Svg, Text } from 'components/uikit'
import { useMemo, useState } from 'react'
import { InterfaceTrade } from 'state/routing/types'
import { computeRealizedPriceImpact, warningSeverity } from 'utils/prices'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles'
import TradePrice from './TradePrice'
import { formatPriceImpact, getTokenPath } from '../utils'
import RouteDiagram from './RouteDiagram'
import { Divider } from 'theme-ui'

const TradeDetails = ({
  trade,
  allowedSlippage,
}: {
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const formattedGasPriceString = trade?.gasUseEstimateUSD
    ? trade.gasUseEstimateUSD.toFixed(2) === '0.00'
      ? '<$0.01'
      : '$' + trade.gasUseEstimateUSD.toFixed(2)
    : undefined

  const { expectedOutputAmount, priceImpact } = useMemo(() => {
    return {
      expectedOutputAmount: trade?.outputAmount,
      priceImpact: trade ? computeRealizedPriceImpact(trade) : undefined,
    }
  }, [trade])

  const routes = trade ? getTokenPath(trade) : []

  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact.lessThan('0')) return 'success'
    const severity = warningSeverity(priceImpact)
    if (severity < 1) return 'text'
    if (severity < 3) return 'yellow'
    return 'error'
  }, [priceImpact])

  return trade ? (
    <Flex sx={styles.dexTradeInfoContainer}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }} onClick={() => setIsOpen((prev) => !prev)}>
        <TradePrice price={trade?.executionPrice} />
        <Svg icon="caret" direction={isOpen ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', width: '100%' }}
          >
            <Divider backgroundColor="white4" />
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="14px">Price impact</Text>
              <Text size="14px" color={priceImpactColor}>
                {priceImpact ? formatPriceImpact(priceImpact) : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="14px"> Estimated gas </Text>
              <Text size="14px"> {formattedGasPriceString} </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="14px">Expected output</Text>
              <Text size="14px">
                {expectedOutputAmount
                  ? `${expectedOutputAmount.toSignificant(6)}  ${expectedOutputAmount.currency.symbol}`
                  : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="14px">
                {trade?.tradeType === TradeType.EXACT_INPUT ? 'Minimum received' : 'Maximum sent'}
              </Text>
              <Text size="14px">
                {trade?.tradeType === TradeType.EXACT_INPUT
                  ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
                  : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
              </Text>
            </Flex>
            <Flex
              sx={{
                background: 'white4',
                padding: '10px',
                borderRadius: '10px',
                mt: '5px',
                flexDirection: 'column',
              }}
            >
              <Flex sx={{ mb: '10px', alignItems: 'center', justifyContent: 'space-between' }} weight={700}>
                <Text>Alpha Router</Text>
                <Svg icon="question" width={15} />
              </Flex>
              <RouteDiagram
                currencyIn={trade.inputAmount.currency}
                currencyOut={trade.outputAmount.currency}
                routes={routes}
              />
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  ) : (
    <></>
  )
}

export default TradeDetails

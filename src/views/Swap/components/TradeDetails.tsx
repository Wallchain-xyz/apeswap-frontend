import { Currency, TradeType } from '@ape.swap/sdk-core'
import { Flex, Svg, Text } from 'components/uikit'
import { useMemo, useState } from 'react'
import { InterfaceTrade } from 'state/routing/types'
import { computeRealizedPriceImpact } from 'utils/prices'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles'
import TradePrice from './TradePrice'
import { formatPriceImpact, getTokenPath } from '../utils'
import RouteDiagram from './RouteDiagram'

const TradeDetails = ({ trade }: { trade: InterfaceTrade<Currency, Currency, TradeType> | undefined }) => {
  console.log(trade)
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

  console.log(routes)

  return (
    <Flex sx={styles.dexTradeInfoContainer}>
      <Flex sx={{ width: '100%' }} onClick={() => setIsOpen((prev) => !prev)}>
        <TradePrice price={trade?.executionPrice} />
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
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text> Estimated Gas </Text>
              <Text> {formattedGasPriceString} </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Expected Output</Text>
              <Text>
                {' '}
                {expectedOutputAmount
                  ? `${expectedOutputAmount.toSignificant(6)}  ${expectedOutputAmount.currency.symbol}`
                  : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Price Impact</Text>
              <Text>{priceImpact ? formatPriceImpact(priceImpact) : '-'}</Text>
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
                <Svg icon="question" width={15}/>
              </Flex>
              <RouteDiagram
                currencyIn={trade?.inputAmount.currency}
                currencyOut={trade?.outputAmount.currency}
                routes={routes}
              />
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default TradeDetails

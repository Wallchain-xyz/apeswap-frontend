import { Flex, Svg, Text } from 'components/uikit'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles'
import TradePrice from './TradePrice'
import { toPrecisionAvoidExponential } from '../utils'
import { Divider } from 'theme-ui'
import { Route } from '@lifi/sdk'
import { getBNWithDecimals } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'

const RouteDetails = ({ route }: { route: Route }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const formattedGasPriceString = route?.gasCostUSD

  const { expectedOutputAmount, expectedOutputMin, priceImpact } = useMemo(() => {
    return {
      expectedOutputAmount: toPrecisionAvoidExponential(getBNWithDecimals(route?.toAmount, route?.toToken?.decimals) ?? new BigNumber(0)),
      expectedOutputMin: toPrecisionAvoidExponential(getBNWithDecimals(route?.toAmountMin, route?.toToken?.decimals) ?? new BigNumber(0)),
      priceImpact: ((parseFloat(route?.fromAmountUSD) - parseFloat(route?.toAmountUSD)) * 100) / parseFloat(route?.fromAmountUSD),
    }
  }, [route?.fromAmountUSD, route?.toAmount, route?.toAmountMin, route?.toAmountUSD, route?.toToken?.decimals])

  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact < 2) return 'success'
    if (priceImpact < 5) return 'yellow'
    return 'error'
  }, [priceImpact])

  return (
    <Flex sx={styles.dexTradeInfoContainer}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <TradePrice fromAmount={route?.fromAmount}
                    fromToken={route?.fromToken}
                    toAmount={route?.toAmount}
                    toToken={route?.toToken}
        />
        <Flex sx={{ width: '100%', justifyContent: 'flex-end' }} onClick={() => setIsOpen((prev) => !prev)}>
          <Svg icon='caret' direction={isOpen ? 'up' : 'down'} />
        </Flex>
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
            <Divider backgroundColor='white4' />
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size='12px'>Price impact</Text>
              <Text size='12px' color={priceImpactColor}>
                {priceImpact ? `${priceImpact.toFixed(2)} %` : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size='12px'> Estimated gas </Text>
              <Text size='12px'> ${formattedGasPriceString} </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size='12px'>Expected output</Text>
              <Text size='12px'>
                {expectedOutputAmount
                  ? `${expectedOutputAmount}  ${route?.toToken?.symbol}`
                  : '-'}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size='12px'>
                Minimum received
              </Text>
              <Text size='12px'>
                {`${expectedOutputMin} ${route?.toToken?.symbol}`}
              </Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default RouteDetails

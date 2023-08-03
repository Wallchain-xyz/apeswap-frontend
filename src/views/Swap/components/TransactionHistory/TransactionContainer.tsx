// Components
import styles from './styles'
import { Flex, Svg, Text, Link } from 'components/uikit'
import { Spinner } from 'theme-ui'
import OmniTokenImage from 'components/OmniChain/OmniTokenImage'

// Hooks
import useNativeCurrency from 'lib/hooks/useNativeCurrency'

// Types, Constants, Utils
import { ObieDoesntUnderstandRoutes } from './data'
import { getEtherscanLink } from 'utils'
import { ChainId, NETWORK_LABEL } from 'config/constants/chains'

const TransactionContainer = ({ route }: { route: ObieDoesntUnderstandRoutes }) => {
  // Exclusively using these because I don't know how routes work
  const fromCurrency = useNativeCurrency(route.fromChain)
  const toCurrency = useNativeCurrency(route.toChain)

  return (
    <Link
      key={route.txHash}
      target="_blank"
      sx={{ textDecoration: 'none' }}
      href={getEtherscanLink(route.txHash, 'transaction', route.fromChain)}
    >
      <Flex sx={styles.historicalTxContainer}>
        {/* Header Section */}
        <Flex
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Text sx={{ fontSize: '14px', fontWeight: '300' }}>{route.date}</Text>
          <Text sx={{ fontSize: '14px', fontWeight: '300' }}>{route.time}</Text>
        </Flex>

        {/* Token Images & Info */}
        <Flex>
          <OmniTokenImage size={35} currency={fromCurrency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '14px' }}>
              {route.fromAmount} {fromCurrency.symbol}
            </Text>
            <Text sx={{ fontSize: '12px', fontWeight: '300' }}>
              ${route.fromAmountUsd} of {fromCurrency.symbol} on {NETWORK_LABEL[route.fromChain as ChainId]}
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ width: '15px', height: '15px', ml: '15px' }}>
          <Svg icon="arrow" direction="down" />
        </Flex>
        <Flex>
          <OmniTokenImage size={35} currency={toCurrency} />
          <Flex sx={{ flexDirection: 'column', ml: '10px' }}>
            <Text sx={{ fontSize: '16px', fontWeight: '700', lineHeight: '14px' }}>
              {route.toAmount} {toCurrency.symbol}
            </Text>
            <Text sx={{ fontSize: '12px', fontWeight: '300' }}>
              ${route.toAmountUsd} of {toCurrency.symbol} on {NETWORK_LABEL[route.toChain as ChainId]}
            </Text>
          </Flex>
        </Flex>

        {/* Status */}
        <Flex sx={styles.statusContainer}>
          {route.status === 'success' ? (
            <Svg width="20px" height="20px" icon="success" />
          ) : route.status === 'failed' ? (
            <Svg width="20px" height="20px" color="error" icon="error" />
          ) : (
            <Spinner width="20px" height="20px" />
          )}
        </Flex>
      </Flex>
    </Link>
  )
}
export default TransactionContainer

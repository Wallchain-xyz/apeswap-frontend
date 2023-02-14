import { Flex, Svg, Text } from 'components/uikit'
import { useRouter } from 'next/router'
import styles from './styles'

export const V3LiquiditySubNav = () => {
  const { pathname, push } = useRouter()

  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Flex
        sx={{ ...styles.liquiditySelector, mr: '20px' }}
        onClick={() => push('/liquidity')}
        to="/liquidity"
        id="zap-link"
      >
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={pathname.includes('/liquidity') ? 'text' : 'textDisabled'} icon="Positions" width="20px" />
        </Flex>
        <Text color={pathname.includes('/liquidity') ? 'text' : 'textDisabled'}>Positions</Text>
      </Flex>
      <Flex sx={styles.liquiditySelector} onClick={() => push('/add-liquidity')}>
        <Text
          color={pathname.includes('add-liquidity') ? 'text' : 'textDisabled'}
          sx={{ whiteSpace: 'nowrap' }}
          id="add-liquidity-link"
        >
          + Add
        </Text>
      </Flex>
    </Flex>
  )
}

import { Percent } from '@ape.swap/sdk-core'
import { Position } from '@ape.swap/v3-sdk'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Flex, Text } from 'components/uikit'
import { useToken } from 'hooks/Tokens'
import useIsTickAtLimit from 'hooks/useIsTickAtLimit'
import { usePool } from 'hooks/usePools'
import { PositionDetails } from 'lib/types/position'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Bound } from 'state/mint/v3/actions'
import { formatTickPrice } from 'utils/formatTickPrice'
import { unwrappedToken } from 'utils/unwrappedToken'
import { getPriceOrderingFromPosition } from '../helpers'

const PositionCard = ({
  positionItem,
  selectedTokenId,
  handleSelectedTokenId,
}: {
  positionItem: PositionDetails
  selectedTokenId?: string
  handleSelectedTokenId: (tokenId: string) => void
}) => {
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionItem
  const { push } = useRouter()
  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)
  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined
  const [, pool] = usePool(currency0 ?? undefined, currency1 ?? undefined, feeAmount)
  const position = useMemo(() => {
    if (pool) {
      return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
    }
    return undefined
  }, [liquidity, pool, tickLower, tickUpper])

  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper)

  // prices
  const { priceLower, priceUpper, quote, base } = getPriceOrderingFromPosition(position)

  const currencyQuote = quote && unwrappedToken(quote)
  const currencyBase = base && unwrappedToken(base)

  // check if price is within range
  const outOfRange: boolean = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false

  const removed = liquidity?.eq(0)

  const inRange = !outOfRange

  const isSelected = tokenId.toString() === selectedTokenId

  return (
    <Flex
      sx={{
        height: '80px',
        background: 'white3',
        borderRadius: '10px',
        justifyContent: 'center',
        padding: '10px',
        margin: '5px 0px',
        flexDirection: 'column',
        cursor: 'pointer',
        border: isSelected && '1px solid red',
      }}
      onClick={() => handleSelectedTokenId(tokenId.toString())}
    >
      <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <DoubleCurrencyLogo currency0={currency0} currency1={currency1} />
          <Text weight={600}>
            &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
          </Text>
          <Flex
            sx={{
              padding: '5px',
              borderRadius: '5px',
              background: 'white4',
              alignItems: 'center',
              justifyContent: 'center',
              ml: '5px',
            }}
          >
            <Text size="10px" sx={{ lineHeight: '9px' }}>
              {new Percent(feeAmount, 1_000_000).toSignificant()}%
            </Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            padding: '5px',
            borderRadius: '5px',
            background: 'white4',
            alignItems: 'center',
            justifyContent: 'center',
            ml: '5px',
          }}
        >
          <Text size="10px" sx={{ lineHeight: '9px' }}>
            {removed ? 'Closed' : inRange ? 'In range' : 'Out of range'}
          </Text>
        </Flex>
      </Flex>
      <Flex sx={{ alignItems: 'flex-end', height: '100%' }}>
        <Text size="14px" sx={{ lineHeight: '12px' }}>
          {formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)}-
        </Text>
        <Text size="14px" sx={{ lineHeight: '12px' }}>
          {formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PositionCard

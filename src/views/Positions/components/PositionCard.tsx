import { Percent } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { Position } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Flex, Skeleton, Text } from 'components/uikit'
import { useToken } from 'hooks/Tokens'
import useIsTickAtLimit from 'hooks/useIsTickAtLimit'
import { usePool } from 'hooks/usePools'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { useTotalSupply } from 'hooks/useTotalSupply'
import JSBI from 'jsbi'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import { PositionDetails } from 'lib/types/position'
import { useMemo, useState } from 'react'
import { Bound } from 'state/mint/v3/actions'
import { formatTickPrice } from 'utils/formatTickPrice'
import { unwrappedToken } from 'utils/unwrappedToken'
import { getPriceOrderingFromPosition } from '../helpers'
import RangeTag from './RangeTag'
import styles from './styles'

export function MinimalPositionCard({
  pair,
  showUnwrapped = false,
  border,
}: {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
}) {
  const { account } = useWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0)) ? (
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Flex>
                <Text weight={500} size='18px'>
                  Your position
                </Text>
              </Flex>
            </Flex>
            <Flex onClick={() => setShowMore(!showMore)} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Flex>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
                <Text fontWeight={500} fontSize={20}>
                  {currency0.symbol}/{currency1.symbol}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={500} fontSize={20}>
                  {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex>
                <Text fontSize={16} fontWeight={500}>
                  Your pool share:
                </Text>
                <Text fontSize={16} fontWeight={500}>
                  {poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={16} fontWeight={500}>
                  {currency0.symbol}:
                </Text>
                {token0Deposited ? (
                  <Flex>
                    <Text fontSize={16} fontWeight={500} marginLeft="6px">
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex>
                <Text fontSize={16} fontWeight={500}>
                  {currency1.symbol}:
                </Text>
                {token1Deposited ? (
                  <Flex>
                    <Text fontSize={16} fontWeight={500} marginLeft="6px">
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex>
          <Flex>
            <span role="img" aria-label="wizard-icon">
              ⭐️
            </span>{' '}
            <Text>
              By adding liquidity you&apos;ll earn 0.3% of all trades on this pair proportional to your share of the
              pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  )
}

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

  const [token0PriceUsd, token0PriceUsdLoading] = useTokenPriceUsd(token0)
  const [token1PriceUsd, token1PriceUsdLoading] = useTokenPriceUsd(token1)

  const liquidityUsdAmount = useMemo(() => {
    if (!position || !token0PriceUsd || !token1PriceUsd) return null
    const amount0 = token0PriceUsd * parseFloat(position.amount0.toSignificant(6))
    const amount1 = token1PriceUsd * parseFloat(position.amount1.toSignificant(6))
    return amount0 + amount1
  }, [position, token0PriceUsd, token1PriceUsd])

  const valuesLoading = token0PriceUsdLoading || token1PriceUsdLoading || !position

  return (
    <Flex
      sx={{ ...styles.positionCardContainer, boxShadow: isSelected && '0px 0px 8px' }}
      onClick={() => handleSelectedTokenId(tokenId.toString())}
    >
      <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <DoubleCurrencyLogo currency0={currencyQuote} currency1={currencyBase} />
          <Text weight={600}>
            &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
          </Text>
          <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
            <Text size="10px" sx={{ lineHeight: '9px' }}>
              {new Percent(feeAmount, 1_000_000).toSignificant()}%
            </Text>
          </Flex>
        </Flex>
        <RangeTag removed={removed} inRange={inRange} />
      </Flex>
      <Flex sx={{ alignItems: 'flex-end', height: '100%', justifyContent: 'space-between' }}>
        <Flex>
          {valuesLoading ? (
            <Skeleton width={200} height={20} animation="waves" />
          ) : (
            <>
              <Text size="12px" sx={{ lineHeight: '12px' }}>
                {formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)}
              </Text>
              <Text size="12px" sx={{ lineHeight: '12px' }} margin="0px 2.5px">
                {' '}
                -{' '}
              </Text>
              <Text size="12px" sx={{ lineHeight: '12px' }}>
                {formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)}
              </Text>
              <Text size="12px" sx={{ lineHeight: '12px' }} ml="5px">
                {currencyQuote?.symbol} / {currencyQuote?.symbol}
              </Text>
            </>
          )}
        </Flex>
        <Flex>
          <Text size="14px" weight={700} sx={{ lineHeight: '18px' }} ml="10px">
            {valuesLoading ? (
              <Skeleton width={50} height={20} animation="waves" />
            ) : (
              `$${liquidityUsdAmount?.toFixed(2)}`
            )}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PositionCard

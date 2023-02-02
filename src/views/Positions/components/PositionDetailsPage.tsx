import { Percent } from '@ape.swap/sdk-core'
import { Position } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'ethers'
import { useToken } from 'hooks/Tokens'
import useIsTickAtLimit from 'hooks/useIsTickAtLimit'
import { usePool } from 'hooks/usePools'
import { usePositionTokenURI } from 'hooks/usePositionTokenURI'
import { useV3PositionFees } from 'hooks/useV3PositionFees'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Bound } from 'state/mint/v3/actions'
import { Switch } from 'theme-ui'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { formatTickPrice } from 'utils/formatTickPrice'
import { unwrappedToken } from 'utils/unwrappedToken'
import Claim from '../actions/Claim'
import { getPriceOrderingFromPosition, getRatio, positionInverter } from '../helpers'
import RangeTag from './RangeTag'
import styles from './styles'

const PositionDetailsPage = ({ selectedTokenId }: { selectedTokenId?: string }) => {
  const { chainId, account, provider } = useWeb3React()
  const parsedTokenId = selectedTokenId ? BigNumber.from(selectedTokenId) : undefined
  const { loading, position: positionDetails } = useV3PositionFromTokenId(parsedTokenId)
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionDetails || {}

  const removed = liquidity?.eq(0)

  const { t } = useTranslation()

  const metadata = usePositionTokenURI(parsedTokenId)

  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)

  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined

  // flag for receiving WETH
  const [receiveWETH, setReceiveWETH] = useState(false)
  const nativeCurrency = useNativeCurrency()
  const nativeWrappedSymbol = nativeCurrency.wrapped.symbol

  const [poolState, pool] = usePool(token0 ?? undefined, token1 ?? undefined, feeAmount)

  const position = useMemo(() => {
    if (pool && liquidity && typeof tickLower === 'number' && typeof tickUpper === 'number') {
      return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
    }
    return undefined
  }, [liquidity, pool, tickLower, tickUpper])

  const pricesFromPosition = getPriceOrderingFromPosition(position)

  const [manuallyInverted, setManuallyInverted] = useState(false)

  // handle manual inversion
  const { priceLower, priceUpper, base } = positionInverter({
    priceLower: pricesFromPosition.priceLower,
    priceUpper: pricesFromPosition.priceUpper,
    quote: pricesFromPosition.quote,
    base: pricesFromPosition.base,
    invert: manuallyInverted,
  })

  const inverted = token1 ? base?.equals(token1) : undefined
  const currencyQuote = inverted ? currency0 : currency1
  const currencyBase = inverted ? currency1 : currency0

  const ratio = useMemo(() => {
    return priceLower && pool && priceUpper
      ? getRatio(
          inverted ? priceUpper.invert() : priceLower,
          pool.token0Price,
          inverted ? priceLower.invert() : priceUpper,
        )
      : undefined
  }, [inverted, pool, priceLower, priceUpper])

  const showCollectAsWeth = currency0?.isNative || currency1?.isNative

  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper)

  // check if price is within range
  const below = pool && typeof tickLower === 'number' ? pool.tickCurrent < tickLower : undefined
  const above = pool && typeof tickUpper === 'number' ? pool.tickCurrent >= tickUpper : undefined
  const inRange: boolean = typeof below === 'boolean' && typeof above === 'boolean' ? !below && !above : false

  // these currencies will match the feeValue{0,1} currencies for the purposes of fee collection
  const currency0ForFeeCollectionPurposes = pool ? (receiveWETH ? pool.token0 : unwrappedToken(pool.token0)) : undefined
  const currency1ForFeeCollectionPurposes = pool ? (receiveWETH ? pool.token1 : unwrappedToken(pool.token1)) : undefined

  const [feeValue0, feeValue1] = useV3PositionFees(pool ?? undefined, positionDetails?.tokenId, receiveWETH)

  const feeValueUpper = inverted ? feeValue0 : feeValue1
  const feeValueLower = inverted ? feeValue1 : feeValue0

  console.log(loading, pool)

  return (
    <Flex variant="flex.v3SubDexContainer">
      <Flex sx={{ height: '30px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <DoubleCurrencyLogo currency0={currency0} currency1={currency1} />
          <Text weight={600}>
            &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
          </Text>
          <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
            <Text size="10px" sx={{ lineHeight: '9px' }}>
              {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Button size="sm" mr="10px">
            Remove
          </Button>
          <Button size="sm" mr="10px">
            Add
          </Button>
          <RangeTag removed={removed} inRange={inRange} />
        </Flex>
      </Flex>
      <Flex sx={{ height: '362px', mt: '20px' }}>
        <Flex sx={{ width: '100%', mr: '10px', borderRadius: '10px' }}>
          {'result' in metadata && (
            <Image
              src={metadata.result.image || ''}
              alt={selectedTokenId || ''}
              height={100}
              width={100}
              // height="100%"
              // width="100%"
              sx={{ height: '100%', width: '100%' }}
            />
          )}
        </Flex>
        <Flex sx={{ width: '100%', ml: '10x', flexDirection: 'column' }}>
          <Flex
            sx={{
              height: '45%',
              mb: '10px',
              borderRadius: '10px',
              flexDirection: 'column',
              padding: '10px 15px',
              justifyContent: 'space-between',
              background: 'white3',
            }}
          >
            <Text size="16px">{t('Liquidity')}</Text>
            <Text size="22px" weight={700}>
              $20
            </Text>
            <Flex sx={styles.subContainer}>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={currencyQuote} size={18} />
                  <Text ml="5px" size="14px">
                    {currencyQuote?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {inverted ? position?.amount0.toSignificant(4) : position?.amount1.toSignificant(4)}
                  </Text>
                  <Text size="12px" opacity={0.7}>
                    {typeof ratio === 'number' && !removed ? <Text>{inverted ? ratio : 100 - ratio}%</Text> : null}
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
                  <CurrencyLogo currency={currencyBase} size={18} />
                  <Text size="14px" ml="5px">
                    {currencyBase?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {inverted ? position?.amount1.toSignificant(4) : position?.amount0.toSignificant(4)}
                  </Text>
                  <Text size="12px" opacity={0.7}>
                    {typeof ratio === 'number' && !removed ? <Text>{inverted ? 100 - ratio : ratio}%</Text> : null}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            {/* <Text>${fiatValueOfLiquidity.toFixed(2, { groupSeparator: ',' })}</Text> */}
          </Flex>
          <Flex
            sx={{
              height: '55%',
              mt: '10px',
              borderRadius: '10px',
              flexDirection: 'column',
              padding: '15px 15px',
              justifyContent: showCollectAsWeth ? 'space-between' : 'space-around',
              background: 'white3',
            }}
          >
            <Text size="16px">{t('Unclaimed Fees')}</Text>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text size="22px" weight={700}>
                $20
              </Text>
              <Claim
                currency0ForFeeCollectionPurposes={currency0ForFeeCollectionPurposes}
                currency1ForFeeCollectionPurposes={currency1ForFeeCollectionPurposes}
                tokenId={tokenId}
                feeValue0={feeValue0}
                feeValue1={feeValue1}
              />
            </Flex>
            <Flex sx={styles.subContainer}>
              <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <CurrencyLogo currency={feeValueUpper?.currency} size={18} />
                  <Text ml="5px" size="14px">
                    {feeValueUpper?.currency?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {feeValueUpper ? formatCurrencyAmount(feeValueUpper, 4) : '-'}
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
                  <CurrencyLogo currency={feeValueLower?.currency} size={18} />
                  <Text ml="5px" size="14px">
                    {feeValueLower?.currency?.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" mr="10px">
                    {feeValueLower ? formatCurrencyAmount(feeValueLower, 4) : '-'}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            {showCollectAsWeth && (
              <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size="14px">
                  {t('Claim as ')}
                  {nativeWrappedSymbol}
                </Text>
                <Flex>
                  <Switch onChange={() => setReceiveWETH((receiveWETH) => !receiveWETH)} />
                </Flex>
              </Flex>
            )}
            {/* <Text>${fiatValueOfLiquidity.toFixed(2, { groupSeparator: ',' })}</Text> */}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        sx={{
          height: '30px',
          margin: '20px 0px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Text mr="5px"> {t('Price Range')} </Text>
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
              <Text> {t('Min Price')} </Text>
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
              <Text> {t('Max Price')} </Text>
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
    </Flex>
  )
}

export default PositionDetailsPage

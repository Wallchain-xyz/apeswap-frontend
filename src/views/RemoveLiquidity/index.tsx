import { Currency, Percent } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import CurrencyLogo from 'components/CurrencyLogo'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Button, Flex, Modal, NumericInput, Text } from 'components/uikit'
import Input from 'components/uikit/Input/Input'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import { BigNumber } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import { useState } from 'react'
import { useBurnV3ActionHandlers, useBurnV3State, useDerivedV3BurnInfo } from 'state/burn/v3/hooks'
import { Switch } from 'theme-ui'
import { unwrappedToken } from 'utils/unwrappedToken'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'
import Remove from './actions/Remove'

const RemoveLiquidity = ({
  tokenId,
  token0Address,
  token1Address,
  feeAmount,
  inRange,
}: {
  tokenId: string | undefined
  token0Address: string | undefined
  token1Address: string | undefined
  feeAmount: number | undefined
  inRange: boolean
}) => {
  const { account, chainId, provider } = useWeb3React()
  const { position } = useV3PositionFromTokenId(BigNumber?.from(tokenId) || '')

  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)
  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined

  // flag for receiving WETH
  const [receiveWETH, setReceiveWETH] = useState(false)
  const nativeCurrency = useNativeCurrency()
  const nativeWrappedSymbol = nativeCurrency.wrapped.symbol

  // burn state
  const { percent } = useBurnV3State()
  const {
    position: positionSDK,
    liquidityPercentage,
    liquidityValue0,
    liquidityValue1,
    feeValue0,
    feeValue1,
    outOfRange,
    error,
  } = useDerivedV3BurnInfo(position, receiveWETH)
  const { onPercentSelect } = useBurnV3ActionHandlers()

  const removed = position?.liquidity?.eq(0)

  const showCollectAsWeth = Boolean(
    liquidityValue0?.currency &&
      liquidityValue1?.currency &&
      (liquidityValue0.currency.isNative ||
        liquidityValue1.currency.isNative ||
        WRAPPED_NATIVE_CURRENCY[liquidityValue0.currency.chainId]?.equals(liquidityValue0.currency.wrapped) ||
        WRAPPED_NATIVE_CURRENCY[liquidityValue1.currency.chainId]?.equals(liquidityValue1.currency.wrapped)),
  )

  return (
    <Modal title="Decrease Position" minWidth="300px" maxWidth="95%">
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
            <DoubleCurrencyLogo currency0={feeValue0?.currency} currency1={feeValue1?.currency} />
            <Text weight={600}>
              &nbsp;{feeValue0?.currency.symbol}&nbsp;/&nbsp;{feeValue1?.currency.symbol}
            </Text>
            <Flex variant="flex.tag" sx={{ background: 'white4', ml: '5px' }}>
              <Text size="10px" sx={{ lineHeight: '9px' }}>
                {new Percent(feeAmount || 0, 1_000_000).toSignificant()}%
              </Text>
            </Flex>
          </Flex>
          <RangeTag removed={removed} inRange={inRange} />
        </Flex>
        <Flex
          sx={{
            height: '94px',
            background: 'white3',
            borderRadius: '10px',
            flexDirection: 'column',
            padding: '12px 15px',
            justifyContent: 'space-between',
            mt: '10px',
          }}
        >
          <Flex>
            <NumericInput
              onUserInput={(val) => {
                parseInt(val) > 100
                  ? onPercentSelect(100)
                  : val.toString() === ''
                  ? onPercentSelect(0)
                  : onPercentSelect(parseInt(val))
              }}
              value={`${percent}%`}
            />
          </Flex>
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <></>sd
            <Button size="sm" onClick={() => onPercentSelect(100)}>
              Max
            </Button>
          </Flex>
        </Flex>
        <Flex sx={{ ...styles.subContainer, background: 'white3', mt: '10px' }}>
          <Flex sx={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '25px' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <Text ml="5px" size="14px">
                Pooled {feeValue0?.currency.symbol}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
              <Text size="14px" mr="10px">
                {liquidityValue0?.toSignificant(4)}
              </Text>
              <CurrencyLogo currency={feeValue0?.currency} size={18} />
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
              <Text size="14px" ml="5px">
                Pooled {feeValue1?.currency.symbol}
              </Text>
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
              <Text size="14px" mr="10px">
                {liquidityValue1?.toSignificant(4)}
              </Text>
              <CurrencyLogo currency={feeValue1?.currency} size={18} />
            </Flex>
          </Flex>
        </Flex>
        <Remove
          liquidityValue0={liquidityValue0}
          liquidityValue1={liquidityValue1}
          liquidityPercentage={liquidityPercentage}
          positionSDK={positionSDK}
          tokenId={tokenId}
          feeValue0={feeValue0}
          feeValue1={feeValue1}
        />
      </Flex>
      {showCollectAsWeth && (
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '10px' }}>
          <Text size="14px">Collect as {nativeWrappedSymbol}</Text>
          <Flex>
            <Switch onChange={() => setReceiveWETH((receiveWETH) => !receiveWETH)} />
          </Flex>
        </Flex>
      )}
    </Modal>
  )
}

export default RemoveLiquidity

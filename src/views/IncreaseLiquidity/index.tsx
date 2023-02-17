import { Currency, Percent, Price, Token } from '@ape.swap/sdk-core'
import { Pool, Position } from '@ape.swap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import CurrencyLogo from 'components/CurrencyLogo'
import DexPanel from 'components/DexPanel'
import DoubleCurrencyLogo from 'components/DoubleCurrencyLogo'
import { Button, Flex, Modal, NumericInput, Text } from 'components/uikit'
import Input from 'components/uikit/Input/Input'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import { BigNumber } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import { useState } from 'react'
import { useBurnV3ActionHandlers, useBurnV3State, useDerivedV3BurnInfo } from 'state/burn/v3/hooks'
import { Field } from 'state/mint/v3/actions'
import { useV3DerivedMintInfo, useV3MintActionHandlers, useV3MintState } from 'state/mint/v3/hooks'
import { Switch } from 'theme-ui'
import { unwrappedToken } from 'utils/unwrappedToken'
import PriceRangeSection from 'views/Positions/components/PriceRangeSection'
import RangeTag from 'views/Positions/components/RangeTag'
import styles from 'views/Positions/components/styles'
import Add from './actions/Add'

const IncreaseLiquidity = ({
  quoteCurrency,
  baseCurrency,
  removed,
  inRange,
  inverted,
  manuallyInverted,
  priceUpper,
  priceLower,
  tickAtLimit,
  currentPosition,
  feeAmount,
  tokenId,
  setManuallyInverted,
}: {
  quoteCurrency: Currency | undefined
  baseCurrency: Currency | undefined
  removed: boolean | undefined
  inRange: boolean
  inverted: boolean | undefined
  manuallyInverted: boolean
  priceUpper: Price<Token, Token> | undefined
  priceLower: Price<Token, Token> | undefined
  feeAmount: number | undefined
  currentPosition: Position | undefined
  tokenId: BigNumber | undefined
  tickAtLimit: {
    LOWER: boolean | undefined
    UPPER: boolean | undefined
  }
  setManuallyInverted: (manuallyInverted: boolean) => void
}) => {
  const { account, chainId, provider } = useWeb3React()

  // mint state
  const { independentField, typedValue, startPriceTypedValue, rightRangeTypedValue, leftRangeTypedValue } =
    useV3MintState()

  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    parsedAmounts,
    currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit,
  } = useV3DerivedMintInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    currentPosition,
  )

  const { onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput, onStartPriceInput } =
    useV3MintActionHandlers(noLiquidity)

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const positionManager = useV3NFTPositionManagerContract()

  return (
    <Modal title="Increase Position" minWidth="300px" maxWidth="95%">
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
          <RangeTag removed={removed} inRange={inRange} />
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
                {inverted ? currentPosition?.amount0.toSignificant(4) : currentPosition?.amount1.toSignificant(4)}
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
                {inverted ? currentPosition?.amount1.toSignificant(4) : currentPosition?.amount0.toSignificant(4)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <PriceRangeSection
          currencyQuote={quoteCurrency}
          currencyBase={baseCurrency}
          removed={removed}
          inRange={inRange}
          inverted={inverted}
          manuallyInverted={manuallyInverted}
          pool={pool}
          priceUpper={priceUpper}
          priceLower={priceLower}
          tickAtLimit={tickAtLimit}
          setManuallyInverted={setManuallyInverted}
        />
        <Text margin="10px 0px" weight={700}>
          {' '}
          Add more liquidity{' '}
        </Text>
        <DexPanel
          onUserInput={onFieldBInput}
          value={formattedAmounts[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B] ?? null}
          onCurrencySelect={() => null}
          disableTokenSelect
        />
        <Flex sx={{ mt: '10px' }} />
        <DexPanel
          onUserInput={onFieldAInput}
          value={formattedAmounts[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A] ?? null}
          onCurrencySelect={() => null}
          disableTokenSelect
        />
      </Flex>
      <Add
        parsedAmounts={parsedAmounts}
        positionManager={positionManager}
        baseCurrency={currencies[Field.CURRENCY_A]}
        quoteCurrency={currencies[Field.CURRENCY_B]}
        position={position}
        outOfRange={outOfRange}
        hasExistingPosition={true}
        noLiquidity={noLiquidity}
        tokenId={tokenId?.toString()}
      />
    </Modal>
  )
}

export default IncreaseLiquidity

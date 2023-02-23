import { Percent } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { V2LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import DexPanel from 'components/DexPanel'
import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { useCallback, useState } from 'react'
import { Field } from 'state/burn/v2/actions'
import { useBurnActionHandlers, useBurnState, useDerivedBurnInfo } from 'state/burn/v2/hooks'
import Actions from './Actions'
import PoolInfo from './components/PoolInfo'

const RemoveLiquidityV2 = ({ currencyIdA, currencyIdB }: { currencyIdA: string; currencyIdB: string }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  // const [recentTransactions] = useUserRecentTransactions()
  const [tradeValueUsd, setTradeValueUsd] = useState(0)

  // Set currencies
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()

  // allowance handling
  const [, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const onLiquidityInput = useCallback(
    (typedValue: string): void => onUserInput(Field.LIQUIDITY, typedValue),
    [onUserInput],
  )

  const handleMaxInput = useCallback(() => {
    onUserInput(Field.LIQUIDITY_PERCENT, '100')
  }, [onUserInput])

  return (
    <Flex variant="flex.dexContainer">
      <DexNav />
      <V2LiquiditySubNav />
      <Flex sx={{ margin: '0px 0px 5px 0px', justifyContent: 'center', maxWidth: '100%', width: '420px' }}>
        <Text weight={700}>{t('REMOVE LIQUIDITY')}</Text>
      </Flex>
      <Flex sx={{ marginTop: '35px', flexWrap: 'wrap' }}>
        <DexPanel
          value={formattedAmounts[Field.LIQUIDITY_PERCENT]}
          setTradeValueUsd={setTradeValueUsd}
          panelText={t('Remove:')}
          currency={currencyA}
          otherCurrency={currencyB}
          fieldType={Field.LIQUIDITY_PERCENT}
          onCurrencySelect={() => null}
          onUserInput={(val) =>
            parseInt(val) > 100
              ? onLiquidityInput('100')
              : val.toString() === ''
              ? onLiquidityInput('0')
              : onLiquidityInput(parseInt(val).toString())
          }
          handleMaxInput={handleMaxInput}
          showCommonBases
        />
        <PoolInfo pair={pair} parsedAmounts={parsedAmounts} chainId={chainId} />
        <Actions pair={pair} error={error} parsedAmounts={parsedAmounts} tradeValueUsd={tradeValueUsd} />
      </Flex>
    </Flex>
  )
}

export default RemoveLiquidityV2

import React, { useCallback, useEffect, useState } from 'react'
import { Field, resetMintState } from 'state/mint/v2/actions'
import AddLiquiditySign from 'views/V2/AddLiquidityV2/components/AddLiquiditySign'
import PoolInfo from 'views/V2/AddLiquidityV2/components/PoolInfo'
import AddLiquidityActions from 'views/V2/AddLiquidityV2/components/Actions'
import { useSwapState } from 'state/swap/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/v2/hooks'
import { Currency, CurrencyAmount, Token } from '@ape.swap/sdk-core'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { Flex, Text } from 'components/uikit'
import DexPanel from 'components/DexPanel'
import Actions from 'views/V2/AddLiquidityV2/components/Actions'
import { useHandleCurrencyASelect, useHandleCurrencyBSelect } from 'views/V2/AddLiquidityV2/hooks'

interface RegularLiquidityProps {
  currencyIdA?: string
  currencyIdB?: string
  handleCurrenciesURL?: (Field: any, Currency: Currency, otherCurrency: string) => void
}

const RegularLiquidity: React.FC<RegularLiquidityProps> = ({ currencyIdA, currencyIdB, handleCurrenciesURL }) => {
  const { t } = useTranslation()
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  // Mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  // Navigation
  const handleCurrencyASelect = useHandleCurrencyASelect({
    currencyIdB: currencyIdB ?? '',
    currencyIdA: currencyIdA ?? '',
  })
  const handleCurrencyBSelect = useHandleCurrencyBSelect({
    currencyIdA: currencyIdA ?? '',
    currencyIdB: currencyIdB ?? '',
  })

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  // Action handlers

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  return (
    <Flex variant="flex.dexContainer">
      {noLiquidity && (
        <Flex sx={styles.warningMessageContainer}>
          <Text size="14px" weight={700} mb="10px" color="primaryBright">
            {t('You are the first liquidity provider.')}
          </Text>
          <Text size="12px" weight={500} color="primaryBright" sx={{ textAlign: 'center' }}>
            {t(
              'The ratio of tokens you add will set the price of this pool. Once you are happy with the rate click supply to review.',
            )}
          </Text>
        </Flex>
      )}
      <Flex sx={{ mb: '30px' }} />
      <DexPanel
        panelText="Token 1"
        onCurrencySelect={handleCurrencyASelect}
        onUserInput={onFieldAInput}
        handleMaxInput={() => {
          onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
        }}
        value={formattedAmounts[Field.CURRENCY_A]}
        currency={currencyA}
        otherCurrency={currencyB}
      />
      <AddLiquiditySign />
      <DexPanel
        panelText="Token 2"
        onCurrencySelect={handleCurrencyBSelect}
        onUserInput={onFieldBInput}
        handleMaxInput={() => {
          onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
        }}
        value={formattedAmounts[Field.CURRENCY_B]}
        currency={currencyB}
        otherCurrency={currencyA}
      />
      <PoolInfo
        currencies={currencies}
        poolTokenPercentage={poolTokenPercentage}
        noLiquidity={noLiquidity}
        price={price}
        liquidityMinted={liquidityMinted}
      />
      <Actions
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        error={error}
        noLiquidity={noLiquidity}
        price={price}
        poolTokenPercentage={poolTokenPercentage}
        liquidityMinted={liquidityMinted}
      />
    </Flex>
  )
}

export default React.memo(RegularLiquidity)

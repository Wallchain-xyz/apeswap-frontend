import DexPanel from 'components/DexPanel'
import PageContainer from 'components/PageContainer'
import { Flex } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { useRouter } from 'next/router'
import { useDerivedMintInfo, useMintState } from 'state/mint/v2/hooks'
import useHandleCurrencyASelect, { useHandleCurrencyBSelect } from './hooks'

const AddLiquidityV2 = ({ currencyIdA, currencyIdB }: { currencyIdA: string; currencyIdB: string }) => {
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  console.log(currencyA, currencyB)
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
  const handleCurrencyASelect = useHandleCurrencyASelect({ currencyIdB, currencyIdA })
  const handleCurrencyBSelect = useHandleCurrencyBSelect({ currencyIdA, currencyIdB })

  return (
    <Flex variant="flex.dexContainer">
      <DexPanel onCurrencySelect={handleCurrencyASelect} currency={currencyA} otherCurrency={currencyB} />
      <DexPanel onCurrencySelect={handleCurrencyBSelect} currency={currencyB} otherCurrency={currencyA} />
    </Flex>
  )
}

export default AddLiquidityV2

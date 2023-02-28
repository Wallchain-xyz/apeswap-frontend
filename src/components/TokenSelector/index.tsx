import { Currency } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
// import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import TokenListModal from 'components/TokenListModal'
import { Flex, Skeleton, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import React, { useCallback } from 'react'
import { styles } from './styles'

const TokenSelector = ({
  currency,
  onCurrencySelect,
  otherCurrency,
  isRemoveLiquidity,
  disableTokenSelect,
  typedValue,
  field,
  showCommonBases = false,
  isZapInput,
}: {
  currency?: Currency | null
  otherCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  field?: any
  typedValue?: string
  showCommonBases?: boolean
  disableTokenSelect?: boolean
  isRemoveLiquidity?: boolean
  isZapInput?: boolean
}) => {
  // const handleDynamicCurrencySelect = useCallback(
  //   (selectedCurrency: Currency) => {
  //     onCurrencySelect(field, selectedCurrency, typedValue)
  //   },
  //   [field, typedValue, onCurrencySelect],
  // )

  const [onPresentCurrencyModal] = useModal(
    <TokenListModal
      onDismiss={() => null}
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      // showCommonBases={showCommonBases}
      // isZapInput={isZapInput}
    />,
  )

  return disableTokenSelect ? (
    <Flex
      sx={{
        ...styles.primaryFlex,
        cursor: 'default',
        '&:active': { transform: 'none' },
        ':hover': { background: 'white4' },
      }}
    >
      {currency ? (
        <CurrencyLogo currency={currency} />
      ) : (
        <Skeleton width="30px" height="30px" animation="waves" variant="circle" />
      )}
      <Text sx={{ ...styles.tokenText }}>{currency?.symbol}</Text>
    </Flex>
  ) : isRemoveLiquidity ? (
    <Flex
      sx={{
        ...styles.primaryFlex,
        cursor: 'default',
        '&:active': { transform: 'none' },
        ':hover': { background: 'white4' },
      }}
    >
      {/* <DoubleCurrencyLogo currency0={currency} currency1={otherCurrency} size={30} /> */}
      <Text sx={styles.tokenText}>
        {currency?.symbol} - {otherCurrency?.symbol}
      </Text>
    </Flex>
  ) : (
    <Flex sx={styles.primaryFlex} onClick={onPresentCurrencyModal}>
      {currency ? (
        <CurrencyLogo currency={currency} />
      ) : (
        <Skeleton width="30px" height="30px" animation="waves" variant="circle" />
      )}
      <Text sx={styles.tokenText}>{currency?.symbol}</Text>
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(TokenSelector)

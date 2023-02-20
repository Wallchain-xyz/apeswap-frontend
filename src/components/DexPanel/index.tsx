// import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import { Input, Spinner } from 'theme-ui'
import React, { useEffect } from 'react'
// TODO: Figure out the best way to hadnle fields
// import { Field } from 'state/swap/actions'
// import { Field as MintField } from 'state/mint/actions'
// import { useCurrencyBalance } from 'state/wallet/hooks'
// import TokenSelector from '../TokenSelector'
import styles from './styles'
import { DexPanelProps } from './types'
// import Dots from 'components/Loader/Dots'
// import { useTokenPriceUsd } from 'hooks/useTokenPriceUsd'
import { Flex, NumericInput, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import TokenSelector from 'components/TokenSelector'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { Token } from '@ape.swap/sdk-core'
import { BigNumber } from 'ethers'
import JSBI from 'jsbi'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

const DexPanel = ({
  value,
  currency,
  onCurrencySelect,
  onUserInput,
  handleMaxInput,
  setTradeValueUsd,
  otherCurrency,
  fieldType,
  panelText,
  // lpPair,
  disabled,
  // smartRouter,
  independentField,
  ordersDisabled,
  disableTokenSelect,
  showCommonBases = false,
  isZapInput,
  userBalance,
  locked,
}: DexPanelProps) => {
  const { chainId, account } = useWeb3React()
  // const isRemoveLiquidity = !!lpPair
  // TODO: Fix usd balance calculation
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const currencyBalance = userBalance ? userBalance?.toFixed(6) : selectedCurrencyBalance?.toSignificant(6) || '0'

  const { t } = useTranslation()

  const [usdVal, loadingUsdValue] = useTokenPriceUsd(currency ?? undefined)

  // const usdVal = useTokenPriceUsd(chainId, lpPair?.liquidityToken || currency, isRemoveLiquidity, smartRouter)

  // useEffect(() => {
  //   if (setTradeValueUsd) {
  //     setTradeValueUsd(
  //       isRemoveLiquidity
  //         ? usdVal * parseFloat(currencyBalance) * (parseFloat(value) / 100)
  //         : usdVal * parseFloat(value),
  //     )
  //   }
  // }, [usdVal, value, currencyBalance, isRemoveLiquidity, setTradeValueUsd])

  return (
    <Flex sx={styles.dexPanelContainer}>
      {locked && (
        <Flex
          sx={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'white3',
            opacity: 0.7,
            borderRadius: '10px',
            cursor: 'not-allowed',
          }}
        />
      )}
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericInput onUserInput={onUserInput} value={value} />
        {/* <NumericalInput
          value={isRemoveLiquidity ? `${value}%` : value}
          onUserInput={(val) => onUserInput(fieldType, val)}
          removeLiquidity={isRemoveLiquidity}
          align="left"
          id="token-amount-input"
          disabled={(independentField && independentField !== fieldType && disabled) || ordersDisabled}
          disabledText={independentField && independentField !== fieldType && disabled}
        /> */}
        <TokenSelector
          currency={currency}
          otherCurrency={otherCurrency}
          onCurrencySelect={onCurrencySelect}
          disableTokenSelect={disableTokenSelect}
          // showCommonBases={showCommonBases}
          // disableTokenSelect={disableTokenSelect}
          // isRemoveLiquidity={isRemoveLiquidity}
          // field={fieldType}
          // typedValue={value}
          // isZapInput={isZapInput}
        />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: independentField && independentField !== fieldType && disabled && 0.4,
          }}
        >
          {loadingUsdValue ? (
            <Spinner width="15px" height="15px" />
          ) : (
            <Text size="12px" sx={styles.panelBottomText}>
              {value !== '.' &&
                value &&
                // `$${(lpPair
                //   ? usdVal * parseFloat(currencyBalance) * (parseFloat(value) / 100)
                //   : usdVal * parseFloat(value)
                // ).toFixed(2)}`}

                `$${(parseFloat(usdVal?.toExact() ?? '0') * parseFloat(value)).toFixed(2)}`}
            </Text>
          )}
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
              {/* {!currencyBalance && <Dots />} */}
            </Text>
            {parseFloat(currencyBalance) > 0 && handleMaxInput && (
              <Flex sx={styles.maxButton} size="sm" onClick={() => handleMaxInput(fieldType)}>
                <Text color="primaryBright" sx={{ lineHeight: '0px' }}>
                  {t('MAX')}
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(DexPanel)

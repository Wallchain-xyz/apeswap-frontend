import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import React from 'react'
import styles from './styles'
import { OmniChainPanelProps } from './types'
import { Flex, NumericInput, Text } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import TokenSelector from 'components/TokenSelector'
import Dots from 'components/Dots'
import useCurrencyBalanceWithChain from '../../../hooks/balances/useCurrencyBalanceWithChain'

const OmniChainPanel = ({
  panelText,
  value,
  currency,
  currencyChain,
  onCurrencySelect,
  onUserInput,
  handleMaxInput,
  fieldType,
  disabled,
  independentField,
  disableTokenSelect,
  apiPrice,
}: OmniChainPanelProps) => {
  const { account } = useWeb3React()
  const selectedCurrencyBalance = useCurrencyBalanceWithChain(
    account ?? undefined,
    currency ?? undefined,
    currencyChain ?? undefined, //make this dynamic and see if it is actually necessary
  )
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6) || '0'
  const { t } = useTranslation()

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericInput onUserInput={onUserInput} value={value} />
        <TokenSelector currency={currency} onCurrencySelect={onCurrencySelect} isOmniChain />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: independentField && independentField !== fieldType && disabled && 0.4,
          }}
        >
          {value && (
            <>
              {!apiPrice ? (
                <Spinner width="15px" height="15px" />
              ) : (
                <Text size="12px" sx={styles.panelBottomText}>
                  {value !== '.' && value && `$${apiPrice}`}
                </Text>
              )}
            </>
          )}
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
            </Text>
            {!currencyBalance && <Dots />}
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

export default OmniChainPanel

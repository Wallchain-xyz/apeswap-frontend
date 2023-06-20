import { useTranslation } from 'contexts/Localization'
import { Spinner } from 'theme-ui'
import React from 'react'
import { styles } from './styles'
import DualCurrencyDropdown from './DualCurrencyDropdown'
import useIsMobile from 'hooks/useIsMobile'
import { DualCurrencySelector } from 'views/Bonds/actions/types'
import { Currency } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { PairState, useV2Pair } from 'hooks/useV2Pairs'
import useTokenPriceUsd from 'hooks/useTokenPriceUsd'
import { Flex, NumericInput, Text } from 'components/uikit'
import Dots from 'components/Dots'

/**
 * Dropdown component that supports both single currencies and currency pairs. An array of pairs is passed as lpList,
 * while the single currencies are fetched by the component itself
 * @param handleMaxInput function to set max available user's balance
 * @param onUserInput function to set input's value
 * @param value input's value
 * @param onCurrencySelect function to select the input's currency (both single and pairs)
 * @param inputCurrencies selected currencies for the input
 * @param lpList param to define the list of pairs to be used by the component
 * @param enableZap determines whether zap functionality is enabled for the selected product
 */

interface DualCurrencyPanelProps {
  handleMaxInput: () => void
  onUserInput: (val: string) => void
  value: string
  onCurrencySelect: (currency: DualCurrencySelector) => void
  inputCurrencies: Currency[]
  lpList: DualCurrencySelector[]
  enableZap?: boolean
}

const DualCurrencyPanel: React.FC<DualCurrencyPanelProps> = ({
  handleMaxInput,
  onUserInput,
  value,
  onCurrencySelect,
  inputCurrencies,
  lpList,
  enableZap,
}) => {
  const { account } = useWeb3React()
  const [pairState, pair] = useV2Pair(inputCurrencies[0], inputCurrencies[1])
  const isMobile = useIsMobile()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken ?? inputCurrencies[0])
  console.log('selectedCurrencyBalance', selectedCurrencyBalance, selectedCurrencyBalance?.toSignificant(6))
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6)
  const { t } = useTranslation()

  const [usdVal] = useTokenPriceUsd(
    pairState === PairState.EXISTS ? pair?.liquidityToken : inputCurrencies[0],
    pairState === PairState.EXISTS && true,
  )

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <NumericInput
          value={value}
          onUserInput={(val) => onUserInput(val)}
          style={{ fontSize: isMobile ? '15px' : '22px', align: 'left' }}
          // removeLiquidity={isMobile}
        />
        <DualCurrencyDropdown
          inputCurrencies={inputCurrencies}
          onCurrencySelect={onCurrencySelect}
          lpList={lpList}
          enableZap={enableZap ?? true}
        />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
          }}
        >
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && value !== '0.0' ? (
              <Spinner width="15px" height="15px" />
            ) : value !== '0.0' && usdVal !== 0 && value ? (
              `$${(usdVal * parseFloat(value)).toFixed(2)}`
            ) : null}
          </Text>
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
              {!currencyBalance && <Dots />}
            </Text>
            {parseFloat(currencyBalance ?? '0') > 0 && (
              <Flex sx={styles.maxButton} size="sm" onClick={handleMaxInput}>
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

export default React.memo(DualCurrencyPanel)

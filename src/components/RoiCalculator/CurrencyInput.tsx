import React from 'react'
import styles from './styles'
import { Button, Flex, NumericInput, Text } from 'components/uikit'

interface CurrencyInputPanelProps {
  dollarValue: string
  tokenValue: string
  onUserInput: (value: string) => void
  onMax: () => void
  removeLiquidity?: boolean
}

const CurrencyInputPanelRoi = ({
  dollarValue,
  tokenValue,
  onUserInput,
  onMax,
  removeLiquidity,
}: CurrencyInputPanelProps) => {
  return (
    <Flex sx={styles.container}>
      <Flex sx={{ position: 'relative' }}>
        <Button onClick={onMax} variant="primary" style={styles.maxButton}>
          MAX
        </Button>
      </Flex>
      <Flex sx={styles.inputSection as any}>
        <Flex>
          <NumericInput value={tokenValue} onUserInput={onUserInput} />
        </Flex>
        <Text weight="light" variant="sm">
          {dollarValue ? `~ $${dollarValue}` : ' -'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(CurrencyInputPanelRoi)

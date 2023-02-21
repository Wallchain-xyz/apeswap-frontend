import { Flex, NumericInput, Text } from 'components/uikit'
import { useCallback, useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import { Box } from 'theme-ui'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0;
  }

  70% {
    box-shadow: 0 0 0 2px;
  }

  100% {
    box-shadow: 0 0 0 0;
  }
`

const RangeSelector = ({
  value,
  rangeType,
  disabled,
  tokenASymbol,
  tokenBSymbol,
  onRangeInput,
  onDecrementRange,
  onIncrementRange,
}: {
  value: string
  rangeType: 'Min Price' | 'Max Price'
  disabled?: boolean
  tokenASymbol?: string
  tokenBSymbol?: string
  onRangeInput: (input: string) => void
  onDecrementRange: () => string
  onIncrementRange: () => string
}) => {
  const [localValue, setLocalValue] = useState('')
  const [useLocalValue, setUseLocalValue] = useState(false)
  const [active, setActive] = useState(false)
  const [pulsing, setPulsing] = useState<boolean>(false)

  const handleOnFocus = () => {
    setUseLocalValue(true)
    setActive(true)
  }

  const handleOnBlur = useCallback(() => {
    setUseLocalValue(false)
    setActive(false)
    onRangeInput(localValue) // trigger update on parent value
  }, [localValue, onRangeInput])

  // for button clicks
  const handleDecrement = useCallback(() => {
    setUseLocalValue(false)
    onRangeInput(onDecrementRange())
  }, [onDecrementRange, onRangeInput])

  const handleIncrement = useCallback(() => {
    setUseLocalValue(false)
    onRangeInput(onIncrementRange())
  }, [onIncrementRange, onRangeInput])

  useEffect(() => {
    if (localValue !== value && !useLocalValue) {
      setTimeout(() => {
        setLocalValue(value) // reset local value to match parent
        setPulsing(true) // trigger animation
        setTimeout(function () {
          setPulsing(false)
        }, 1800)
      }, 0)
    }
  }, [localValue, useLocalValue, value])
  return (
    <Box
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      sx={{
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        height: '85px',
        width: '280px',
        background: 'white3',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5px 7.5px',
        boxShadow: active && '0px 0px 0px 1.5px',
        animation: pulsing && `${pulse} 0.8s linear`,
        color: 'yellow',
      }}
    >
      <Text>{rangeType}</Text>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Flex
          sx={{
            minHeight: '25px',
            minWidth: '25px',
            background: disabled ? 'grey' : 'yellow',
            borderRadius: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleDecrement}
        >
          <Text color="primaryBright" size="25px" sx={{ lineHeight: '0px' }}>
            -
          </Text>
        </Flex>
        <NumericInput
          onUserInput={(input) => setLocalValue(input)}
          value={localValue}
          style={{ textAlign: 'center', color: 'text' }}
        />
        <Flex
          sx={{
            minHeight: '25px',
            minWidth: '25px',
            background: disabled ? 'grey' : 'yellow',
            borderRadius: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleIncrement}
        >
          <Text color="primaryBright" size="20px" sx={{ mb: '3px' }}>
            +
          </Text>
        </Flex>
      </Flex>
      <Text size="12px" weight={300}>
        {tokenBSymbol} per {tokenASymbol}
      </Text>
    </Box>
  )
}

export default RangeSelector

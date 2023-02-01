import { Flex, NumericInput, Text } from 'components/uikit'

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
  return (
    <Flex
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        height: '85px',
        width: '275px',
        background: 'white3',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5px 7.5px',
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
          onClick={() => onRangeInput(onDecrementRange())}
        >
          <Text color="primaryBright" size="25px" sx={{ lineHeight: '0px' }}>
            -
          </Text>
        </Flex>
        <NumericInput onUserInput={onRangeInput} value={value} style={{ textAlign: 'center' }} />
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
          onClick={() => onRangeInput(onIncrementRange())}
        >
          <Text color="primaryBright" size="20px" sx={{ mb: '3px' }}>
            +
          </Text>
        </Flex>
      </Flex>
      <Text size="12px" weight={300}>
        {tokenBSymbol} per {tokenASymbol}
      </Text>
    </Flex>
  )
}

export default RangeSelector

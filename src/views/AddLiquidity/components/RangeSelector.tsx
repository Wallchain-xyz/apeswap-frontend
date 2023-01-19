import { Button, Flex, IconButton, NumericInput, Text } from 'components/uikit'

const RangeSelector = ({
  rangeType,
  value,
  onDecrementRange,
  onIncrementRange,
  onRangeInput,
}: {
  rangeType: 'Min Price' | 'Max Price'
  value: string
  onDecrementRange: () => string
  onIncrementRange: () => string
  onRangeInput: (userInput: string) => void
}) => {
  return (
    <Flex
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        height: '85px',
        width: '190px',
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
            height: '25px',
            width: '25px',
            background: 'yellow',
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
            height: '25px',
            width: '25px',
            background: 'yellow',
            borderRadius: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => onRangeInput(onIncrementRange())}
        >
          {' '}
          <Text color="primaryBright" size="20px">
            +
          </Text>
        </Flex>
      </Flex>
      <Text size="12px" weight={300}>
        Token per Token
      </Text>
    </Flex>
  )
}

export default RangeSelector

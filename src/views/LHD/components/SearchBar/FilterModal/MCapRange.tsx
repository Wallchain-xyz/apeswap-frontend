import React, { useState } from 'react'
import { Box } from 'theme-ui'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import NumericInput from 'components/uikit/Input/NumericInput'
import { Flex, Text } from 'components/uikit'

const MCapRange = ({ minRange, maxRange }: { minRange: number; maxRange: number }) => {
  const [minValue, setMinValue] = useState(minRange)
  const [maxValue, setMaxValue] = useState(maxRange)

  const handleMinInputChange = (value: string) => {
    const numValue = value ? parseInt(value) : 0
    if (numValue <= maxValue && numValue >= minRange) {
      setMinValue(numValue)
    }
  }

  const handleMaxInputChange = (value: string) => {
    const numValue = value ? parseInt(value) : 0
    if (numValue >= minValue && numValue <= maxRange) {
      setMaxValue(numValue)
    }
  }

  const handleSliderChange = (value: { min: number; max: number }) => {
    setMinValue(value.min)
    setMaxValue(value.max)
  }

  return (
    <Box sx={{
      width: '100%',
      pb: '10px',
    }}>
      <Box sx={{ mt: '25px', p: '0 28px' }}>
        <InputRange
          minValue={minRange}
          maxValue={maxRange}
          value={{ min: minValue, max: maxValue }}
          formatLabel={(value) => `${value}%`}
          // @ts-ignore
          onChange={handleSliderChange}
        />
      </Box>
      <Box sx={{ display: 'flex', padding: '5px 10px', justifyContent: 'space-between' }}>
        <Flex sx={{width: '48%', flexDirection: 'column'}}>
          <Text sx={{fontWeight: 500, fontSize: '12px', padding: '0 5px'}}>
            Min
          </Text>
          <NumericInput
            value={minValue.toString()}
            onUserInput={handleMinInputChange}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
        <Flex sx={{width: '48%', flexDirection: 'column'}}>
          <Text sx={{fontWeight: 500, fontSize: '12px', padding: '0 5px'}}>
            Max
          </Text>
          <NumericInput
            value={maxValue.toString()}
            onUserInput={handleMaxInputChange}
            style={{ width: '100%', fontSize: '12px', fontWeight: 400, p: '10px', background: 'lvl2' }}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default MCapRange

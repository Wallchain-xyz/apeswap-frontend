import React from 'react'
import { Box } from 'theme-ui'
import 'react-input-range/lib/css/index.css'
import { Button, Flex } from 'components/uikit'
import { FilterState } from 'state/lhd/reducer'
import { TAGS } from '../../../utils/config'
import { CHAIN_DETAILS } from '../../../utils/config'

const mappedData = (type: string) => {
  if (type === 'tags') {
    return TAGS
  } else {
    return CHAIN_DETAILS.map((item) => ({
      label: item.chainName,
      value: item.chainId,
    }))
  }
}

const ButtonSelector = ({
  values,
  handler,
  type,
}: {
  values: FilterState
  handler: (type: 'tags' | 'chains', value: string[]) => void
  type: 'tags' | 'chains'
}) => {
  const handleButtonClick = (type: 'tags' | 'chains', item: any) => {
    if (values[type].includes(item.value)) {
      let tempArray = values[type].filter((value) => value !== item.value)
      handler(type, tempArray)
    } else {
      handler(type, [...values[type], item.value])
    }
    console.log(values)
  }

  const filterApplied = (type: 'tags' | 'chains', item: any): boolean => {
    return values[type].includes(item.value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {mappedData(type).map((item, index) => (
        <Flex key={`tag${index}`} sx={{ flexDirection: 'row', mb: '5px', p: '0 5px' }}>
          <Button
            size="sm"
            variant={filterApplied(type, item) ? 'primary' : 'secondary'}
            onClick={() => handleButtonClick(type, item)}
          >
            {item.label}
          </Button>
        </Flex>
      ))}
    </Box>
  )
}

export default ButtonSelector

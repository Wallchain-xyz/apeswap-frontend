import React from 'react'
import { Box } from 'theme-ui'
import 'react-input-range/lib/css/index.css'
import { Button, Flex } from 'components/uikit'
import { FilterState } from 'state/lhd/reducer'
import { TAGS } from '../../../utils/config'

const ButtonSelector = ({
  values,
  handler,
  type,
}: {
  values: FilterState
  handler: (type: 'tags', value: string[]) => void
  type: 'tags'
}) => {
  const handleButtonClick = (type: 'tags', item: any) => {
    console.log('BUTTON CLICK')
    if (values[type].includes(item.value)) {
      let tempArray = values[type].filter((value) => value !== item.value)
      handler(type, tempArray)
    } else {
      handler(type, [...values[type], item.value])
    }
    console.log(values)
  }

  const filterApplied = (type: 'tags', item: any): boolean => {
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
      {TAGS.map((item, index) => (
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

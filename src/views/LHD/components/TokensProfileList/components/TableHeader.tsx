import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import React from 'react'
import { styles } from '../styles'
import { mobileColumnWidths } from '../columnsFormat'
import { Svg } from 'components/uikit'

const TableHeader = ({ sortCol, onSortColChange, sortType, onSortTypeChange }: {
  sortCol: string,
  onSortColChange: (value: string) => void,
  sortType: string,
  onSortTypeChange: (value: any) => void
}) => {
  const headers = [
    '#',
    'Token',
    'Market Cap',
    '24h Change',
    'Extractable',
    'Strength',
    'Concentration',
    'Ownership',
    'Score',
  ]

  const handleMagic = (header: string) => {
    if (header === sortCol) {
      onSortTypeChange((prev: 'asc' | 'desc') => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      onSortColChange(header)
      onSortTypeChange('asc')
    }
  }

  return (
    <Box sx={styles.headerContainer}>
      {headers.map((header, index) => (
        <Flex
          key={index}
          sx={{
            padding: index === 0 ? '8px 0' : '8px',
            position: index === 0 || index === 1 || index === headers.length - 1 ? 'sticky' : undefined,
            left: index === 0 ? 0 : index === 1 ? 25 : undefined,
            right: index === headers.length - 1 ? 0 : undefined,
            zIndex: index === 0 || index === 1 || index === headers.length - 1 ? 2 : 1,
            background: 'white2',
            justifyContent: index === 1 ? 'flex-start' : 'center',
            minWidth: `${mobileColumnWidths[index]}px`,
            display: 'flex',
            cursor: 'pointer',
          }}
          onClick={() => handleMagic(header)}
        >
          <Text sx={{ ...styles.headerText, color: index === 0 ? undefined : 'textDisabled' }}>
            {header}
            {header === sortCol && (
              <Flex sx={{ ml: '3px' }}>
                <Svg icon='caret' direction={sortType === 'asc' ? 'down' : 'up'} width={6} color={index === 0 ? 'text' : 'textDisabled'}/>
              </Flex>
            )}
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default TableHeader

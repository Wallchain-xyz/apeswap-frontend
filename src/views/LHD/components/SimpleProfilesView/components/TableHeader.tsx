import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import React from 'react'
import { styles } from './styles'

const TableHeader = () => {
  const headers = [
    '#',
    'Token',
    'MarketCap',
    '24h change',
    'Extractable',
    'Health',
    'Concentration',
    'Ownership',
    'Score',
  ]

  return (
    <Box sx={styles.headerContainer}>
      {headers.map((header, index) => (
        <Flex
          key={index}
          sx={{
            padding: '8px',
            position: index === 0 || index === 1 || index === headers.length - 1 ? 'sticky' : undefined,
            left: index === 0 ? 0 : index === 1 ? 25 : undefined,
            right: index === headers.length - 1 ? 0 : undefined,
            zIndex: index === 0 || index === 1 || index === headers.length - 1 ? 2 : 1,
            background: 'white2',
            justifyContent: index === 1 ? 'flex-start' : 'center',
          }}
        >
          <Text sx={{ ...styles.headerText, color: index === 0 ? undefined : 'textDisabled' }}>
            {header}
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default TableHeader

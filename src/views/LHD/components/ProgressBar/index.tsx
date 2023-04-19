import React from 'react'
import { Box } from 'theme-ui'
import { Flex, Text } from '../../../../components/uikit'
import { getColor } from '../../utils/getColor'

interface ProgressBarProps {
  widthPercentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ widthPercentage }) => {

  return (
    <Flex sx={{ alignItems: 'center' }}>
      <Text sx={{
        fontWeight: 500,
        fontSize: ['12px'],
        mr: '5px',
        minWidth: '25px',
      }}>
        {widthPercentage}%
      </Text>
      <Box
        sx={{
          minWidth: ['86px'],
          height: '8px',
          backgroundColor: '#EADFC7',
          borderRadius: '10px',
        }}
      >
        <Box sx={{
          width: `${widthPercentage <= 2 ? 2 : widthPercentage}%`,
          backgroundColor: getColor(widthPercentage),
          borderRadius: '10px',
          height: '8px',
        }}></Box>
      </Box>
    </Flex>
  )
}

export default ProgressBar

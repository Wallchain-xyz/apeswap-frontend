import React from 'react'
import { Flex } from '../../../../../components/uikit'

const IconButton = ({children}: {children: React.ReactNode}) => {
  return (
    <Flex sx={{
      background: 'white4',
      padding: '2px 5px',
      borderRadius: '8px',
      mr: '5px',
      height: '19px',
      alignItems: 'center',
      lineHeight: '12px',
      '&:hover': {
        cursor: 'pointer',
      },
    }}>
      {children}
    </Flex>
  )
}

export default IconButton
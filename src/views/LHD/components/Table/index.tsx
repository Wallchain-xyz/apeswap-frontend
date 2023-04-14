import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { Box } from 'theme-ui'
import { useSimpleProfiles } from '../../../../state/lhd/hooks'
import { SimpleTokenProfile } from '../../../../state/lhd/types'

const columnWidths = [30, 120, 120, 130, 100, 100, 100, 100, 100, 50]
const tableWidth = columnWidths.reduce((acc, width) => acc + width, 0)

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
    'Share',
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        width: tableWidth,
        gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 10,
        border: '1px solid #ccc',
        borderColor: 'transparent transparent #ccc transparent',
      }}
    >
      {headers.map((header, index) => (
        <Box
          key={index}
          sx={{
            padding: '8px',
            position: index === 0 || index === headers.length - 1 ? 'sticky' : undefined,
            left: index === 0 ? 0 : undefined,
            right: index === headers.length - 1 ? 0 : undefined,
            zIndex: index === 0 || index === headers.length - 1 ? 2 : 1,
            background: 'white',
          }}
        >
          {header}
        </Box>
      ))}
    </Box>
  )
}

const TableRow = ({ index, style, simpleProfiles }: {
  index: any,
  style: any,
  simpleProfiles: SimpleTokenProfile[]
}) => {
  const simpleProfile: SimpleTokenProfile = simpleProfiles[index]

  return (
    <Box
      sx={{
        ...style,
        width: tableWidth,
        display: 'grid',
        gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
        border: '1px solid #ccc',
        borderColor: 'transparent transparent #ccc transparent',
      }}
    >
      <Box
        sx={{
          padding: '8px',
          position: 'sticky',
          left: 0,
          zIndex: 2,
          background: 'white',
        }}
      >
        {index + 1}
      </Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile.addressMapping.tokenSymbol}</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile.mcap.reduce((sum, current) => sum + current.amount, 0)}</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile.priceChange24hr.toFixed(2)}%</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile.extractableLiquidity.toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile.healthScore * 100).toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile.concentrationScore * 100).toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile.ownershipScore * 100).toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile.totalScore * 100).toFixed()}</Box>
      <Box
        sx={{
          padding: '8px',
          position: 'sticky',
          right: 0,
          zIndex: 2,
          background: 'white',
        }}
      >
        {'s'}
      </Box>
    </Box>
  )
}

// eslint-disable-next-line react/display-name
const InnerListWrapper = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { children, ...rest } = props
  return (
    <Box ref={ref} {...rest}>
      <TableHeader />
      <Box>{children}</Box>
    </Box>
  )
})

const MyTable = () => {
  const itemCount = 51 // Increase by 1 to account for the header
  const itemHeight = 40
  const simpleProfiles = useSimpleProfiles()

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        position: 'relative',
        mt: '20px',
      }}
    >
      {
        simpleProfiles.length > 0 && (
          <List
            height={itemHeight * 11}
            itemCount={itemCount}
            itemSize={itemHeight}
            width='100%'
            innerElementType={InnerListWrapper}
          >
            {({ index, style }) => <TableRow index={index} style={style} simpleProfiles={simpleProfiles} />}
          </List>
        )
      }
    </Box>
  )
}

export default MyTable
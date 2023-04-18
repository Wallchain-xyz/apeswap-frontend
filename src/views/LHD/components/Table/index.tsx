import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { Box } from 'theme-ui'
import { useSearchProfiles, useSimpleProfiles } from '../../../../state/lhd/hooks'
import { SimpleTokenProfile } from '../../../../state/lhd/types'
import { useRouter } from 'next/router'

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

const TableRow = ({ index, style, profiles }: {
  index: any,
  style: any,
  profiles: SimpleTokenProfile[]
}) => {
  const simpleProfile: SimpleTokenProfile = profiles[index]
  const router = useRouter();

  const handleClick = () => {
    const chainID = simpleProfile.addressMapping.tokenAddresses[0].chainId;
    const address = simpleProfile.addressMapping.tokenAddresses[0].address;
    router.push(`/lhd/${chainID}/${address}`);
  };

  return (
    <Box
      sx={{
        ...style,
        width: tableWidth,
        display: 'grid',
        gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
        border: '1px solid #ccc',
        borderColor: 'transparent transparent #ccc transparent',
        cursor: 'pointer'
      }}
      onClick={handleClick}
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
      <Box sx={{ padding: '8px' }}>{simpleProfile?.addressMapping?.tokenSymbol}</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile?.mcap?.reduce((sum, current) => sum + current.amount, 0)}</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile?.priceChange24hr?.toFixed(2)}%</Box>
      <Box sx={{ padding: '8px' }}>{simpleProfile?.extractableLiquidity?.toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile?.healthScore * 100)?.toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile?.concentrationScore * 100)?.toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile?.ownershipScore * 100).toFixed()}</Box>
      <Box sx={{ padding: '8px' }}>{(simpleProfile?.totalScore * 100)?.toFixed()}</Box>
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
  const itemHeight = 40
  const simpleProfiles = useSimpleProfiles()
  const searchProfiles = useSearchProfiles()


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
        searchProfiles.length > 0 ? (
          <List
            height={itemHeight * 11}
            itemCount={searchProfiles.length}
            itemSize={itemHeight}
            width='100%'
            innerElementType={InnerListWrapper}
          >
            {({ index, style }) => <TableRow index={index} style={style} profiles={[{} as SimpleTokenProfile, ...searchProfiles]} />}
          </List>
          ) : simpleProfiles.length > 0 && (
          <List
            height={itemHeight * 11}
            itemCount={simpleProfiles.length}
            itemSize={itemHeight}
            width='100%'
            innerElementType={InnerListWrapper}
          >
            {({ index, style }) => <TableRow index={index} style={style} profiles={[{} as SimpleTokenProfile, ...simpleProfiles]} />}
          </List>
        )
      }
    </Box>
  )
}

export default MyTable
import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { Box } from 'theme-ui'
import { useSearchProfiles, useSimpleProfiles } from '../../../../state/lhd/hooks'
import { SimpleTokenProfile } from '../../../../state/lhd/types'
import { useRouter } from 'next/router'
import { Flex, Text } from 'components/uikit'
import Image from 'next/image'
import { formatDollar } from '../../../../utils/formatNumbers'
import PriceChange from '../FullProfile/components/PercentageChange'
import ProgressBar from '../ProgressBar'
import { getColor } from '../../utils/getColor'

const columnWidths = [25, 140, 130, 130, 130, 163, 163, 162.9, 50]
const mobileColumnWidths = [25, 140, 70, 65, 65, 80, 80, 80, 40]
const desktopMappedColumns = columnWidths.map((width) => `${width}px`).join(' ')
const mobileMappedColumns = mobileColumnWidths.map((width) => `${width}px`).join(' ')
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
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        width: 'fit-content',
        gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
        position: 'sticky',
        top: 0,
        background: 'white2',
        zIndex: 10,
        borderColor: 'transparent transparent #ccc transparent',
      }}
    >
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
          <Text
            sx={{ fontWeight: [400,400,500], fontSize: ['8px', '8px', '12px'], color: index === 0 ? undefined : 'textDisabled' }}>
            {header}
          </Text>
        </Flex>
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
  const router = useRouter()

  const handleClick = () => {
    const chainID = simpleProfile.addressMapping.tokenAddresses[0].chainId
    const address = simpleProfile.addressMapping.tokenAddresses[0].address
    router.push(`/lhd/${chainID}/${address}`)
  }

  return (
    <Box
      sx={{
        ...style,
        width: 'fit-content',
        display: 'grid',
        background: index % 2 ? 'white3' : 'white2',
        gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
        borderColor: 'transparent transparent #ccc transparent',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Flex
        sx={{
          padding: '8px',
          position: 'sticky',
          left: 0,
          zIndex: 2,
          background: index % 2 ? 'white3' : 'white2',
          justifyContent: 'center',
        }}
      >
        <Text sx={{ fontWeight: 300, fontSize: ['12px'], color: 'textDisabled' }}>
          {index}
        </Text>
      </Flex>
      <Flex sx={{
        padding: '8px',
        position: 'sticky',
        left: 25,
        zIndex: 2,
        background: index % 2 ? 'white3' : 'white2',
      }}>
        <Image src={simpleProfile?.addressMapping?.tokenLogoUrl}
               alt={'token img'}
               width={25}
               height={25}
               style={{ borderRadius: '25px' }} />
        <Text sx={{ fontWeight: 500, fontSize: ['12px'], lineHeight: ['18px'], ml: '5px' }}></Text>
        {simpleProfile?.addressMapping?.tokenSymbol}
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['12px'] }}>
          {formatDollar({ num: simpleProfile?.mcap?.reduce((sum, current) => sum + current.amount, 0) })}
        </Text>
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['12px'] }}>
          <PriceChange priceChange={simpleProfile?.priceChange24hr?.toFixed(2)} />
        </Text>
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['12px'] }}>
          {formatDollar({ num: simpleProfile?.extractableLiquidity })}
        </Text>
      </Flex>
      <Flex sx={{ padding: '8px', alignItems: 'center', justifyContent: 'center' }}>
        <ProgressBar widthPercentage={Math.round(simpleProfile?.healthScore * 100)} />
      </Flex>
      <Flex sx={{ padding: '8px', alignItems: 'center', justifyContent: 'center' }}>
        <ProgressBar widthPercentage={Math.round(simpleProfile?.concentrationScore * 100)} />
      </Flex>
      <Flex sx={{ padding: '8px', alignItems: 'center', justifyContent: 'center' }}>
        <ProgressBar widthPercentage={Math.round(simpleProfile?.ownershipScore * 100)} />
      </Flex>
      <Flex sx={{
        padding: '8px',
        position: 'sticky',
        right: 0,
        zIndex: 2,
        background: index % 2 ? 'white3' : 'white2',
        justifyContent: 'center',
      }}>
        <Text sx={{ fontWeight: 700, fontSize: '12px', color: getColor(simpleProfile?.totalScore * 100) }}>
          {(simpleProfile?.totalScore * 100)?.toFixed()}
        </Text>
      </Flex>
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
      {children}
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
        width: ['100vw', '100vw', '100%'],
        overflowY: 'auto',
        position: 'relative',
        mt: '20px',
        ml: ['-20px', '-20px', 0],
      }}
    >
      {
        searchProfiles.length > 0 ? (
          <List
            height={itemHeight * 15}
            itemCount={searchProfiles.length + 1}
            itemSize={itemHeight}
            width='100%'
            innerElementType={InnerListWrapper}
          >
            {({ index, style }) => <TableRow index={index} style={style}
                                             profiles={[{} as SimpleTokenProfile, ...searchProfiles]} />}
          </List>
        ) : simpleProfiles.length > 0 && (
          <List
            height={itemHeight * 15}
            itemCount={simpleProfiles.length}
            itemSize={itemHeight}
            width='100%'
            innerElementType={InnerListWrapper}
          >
            {({ index, style }) => {
              return (
                <TableRow
                  index={index}
                  style={style}
                  profiles={[{} as SimpleTokenProfile, ...simpleProfiles]} />
              )
            }}
          </List>
        )
      }
    </Box>
  )
}

export default MyTable
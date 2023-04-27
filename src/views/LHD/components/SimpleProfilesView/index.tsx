import React from 'react'
import { Box } from 'theme-ui'
import { useSearchProfiles, useSimpleProfiles } from 'state/lhd/hooks'
import { SimpleTokenProfile } from 'state/lhd/types'
import { useRouter } from 'next/router'
import { Flex, Skeleton, Text } from 'components/uikit'
import Image from 'next/image'
import { formatDollar } from 'utils/formatNumbers'
import PriceChange from '../FullProfile/components/PercentageChange'
import ProgressBar from '../ProgressBar'
import { getColor } from '../../utils/getColor'
import { desktopMappedColumns, mobileMappedColumns } from './columnsFormat'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'

const TableRow = ({ index, style, profiles }: {
  index: any,
  style?: any,
  profiles: SimpleTokenProfile[]
}) => {
  const simpleProfile: SimpleTokenProfile = profiles[index]
  const router = useRouter()

  const handleClick = () => {
    const chainID = simpleProfile.addressMapping.tokenAddresses[0].chainId
    const address = simpleProfile.addressMapping.tokenAddresses[0].address
    router.push(`/liquidity-health/${chainID}/${address}`)
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
          height: '40px',
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
        height: '40px',
      }}>
        <Image src={simpleProfile?.addressMapping?.tokenLogoUrl}
               alt={'token img'}
               width={25}
               height={25}
               style={{ borderRadius: '25px' }} />
        <Text
          sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['18px'], ml: '5px' }}></Text>
        {simpleProfile?.addressMapping?.tokenSymbol}
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['10px', '10px', '10px', '12px'] }}>
          {formatDollar({ num: simpleProfile?.mcap?.reduce((sum, current) => sum + current.amount, 0) })}
        </Text>
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['10px', '10px', '10px', '12px'] }}>
          <PriceChange priceChange={simpleProfile?.priceChange24hr?.toFixed(2)} />
        </Text>
      </Flex>
      <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
        <Text sx={{ fontWeight: 400, fontSize: ['10px', '10px', '10px', '12px'] }}>
          {formatDollar({ num: simpleProfile?.extractableLiquidity })}
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Flex sx={{
          padding: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          minWidth: ['80px', '80px', '133px'],
        }}>
          <ProgressBar value={Math.round(simpleProfile?.healthScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Flex sx={{
          padding: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          minWidth: ['80px', '80px', '133px'],
        }}>
          <ProgressBar value={Math.round(simpleProfile?.concentrationScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Flex sx={{
          padding: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          minWidth: ['80px', '80px', '133px'],
        }}>
          <ProgressBar value={Math.round(simpleProfile?.ownershipScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={{
        padding: '8px',
        position: 'sticky',
        right: 0,
        zIndex: 2,
        background: index % 2 ? 'white3' : 'white2',
        justifyContent: 'center',
        height: '40px',
      }}>
        <Text sx={{ fontWeight: 700, fontSize: '12px', color: getColor(simpleProfile?.totalScore * 100) }}>
          {(simpleProfile?.totalScore * 100)?.toFixed()}
        </Text>
      </Flex>
    </Box>
  )
}

const MyTable = () => {
  const simpleProfiles = useSimpleProfiles()
  const searchProfiles = useSearchProfiles()

  return (
    <Box
      sx={{
        width: ['calc(100vw - 8px)', 'calc(100vw - 8px)', '100%'],
        overflowY: 'auto',
        position: 'relative',
        mt: '20px',
        ml: ['-20px', '-20px', 0],
        borderRadius: '10px',
      }}
    >
      <TableHeader />
      {searchProfiles.length > 0 ? (
        searchProfiles?.map((profile, index) => {
          return <TableRow key={`searchProfile-${index}`}
                           index={index}
                           profiles={searchProfiles} />
        })
      ) : false ? (
          <>
            {[...Array(15)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        ) :
        simpleProfiles.length > 0 ? (
          simpleProfiles.map((profile, index) => {
            return <TableRow key={`simpleProfile${index}`}
                             index={index}
                             profiles={simpleProfiles} />
          })
        ) : (
          <>
            {[...Array(15)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        )
      }
    </Box>
  )
}

export default MyTable
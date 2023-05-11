import React from 'react'
import { SimpleTokenProfile } from 'state/lhd/types'
import { useRouter } from 'next/router'
import { Box } from 'theme-ui'
import { Flex, Text } from 'components/uikit'
import { formatDollar } from 'utils/formatNumbers'
import PriceChange from '../../FullProfile/components/PercentageChange'
import ProgressBar from '../../ProgressBar'
import { getColor } from '../../../utils/getColor'
import { styles } from '../styles'
import TokenImage from 'components/TokenImage'

const TableRow = ({ index, simpleProfile }: { index: number, simpleProfile: SimpleTokenProfile }) => {
  const router = useRouter()

  const handleClick = () => {
    const chainID = simpleProfile.addressMapping.tokenAddresses[0].chainId
    const address = simpleProfile.addressMapping.tokenAddresses[0].address
    router.push(`/liquidity-health/${chainID}/${address}`)
  }

  return (
    <Box sx={{ ...styles.tableRowContainer, background: index % 2 ? 'white3' : 'white2' }} onClick={handleClick}>
      <Flex sx={{ ...styles.indexCol, background: index % 2 ? 'white3' : 'white2' }}>
        <Text sx={styles.indexText}>{simpleProfile?.ranking}</Text>
      </Flex>
      <Flex sx={{ ...styles.nameCol, background: index % 2 ? 'white3' : 'white2' }}>
        <TokenImage url={simpleProfile?.addressMapping?.tokenLogoUrl} size={25} />
        <Text sx={styles.nameText}>
          {simpleProfile?.addressMapping?.tokenSymbol}
        </Text>
      </Flex>
      <Flex sx={styles.usdCol}>
        <Text>
          {formatDollar({ num: simpleProfile?.mcap?.reduce((sum, current) => sum + current.amount, 0) })}
        </Text>
      </Flex>
      <Flex sx={styles.usdCol}>
        <Text>
          <PriceChange priceChange={simpleProfile?.priceChange24hr?.toFixed(2)} />
        </Text>
      </Flex>
      <Flex sx={styles.usdCol}>
        <Text>
          {formatDollar({ num: simpleProfile?.extractableLiquidity })}
        </Text>
      </Flex>
      <Flex sx={styles.barCol}>
        <Flex sx={styles.barContainer}>
          <ProgressBar value={Math.round(simpleProfile?.healthScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={styles.barCol}>
        <Flex sx={styles.barContainer}>
          <ProgressBar value={Math.round(simpleProfile?.concentrationScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={styles.barCol}>
        <Flex sx={styles.barContainer}>
          <ProgressBar value={Math.round(simpleProfile?.ownershipScore * 100)} position='left' />
        </Flex>
      </Flex>
      <Flex sx={{ ...styles.scoreCol, background: index % 2 ? 'white3' : 'white2' }}>
        <Text sx={{ fontWeight: 700, fontSize: '12px', color: getColor(simpleProfile?.totalScore * 100) }}>
          {(simpleProfile?.totalScore * 100)?.toFixed()}
        </Text>
      </Flex>
    </Box>
  )
}

export default TableRow

import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { V3LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import { Flex } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3PositionFromTokenId, useV3Positions } from 'hooks/useV3Positions'
import { PositionDetails } from 'lib/types/position'
import { useCallback, useState } from 'react'
import { useUserHideClosedPositions } from 'state/user/hooks'
import PositionCard from './components/PositionCard'
import PositionDetailsPage from './components/PositionDetailsPage'

const Positions = () => {
  const { chainId, account } = useWeb3React()
  const { positions, loading: positionsLoading } = useV3Positions(account)
  const [selectedTokenId, setSelectedTokenId] = useState<string>('')

  const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()

  const [openPositions, closedPositions] = positions?.reduce<[PositionDetails[], PositionDetails[]]>(
    (acc, p) => {
      acc[p.liquidity?.isZero() ? 1 : 0].push(p)
      return acc
    },
    [[], []],
  ) ?? [[], []]

  const filteredPositions = [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)]

  const handleSelectedTokenId = useCallback((tokenId: string) => {
    setSelectedTokenId(tokenId)
  }, [])

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center', flexDirection: 'row-reverse' }}>
      <Flex variant="flex.dexContainer">
        <DexNav />
        <V3LiquiditySubNav />
        {filteredPositions?.map((position) => {
          return (
            <PositionCard
              key={position.tokenId.toString()}
              positionItem={position}
              selectedTokenId={selectedTokenId}
              handleSelectedTokenId={handleSelectedTokenId}
            />
          )
        })}
      </Flex>
      <PositionDetailsPage selectedTokenId={selectedTokenId} />
    </Flex>
  )
}

export default Positions

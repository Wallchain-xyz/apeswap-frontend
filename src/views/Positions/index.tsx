import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { V3LiquiditySubNav } from 'components/DexNav/LiquiditySubNav'
import { Flex, Text } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3PositionFromTokenId, useV3Positions } from 'hooks/useV3Positions'
import { PositionDetails } from 'lib/types/position'
import { useCallback, useState } from 'react'
import { useUserHideClosedPositions } from 'state/user/hooks'
import { Switch } from 'theme-ui'
import NoPositionSelectedPage from './components/NoPositionSelectedPage'
import PositionCard from './components/PositionCard'
import PositionDetailsPage from './components/PositionDetailsPage'
import PositionsLoading from './components/PositionsLoading'

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
        <Flex sx={{ justifyContent: 'flex-end', width: '100%', mb: '5px' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Text mr="5px" sx={{ minWidth: 'fit-content' }}>
              Hide closed positions{' '}
            </Text>
            <Switch
              checked={userHideClosedPositions}
              onChange={() => setUserHideClosedPositions(!userHideClosedPositions)}
            />
          </Flex>
        </Flex>
        <Flex sx={{ overflowY: 'scroll', height: '481px', flexDirection: 'column', padding: '0px 4px' }}>
          {positionsLoading ? (
            <PositionsLoading />
          ) : (
            filteredPositions?.map((position) => {
              return (
                <PositionCard
                  key={position.tokenId.toString()}
                  positionItem={position}
                  selectedTokenId={selectedTokenId}
                  handleSelectedTokenId={handleSelectedTokenId}
                />
              )
            })
          )}
        </Flex>
      </Flex>
      {selectedTokenId ? <PositionDetailsPage selectedTokenId={selectedTokenId} /> : <NoPositionSelectedPage />}
    </Flex>
  )
}

export default Positions

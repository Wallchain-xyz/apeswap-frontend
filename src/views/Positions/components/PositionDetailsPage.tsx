import { useWeb3React } from '@web3-react/core'
import { Flex } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'

const PositionDetailsPage = ({ selectedTokenId }: { selectedTokenId?: string }) => {
  const { chainId, account, provider } = useWeb3React()
  const parsedTokenId = selectedTokenId ? BigNumber.from(selectedTokenId) : undefined
  const { loading, position: positionDetails } = useV3PositionFromTokenId(parsedTokenId)
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionDetails || {}

  return (
    <Flex variant="flex.v3SubDexContainer">
      <Flex sx={{ border: '1px solid red', height: '30px' }}>
        <></>
      </Flex>
      <Flex sx={{ height: '362px', border: '1px solid red', mt: '20px' }}>
        <Flex sx={{ border: '1px solid green', width: '100%', mr: '10px', borderRadius: '10px' }}>
          <></>
        </Flex>
        <Flex sx={{ border: '1px solid orange', width: '100%', ml: '10x', flexDirection: 'column' }}>
          <Flex sx={{ height: '100%', border: '1px solid yellow', mb: '10px', borderRadius: '10px' }}>
            <></>
          </Flex>
          <Flex sx={{ height: '100%', border: '1px solid white', mt: '10px', borderRadius: '10px' }}>
            <></>
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ border: '1px solid red', height: '30px', margin: '20px 0px' }}>
        <></>
      </Flex>
      <Flex sx={{ height: '123px', border: '1px solid green' }}>
        <Flex sx={{ width: '100%', flexDirection: 'column', mr: '10px' }}>
          <Flex sx={{ height: '100%', border: '1px solid yellow', mb: '10px', borderRadius: '10px' }}>
            <></>
          </Flex>
          <Flex sx={{ height: '100%', border: '1px solid white', mt: '10px', borderRadius: '10px' }}>
            <></>
          </Flex>
        </Flex>
        <Flex sx={{ width: '100%', border: '1px solid orange', borderRadius: '10px', ml: '10px' }}>
          <></>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PositionDetailsPage

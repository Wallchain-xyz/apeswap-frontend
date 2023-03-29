import { Button, Flex, Svg, Text, Link } from 'components/uikit'

const NoPositionSelectedPage = ({ mobile }: { mobile?: boolean }) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Svg icon="placeholderMonkey" width={250} />
      <Text mt="5px">{mobile ? 'Your position info will appear here' : 'The token pair info will appear here'}</Text>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
        <Text> {mobile ? 'Create a position' : 'Select a position'} </Text>
        {!mobile && <Text> or </Text>}
        <Button mt="5px" as={Link} href="/add-liquidity">
          Add Liquidity
        </Button>
      </Flex>
    </Flex>
  )
}

export default NoPositionSelectedPage

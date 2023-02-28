import { Button, Flex, Svg, Text } from 'components/uikit'
import Link from 'next/link'
import { DESKTOP_DISPLAY } from './styles'

const NoPositionSelectedPage = () => {
  return (
    <Flex
      variant="flex.v3SubDexContainer"
      sx={{ display: DESKTOP_DISPLAY, height: '634px', alignItems: 'center', justifyContent: 'center' }}
    >
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Svg icon="placeholderMonkey" width={250} />
        <Text mt="5px">The token pair info will appear here</Text>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
          <Text> Select a position </Text>
          <Text> or </Text>
          <Button mt="5px" as={Link} href="/add-liquidity">
            Add Liquidity
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NoPositionSelectedPage

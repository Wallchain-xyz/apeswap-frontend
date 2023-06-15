import styled from '@emotion/styled'
import { Flex, Text } from 'components/uikit'

export const ValuesWrapper = styled(Flex)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 550px;
  width: 100%;
`

export const ValueCard = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 338px;
  height: 397px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0px 20px 0px 20px;
  }
`

export const ValueImage = styled(Flex)<{ image?: string }>`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
`

export const ValueText = styled(Text)`
  position: absolute;
  font-size: 22px;
  top: 25px;
  text-align: center;
  width: 100%;
  font-weight: 700;
`

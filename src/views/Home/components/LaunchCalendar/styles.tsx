import styled from '@emotion/styled'
import { Flex, Text } from 'components/uikit'

export const LaunchCalendarWrapper = styled(Flex)`
  position: relative;
  display: flex;
  width: 95vw;
  max-width: 1412px;
  height: 500px;
  justify-content: space-between;
  align-items: center;
`

export const ColorWrap = styled(Flex)`
  display: flex;
  background: ${({ theme }) => theme.colors.white2};
  align-items: center;
  justify-content: center;
`

export const LaunchCard = styled(Flex)`
  width: 219px;
  height: 263px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 5px 10px 5px;
  background: ${({ theme }) => theme.colors.white3};
`

export const CalendarImg = styled.div<{ image: string }>`
  width: 84px;
  height: 84px;
  border-radius: 10px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const Bubble = styled(Flex)<{ isActive?: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : theme.colors.white4};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
`

export const LaunchText = styled(Text)`
  position: absolute;
  font-size: 22px;
  top: 40px;
  text-align: center;
  width: 100%;
`

export const SkeletonWrapper = styled(Flex)`
  position: absolute;
  display: flex;
  height: 500px;
  align-items: center;
  max-width: 1412px;
  width: 95vw;
  top: 0;
  justify-content: center;
  padding-bottom: 50px;
  & :nth-of-type(2),
  & :nth-of-type(3),
  & :nth-of-type(4),
  & :nth-of-type(5),
  & :nth-of-type(6) {
    display: none;
  }
  @media screen and (min-width: 555px) and (max-width: 855px) {
    justify-content: space-around;
    & :nth-of-type(2) {
      display: block;
    }
  }
  @media screen and (min-width: 855px) and (max-width: 1155px) {
    justify-content: space-around;
    & :nth-of-type(2),
    & :nth-of-type(3) {
      display: block;
    }
  }
  @media screen and (min-width: 1155px) and (max-width: 1405px) {
    justify-content: space-between;
    & :nth-of-type(2),
    & :nth-of-type(3),
    & :nth-of-type(4) {
      display: block;
    }
  }
  @media screen and (min-width: 1405px) {
    justify-content: space-between;
    & :nth-of-type(2),
    & :nth-of-type(3),
    & :nth-of-type(4),
    & :nth-of-type(5),
    & :nth-of-type(6) {
      display: block;
    }
  }
`

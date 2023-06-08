import styled from '@emotion/styled'
import { Flex } from 'components/uikit'

export const NewsCard = styled.div<{ image: string; index: number; listLength: number }>`
  height: 332.5px;
  min-width: 266px;
  max-width: 266px;
  opacity: 1;
  flex-shrink: 1;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  transition: ease 1000ms;
  cursor: pointer;
`

export const NewsWrapper = styled.div`
  display: flex;
  height: 500px;
  align-items: center;
  overflow: hidden;
  max-width: 1412px;
  width: 95vw;
  justify-content: center;
  padding-bottom: 50px;
`

export const SkeletonWrapper = styled.div`
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
  & :nth-of-type(5) {
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
    & :nth-of-type(5) {
      display: block;
    }
  }
`

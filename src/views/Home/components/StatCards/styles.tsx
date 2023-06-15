import styled from '@emotion/styled'
import { Flex } from 'components/uikit'

export const StyledCard = styled(Flex)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  max-width: 325px;
  min-width: 260px;
  background: ${({ theme }) => theme.colors.white2};
  width: 100%;
  border-radius: 10px;
  padding: 15px 0px 15px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 131px;
  }
`

export const CardWrapper = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0px 30px;
  align-items: center;
  max-width: 1412px;
  z-index: 2;
  width: 95vw;
  border-radius: 10px;
  @media screen and (max-width: 575px) {
    ${StyledCard}:nth-of-type(1) {
      border-radius: 10px 10px 0px 0px;
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.white4}`};
    }
    ${StyledCard}:nth-of-type(2), ${StyledCard}:nth-of-type(3) {
      border-radius: 0px;
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.white4}`};
      border-top: ${({ theme }) => `1px solid ${theme.colors.white4}`};
    }
    ${StyledCard}:nth-of-type(4) {
      border-radius: 0px 0px 10px 10px;
      border-top: ${({ theme }) => `1px solid ${theme.colors.white4}`};
    }
  }
  @media screen and (min-width: 575px) and (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 325px));
    margin: 0px 0px 0px 0px;
    justify-content: space-between;
    ${StyledCard}:nth-of-type(1), ${StyledCard}:nth-of-type(2) {
      border-radius: 10px 10px 0px 0px;
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.white4}`};
    }
    ${StyledCard}:nth-of-type(3), ${StyledCard}:nth-of-type(4) {
      border-radius: 0px 0px 10px 10px;
      border-top: ${({ theme }) => `1px solid ${theme.colors.white4}`};
    }
  }
  @media screen and (min-width: 1200px) {
    display: grid;
    justify-content: space-between;
    ${StyledCard}:nth-of-type(1), ${StyledCard}:nth-of-type(2), 
    ${StyledCard}:nth-of-type(3), ${StyledCard}:nth-of-type(4) {
      border-radius: 10px;
    }
    grid-template-columns: repeat(4, minmax(260px, 325px));
  }
`

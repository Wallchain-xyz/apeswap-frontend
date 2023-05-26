// @ts-nocheck
import styled from '@emotion/styled'
import { Button, Text } from 'components/uikit'
import { Box } from 'theme-ui'

interface ContentProps {
  readingMore: boolean
}

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.navbar};
    padding: 15px;
    border-radius: 20px;
  }
`

export const PaddedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gnanaWarningBackground};
  padding: 10px;
  border-radius: 10px;
`
export const TopCon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
export const WarningHeader = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.yellow : theme.colors.primaryBright)};
  font-size: 30px;
  font-weight: 700;
`
export const ReadMore = styled(Button)`
  background: none;
  padding: 0;
  margin: 0;
  text-decoration-line: underline;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primaryBright};
  border-radius: 0;
  box-shadow: unset;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
export const CenterCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const InnerContent = styled(Box)<ContentProps>`
  padding: 0 20px;
  display: none;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
    display: unset;
  }
`
export const InnerContentText = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaryBright};
  text-align: center;
  max-width: 800px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
  }
`
export const OuterContent = styled(InnerContent)<ContentProps>`
  padding: 10px 20px;
  display: ${({ readingMore }) => (readingMore ? 'unset' : 'none')};
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

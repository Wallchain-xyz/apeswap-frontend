import styled from '@emotion/styled'
import { Flex, Text } from 'components/uikit'

export const Container = styled(Flex)``
export const HeadingContainer = styled(Flex)`
  flex-direction: column;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

export const Header = styled(Flex)`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  height: 250px;
  background-position: center;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/bills_night.svg)' : 'url(/images/bills_day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    height: 300px;
  }
`

export const StyledHeading = styled(Text)`
  font-size: 15px;
  max-width: 176px !important;
  color: white;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 15px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 30px;
    max-width: 600px !important;
  }
`

export const styles = {
  billsViewContainer: {
    position: 'relative',
    top: '30px',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center',
    marginBottom: '80px',
  },
}

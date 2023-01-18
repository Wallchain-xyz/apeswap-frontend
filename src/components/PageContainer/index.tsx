import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import { Flex } from 'components/uikit'
import { CSSProperties } from 'theme-ui'

const PageContainer = ({ style, children }: { style?: CSSProperties; children: React.ReactNode }) => {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        padding: '0px 10px',
        justifyContent: 'center',
        width: '100%',
        paddingTop: `${NAV_HEIGHT}px`,
      }}
    >
      <Flex sx={{ maxWidth: '1200px', width: '100%', minHeight: '100%', ...style }}>{children}</Flex>
    </Flex>
  )
}

export default PageContainer

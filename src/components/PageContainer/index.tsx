import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import { Flex } from 'components/uikit'

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        border: '1px solid red',
        padding: '0px 10px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: `${NAV_HEIGHT}px`,
      }}
    >
      <Flex sx={{ maxWidth: '1200px', width: '100%', height: '100%', border: '1px solid red' }}>{children}</Flex>
    </Flex>
  )
}

export default PageContainer

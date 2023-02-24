import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import { Flex } from 'components/uikit'
import { CSSProperties } from 'theme-ui'

const variants = {
  dex: {
    mt: ['20px', '20px', '20px', '20px', '20px', '100px'],
    mb: ['20px', '20px', '20px', '20px', '20px', '0px'],
    justifyContent: 'center',
  },
}

const PageContainer = ({
  style,
  children,
  variant = 'dex',
}: {
  style?: CSSProperties
  children: React.ReactNode
  variant?: 'dex'
}) => {
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
      <Flex sx={{ maxWidth: '1200px', width: '100%', minHeight: '100%', ...variants[variant], ...style }}>
        {children}
      </Flex>
    </Flex>
  )
}

export default PageContainer

import FloatingDocs from 'components/FloatingDocs'
import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import NetworkMonitor from 'components/NetworkMonitor'
import { Flex } from 'components/uikit'
import { CSSProperties } from 'theme-ui'

const variants = {
  dex: {
    mt: ['75px', '75px', '75px', '75px', '75px', '100px'],
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
        alignItems: 'center',
        width: '100%',
        paddingTop: `${NAV_HEIGHT}px`,
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ maxWidth: '1200px', width: '100%', minHeight: '100%', ...variants[variant], ...style }}>
        {children}
      </Flex>
      <FloatingDocs />
      {variant === 'dex' && <NetworkMonitor />}
    </Flex>
  )
}

export default PageContainer

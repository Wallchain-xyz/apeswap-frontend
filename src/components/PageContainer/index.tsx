import FloatingDocs from 'components/FloatingDocs'
import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import NetworkMonitor from 'components/NetworkMonitor'
import { Flex } from 'components/uikit'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CSSProperties } from 'theme-ui'

const variants = {
  dex: {
    mt: ['75px', '75px', '75px', '75px', '75px', '75px'],
    mb: ['100px', '100px', '100px', '100px', '100px', '100px'],
    justifyContent: 'center',
  },
  homepage: {
    justifyContent: 'center',
    overflow: 'display',
    maxWith: 'auto',
  },
  listView: {
    maxWidth: ['500px', '500px', '500px', '1150px'],
    padding: '0px 10px',
  },
}

const PageContainer = ({
  style,
  children,
  variant = 'dex',
}: {
  style?: CSSProperties
  children: React.ReactNode
  variant?: 'dex' | 'homepage' | 'listView'
}) => {
  const { asPath } = useRouter()
  const pageMeta = customMeta[asPath] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <Flex
        sx={{
          minHeight: '100vh',
          padding: variant === 'dex' && '0px 10px',
          alignItems: 'center',
          width: '100%',
          paddingTop: `${NAV_HEIGHT}px`,
          flexDirection: 'column',
        }}
      >
        <Flex
          sx={{
            maxWidth: '1200px',
            width: '100%',
            minHeight: '100%',
            ...variants[variant],
            ...style,
          }}
        >
          {children}
        </Flex>
        <FloatingDocs />
        {variant === 'dex' && <NetworkMonitor />}
      </Flex>
    </>
  )
}

export default PageContainer

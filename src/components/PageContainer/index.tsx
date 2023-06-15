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
    maxWidth: 'auto',
  },
  listView: {
    maxWidth: ['500px', '500px', '500px', '1150px'],
    padding: '0px 10px',
  },
  lhd: {
    maxWidth: ['500px', '600px', '600px', '1150px'],
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
  variant?: 'dex' | 'homepage' | 'listView' | 'lhd'
}) => {
  const { asPath, pathname } = useRouter()
  console.log(pathname)
  const pageMeta = customMeta[asPath] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  // const imageURL = `scottServer/${pathname}.png` 
  const imageURL = `https://i.imgur.com/H4hBGz7.png` 


  return (
    <>
      <Head>
        <title>{title}</title>
        {pathname.includes("/liquidity-health/") ? (
          <>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageURL} />
          <meta name="twitter:image" content={imageURL}/>
        </>
      ) : (
        <>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:Twitter" content="https://apeswap.finance/twitter.png" />
          <meta name="twitter:image" content="https://apeswap.finance/twitter.png" />
        </>
      )}
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

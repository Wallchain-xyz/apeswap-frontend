import { useState } from 'react'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import store from 'state'
import { Provider } from 'react-redux'
import Footer from 'components/Footer'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LanguageProvider } from 'contexts/Localization'
import ModalProvider from 'contexts/ModalContext'
import Web3Provider from 'contexts/Web3Provider'
import { MatchBreakpointsProvider } from 'contexts/MatchBreakpoints'
import ListsUpdater from 'state/lists/updater'
import TransactionUpdater from 'state/transactions/updater'
import ApplicationUpdater from 'state/application/updater'
import { MulticallUpdater } from 'lib/state/multicall'
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber'
import Popups from 'components/Popups'
import Blocklist from 'components/Blocklist'
import MarketingModalCheck from 'components/MarketingModalCheck'
import { Analytics } from '@vercel/analytics/react'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import GlobalStyles from '../contexts/GlobalStyles'
import Head from 'next/head'
import './styles.css'
import BigNumber from 'bignumber.js'

// Components
import NavBarNew from 'components/NavBarNew'
import useConfigParser from '../hooks/useConfigParser'
import { useGetAppConfig } from '../hooks/useGetAppConfig'
import { theme } from '../theme'

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

interface MyAppProps extends AppProps {
  initialColorMode: 'dark' | 'light'
}

export default function App({ Component, pageProps, initialColorMode }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  //Analyze URL params and change the theme to create custom styles
  const [config] = useConfigParser()
  const [parsedTheme, show] = useGetAppConfig(initialColorMode, config)

  const Updaters = () => {
    return (
      <>
        <ListsUpdater />
        <MulticallUpdater />
        <TransactionUpdater />
        <ApplicationUpdater />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Provider store={store}>
            <ThemeProvider theme={parsedTheme}>
              <GlobalStyles />
              <Web3Provider>
                <BlockNumberProvider>
                  <Updaters />
                  <RefreshContextProvider>
                    <MatchBreakpointsProvider>
                      <LanguageProvider>
                        <ModalProvider>
                          <Blocklist>
                            {show && <NavBarNew />}
                            {show && <MarketingModalCheck />}
                            <Popups />
                            <Component {...pageProps} />
                            <Analytics />
                            {show && <Footer />}
                          </Blocklist>
                        </ModalProvider>
                      </LanguageProvider>
                    </MatchBreakpointsProvider>
                  </RefreshContextProvider>
                </BlockNumberProvider>
              </Web3Provider>
            </ThemeProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext): Promise<{ initialColorMode: string }> => {
  //Gets cookie from HTTP request to make SSR consistent with user's theme preference
  const req = appContext.ctx.req
  let initialColorMode = 'light'
  if (req) {
    const cookiesString = req.headers.cookie || ''
    const cookies = Object.fromEntries(
      cookiesString.split('; ').map((c) => {
        const [name, v] = c.split('=', 2)
        return [name, decodeURIComponent(v)]
      }),
    )
    initialColorMode = cookies?.theme || 'dark'
  }
  return {
    initialColorMode: initialColorMode,
  }
}

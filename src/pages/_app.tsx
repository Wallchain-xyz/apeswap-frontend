import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import store from 'state'
import { theme } from 'theme'
import { Provider } from 'react-redux'
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
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

export default function App({ Component, pageProps }: AppProps) {
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Web3Provider>
            <BlockNumberProvider>
              <Updaters />
              <RefreshContextProvider>
                <MatchBreakpointsProvider>
                  <LanguageProvider>
                    <ModalProvider>
                      <Blocklist>
                        <NavBar />
                        <MarketingModalCheck />
                        <Popups />
                        <Component {...pageProps} />
                        <Analytics />
                        <Footer />
                      </Blocklist>
                    </ModalProvider>
                  </LanguageProvider>
                </MatchBreakpointsProvider>
              </RefreshContextProvider>
            </BlockNumberProvider>
          </Web3Provider>
        </ThemeProvider>
      </Provider>
    </>
  )
}

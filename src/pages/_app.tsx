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
    <Provider store={store}>
      <Web3Provider>
        <BlockNumberProvider>
          <Updaters />
          <ThemeProvider theme={theme}>
            <MatchBreakpointsProvider>
              <LanguageProvider>
                <ModalProvider>
                  <NavBar />
                  <Component {...pageProps} />
                  <Footer />
                </ModalProvider>
              </LanguageProvider>
            </MatchBreakpointsProvider>
          </ThemeProvider>
        </BlockNumberProvider>
      </Web3Provider>
    </Provider>
  )
}

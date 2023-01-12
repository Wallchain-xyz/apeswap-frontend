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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider>
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
      </Web3Provider>
    </Provider>
  )
}

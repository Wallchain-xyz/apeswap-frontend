import type { AppProps } from "next/app";
import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import {
  coinbaseWalletConnection,
  gnosisSafeConnection,
  injectedConnection,
  networkConnection,
  walletConnectConnection,
} from "utils/connection";
import { ThemeProvider } from "theme-ui";
import store from "state";
import { theme } from "theme";
import { useMemo } from "react";
import { Connection } from "utils/connection/types";
import { getConnectionName } from "utils/connection/utils";
import { Provider } from "react-redux";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { LanguageProvider } from "contexts/Localization";
import ModalProvider from "contexts/ModalContext";

const CONNECTIONS = [
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
];
const connectors: [Connector, Web3ReactHooks][] = CONNECTIONS.map(
  ({ hooks, connector }) => [connector, hooks]
);

export default function App({ Component, pageProps }: AppProps) {
  const key = useMemo(
    () =>
      CONNECTIONS.map((connection: Connection) =>
        getConnectionName({ connection })
      ).join("-"),
    [CONNECTIONS]
  );

  return (
    <Provider store={store}>
      <Web3ReactProvider connectors={connectors} key={key}>
        <ThemeProvider theme={theme}>
          <LanguageProvider>
            <ModalProvider>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </ModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import METAMASK_ICON_URL from "assets/images/metamaskWallet.png";
import WALLET_CONNECT_ICON_URL from "assets/images/walletConnectWallet.svg";
import COINBASE_ICON_URL from "assets/images/coinbaseWallet.svg";
import GNOSIS_SAFE_ICON_URL from "assets/images/gnosisSafeWallet.png";

import { StaticImageData } from "next/image";
import { Connection, ConnectionType } from "./types";
import { ChainId } from "@ape.swap/sdk";
import { NETWORK_RPC, RPC_PROVIDERS } from "config/constants/chains";

// Connections based from uniswap interface
// https://github.com/Uniswap/interface/blob/main/src/connection/index.ts

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_PROVIDERS,
      defaultChainId: ChainId.BSC,
    })
);
export const networkConnection: Connection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
};

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError })
);
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
};

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>(
  (actions) => new GnosisSafe({ actions })
);
export const gnosisSafeConnection: Connection = {
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE,
};

const [web3WalletConnect, web3WalletConnectHooks] =
  initializeConnector<WalletConnect>((actions) => {
    // Avoid testing for the best URL by only passing a single URL per chain.
    // Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
    const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(NETWORK_RPC).reduce(
      (map, [chainId, urls]) => ({
        ...map,
        [chainId]: urls[0],
      }),
      {}
    );
    return new WalletConnect({
      actions,
      options: {
        rpc: RPC_URLS_WITHOUT_FALLBACKS,
        qrcode: true,
      },
      onError,
    });
  });
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] =
  initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: NETWORK_RPC[ChainId.BSC][0],
          appName: "YourAppHere",
          appLogoUrl: "Yourlogohere.png",
          reloadOnDisconnect: false,
        },
        onError,
      })
  );
export const coinbaseWalletConnection: Connection = {
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
};

// Order this list for wallet display preferences
export const listOfConnections: Connection[] = [
  injectedConnection,
  walletConnectConnection,
  coinbaseWalletConnection,
  gnosisSafeConnection,
  networkConnection,
];

export const connectionIcons: Partial<Record<ConnectionType, StaticImageData>> =
  {
    [ConnectionType.INJECTED]: METAMASK_ICON_URL,
    [ConnectionType.WALLET_CONNECT]: WALLET_CONNECT_ICON_URL,
    [ConnectionType.COINBASE_WALLET]: COINBASE_ICON_URL,
    [ConnectionType.GNOSIS_SAFE]: GNOSIS_SAFE_ICON_URL,
  };

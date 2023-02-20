import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { Connection, ConnectionType } from './types'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { RPC_URLS } from 'config/constants/networks'
import { RPC_PROVIDERS } from 'config/constants/providers'

// Connections based from uniswap interface
// https://github.com/Uniswap/interface/blob/main/src/connection/index.ts

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_PROVIDERS,
      defaultChainId: SupportedChainId.BSC,
    }),
)
export const networkConnection: Connection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }))
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
}

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>((actions) => new GnosisSafe({ actions }))
export const gnosisSafeConnection: Connection = {
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE,
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>((actions) => {
  // Avoid testing for the best URL by only passing a single URL per chain.
  // Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
  const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(
    (map, [chainId, urls]) => ({
      ...map,
      [chainId]: urls[0],
    }),
    {},
  )
  return new WalletConnect({
    actions,
    options: {
      rpc: RPC_URLS_WITHOUT_FALLBACKS,
      qrcode: true,
    },
    onError,
  })
})
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
}

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: RPC_URLS[SupportedChainId.BSC][0],
        appName: 'YourAppHere',
        appLogoUrl: 'Yourlogohere.png',
        reloadOnDisconnect: false,
      },
      onError,
    }),
)
export const coinbaseWalletConnection: Connection = {
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
}

// Order this list for wallet display preferences
export const listOfConnections: Connection[] = [
  injectedConnection,
  walletConnectConnection,
  coinbaseWalletConnection,
  gnosisSafeConnection,
  networkConnection,
]

import { icons } from 'components/uikit/Svg/types'
import {
  coinbaseWalletConnection,
  injectedConnection,
  networkConnection,
  walletConnectConnection,
} from 'utils/connection'
import { Config } from './types'

const connectors: Config[] = [
  {
    label: 'Metamask',
    icon: icons.METAMASK,
    connection: injectedConnection,
  },
  {
    label: 'TrustWallet',
    icon: icons.TRUST_WALLET,
    connection: injectedConnection,
  },
  // TODO: Add torus login
  {
    label: 'Social Login',
    icon: icons.SOCIAL_LOGIN,
    connection: networkConnection,
  },
  {
    label: 'Brave Wallet',
    icon: icons.BRAVE,
    connection: injectedConnection,
  },
  {
    label: 'WalletConnect',
    icon: icons.WALLET_CONNECT,
    connection: walletConnectConnection,
  },
  {
    label: 'SafePal Wallet',
    icon: icons.SAFE_PAL_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'TokenPocket',
    icon: icons.TOKEN_POCKET,
    connection: injectedConnection,
  },
  {
    label: 'Coinbase Wallet',
    icon: icons.COINBASE,
    connection: coinbaseWalletConnection,
  },
  // TODO: Add binance wallet
  {
    label: 'Binance Chain Wallet',
    icon: icons.BINANCE_CHAIN,
    connection: injectedConnection,
  },
  // TODO: Add Unstoppable domains
  {
    label: 'Unstoppable Domains',
    icon: icons.UNSTOPPABLE,
    connection: injectedConnection,
  },
  {
    label: 'NABOX Wallet',
    icon: icons.NABOX,
    connection: injectedConnection,
  },
  {
    label: 'ONTO Wallet',
    icon: icons.ONTO_WALLET,
    connection: injectedConnection,
  },
  {
    label: 'Bitkeep',
    icon: icons.BITKEEP,
    connection: injectedConnection,
  },
  {
    label: 'MathWallet',
    icon: icons.MATH_WALLET,
    connection: injectedConnection,
  },
]

export default connectors
export const localStorageKey = 'accountStatus'

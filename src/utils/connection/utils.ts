import { Connection, ConnectionType } from './types'

/**
 * @param connection Connection to get the type
 * @returns The string name of the connection
 */
export const getConnectionName = ({
  connection,
}: {
  connection: Connection
}): string => {
  const connectionType = connection.type
  switch (connectionType) {
    // There is other types of injected wallets so additional checks will need to be placed for them
    case ConnectionType.INJECTED:
      return 'MetaMask'
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
    case ConnectionType.NETWORK:
      return 'Network'
    case ConnectionType.GNOSIS_SAFE:
      return 'Gnosis Safe'
  }
}



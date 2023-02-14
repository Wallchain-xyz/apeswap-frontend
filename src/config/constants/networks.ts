import { SupportedChainId } from '@ape.swap/sdk-core'

export const RPC_URLS: Record<SupportedChainId, string[]> = {
  [SupportedChainId.BSC]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [SupportedChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [SupportedChainId.POLYGON]: ['https://polygon-mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847'],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [SupportedChainId.MAINNET]: ['https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847'],
  [SupportedChainId.TLOS]: ['https://mainnet.telos.net/evm'],
}

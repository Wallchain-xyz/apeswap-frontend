import { SupportedChainId } from '@ape.swap/sdk-core'

export const RPC_URLS: Record<SupportedChainId, string[]> = {
  [SupportedChainId.BSC]: [
    'https://bnb.apeswap.dev',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [SupportedChainId.ARBITRUM_ONE]: ['https://arb1.arbitrum.io/rpc'],
  [SupportedChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [SupportedChainId.POLYGON]: ['https://polygon.apeswap.dev/'],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [SupportedChainId.MAINNET]: ['https://eth-mainnet.nodereal.io/v1/43f9100965104de49b580d1fa1ab28c0'],
  [SupportedChainId.TLOS]: ['https://mainnet.telos.net/evm'],
}

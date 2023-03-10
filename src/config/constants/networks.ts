import { SupportedChainId } from '@ape.swap/sdk-core'

export const RPC_URLS: Record<SupportedChainId, string[]> = {
  [SupportedChainId.BSC]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [SupportedChainId.ARBITRUM_ONE]: ['https://arb1.arbitrum.io/rpc'],
  [SupportedChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [SupportedChainId.POLYGON]: ['https://polygon.apeswap.dev/'],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://matic-mumbai.chainstacklabs.com'],
  [SupportedChainId.MAINNET]: ['https://mainnet.infura.io/v3/b3852de923e0444b93e0c8892ab8ef39'],
  [SupportedChainId.TLOS]: ['https://mainnet.telos.net/evm'],
}

import { StaticJsonRpcProvider } from '@ethersproject/providers'

export enum ChainId {
  MAINNET = 1,
  POLYGON = 137,
  BSC = 56,
}

export const RPC_URLS: Record<ChainId, string[]> = {
  [ChainId.MAINNET]: [
    'https://eth-mainnet.nodereal.io/v1/43f9100965104de49b580d1fa1ab28c0',
  ],
  [ChainId.POLYGON]: [''],
  [ChainId.BSC]: [''],
}

export const RPC_PROVIDERS: Record<ChainId, StaticJsonRpcProvider> = {
  [ChainId.MAINNET]: new StaticJsonRpcProvider(RPC_URLS[ChainId.MAINNET][0]),
  [ChainId.POLYGON]: new StaticJsonRpcProvider(RPC_URLS[ChainId.POLYGON][0]),
  [ChainId.BSC]: new StaticJsonRpcProvider(RPC_URLS[ChainId.BSC][0]),
}

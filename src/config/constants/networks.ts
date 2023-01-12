import { StaticJsonRpcProvider } from '@ethersproject/providers'

export enum SupportedChainId {
  MAINNET = 1,
  POLYGON = 137,
  BSC = 56,
}

export const RPC_URLS: Record<SupportedChainId, string[]> = {
  [SupportedChainId.MAINNET]: ['https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'],
  [SupportedChainId.POLYGON]: ['https://polygon-rpc.com'],
  [SupportedChainId.BSC]: ['https://bsc-dataseed4.binance.org'],
}

export const RPC_PROVIDERS: Record<SupportedChainId, StaticJsonRpcProvider> = {
  [SupportedChainId.MAINNET]: new StaticJsonRpcProvider(RPC_URLS[SupportedChainId.MAINNET][0]),
  [SupportedChainId.POLYGON]: new StaticJsonRpcProvider(RPC_URLS[SupportedChainId.POLYGON][0]),
  [SupportedChainId.BSC]: new StaticJsonRpcProvider(RPC_URLS[SupportedChainId.BSC][0]),
}

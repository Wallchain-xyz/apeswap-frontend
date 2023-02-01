import { SupportedChainId } from '@ape.swap/sdk-core'
import { FeeAmount } from '@ape.swap/v3-sdk'

// TODO: Figure out a way to condense supported chains to one spot

export const FEE_AMOUNT_DETAIL: Record<
  FeeAmount,
  { label: string; description: string; supportedChains: SupportedChainId[] }
> = {
  [FeeAmount.LOWEST]: {
    label: '0.01',
    description: 'Best for very stable pairs',
    supportedChains: [SupportedChainId.MAINNET, SupportedChainId.POLYGON],
  },
  [FeeAmount.LOW]: {
    label: '0.05',
    description: 'Best for stable pairs',
    supportedChains: [SupportedChainId.MAINNET, SupportedChainId.POLYGON],
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: 'Best for most pairs',
    supportedChains: [SupportedChainId.MAINNET, SupportedChainId.POLYGON],
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: 'Best for exotic pairs',
    supportedChains: [SupportedChainId.MAINNET, SupportedChainId.POLYGON],
  },
}

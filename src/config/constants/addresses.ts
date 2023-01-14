import { SupportedChainId } from '@ape.swap/sdk-core'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@ape.swap/v3-sdk'


type AddressMap = { [chainId: number]: string }

export const BANANA_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
  [SupportedChainId.BSC]: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
  [SupportedChainId.POLYGON]: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
  [SupportedChainId.MAINNET]: '0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2',
  [SupportedChainId.TLOS]: '0x667fd83e24ca1d935d36717d305d54fa0cac991c',
}

// TODO: Change this to actual addresses
export const V2_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TESTNET]: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
  [SupportedChainId.BSC]: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
  [SupportedChainId.POLYGON]: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
  [SupportedChainId.MAINNET]: '0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2',
  [SupportedChainId.TLOS]: '0x667fd83e24ca1d935d36717d305d54fa0cac991c',
}

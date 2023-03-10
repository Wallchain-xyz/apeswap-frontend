import { SupportedChainId } from '@ape.swap/sdk-core'
import { NavConfig } from 'components/NavBar/types'
import { isSupportedChain } from 'utils'
import arbitrumConfig from './arbitrumConfig'
import bscConfig from './bscConfig'
import ethConfig from './ethConfig'
import maticConfig from './maticConfig'
import tlosConfig from './tlosConfig'

export const configMappedToNetwork: Record<SupportedChainId, NavConfig[]> = {
  [SupportedChainId.BSC]: bscConfig,
  [SupportedChainId.BSC_TESTNET]: bscConfig,
  [SupportedChainId.POLYGON]: maticConfig,
  [SupportedChainId.POLYGON_MUMBAI]: maticConfig,
  [SupportedChainId.TLOS]: tlosConfig,
  [SupportedChainId.MAINNET]: ethConfig,
  [SupportedChainId.ARBITRUM_ONE]: arbitrumConfig,
}

export const getNavConfig = (chainId: SupportedChainId | undefined): NavConfig[] => {
  const supportedChainId = isSupportedChain(chainId)
  if (!chainId || !supportedChainId) {
    return configMappedToNetwork[SupportedChainId.BSC]
  }
  return configMappedToNetwork[chainId]
}

import Bnb from './bnb'
import Poly from './poly'
import Arbitrum from './Arbitrum'
import Tlos from './Tlos'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { ReactNode } from 'react'

export const grayIcons: Partial<Record<SupportedChainId, ReactNode>> = {
  [SupportedChainId.BSC]: <Bnb />,
  [SupportedChainId.POLYGON]: <Poly />,
  [SupportedChainId.ARBITRUM_ONE]: <Arbitrum />,
  [SupportedChainId.TLOS]: <Tlos />,
}

import { SupportedChainId } from '@ape.swap/sdk-core'

const contractAddresses = {
  mulltiCallV3: {
    [SupportedChainId.BSC]: '0x47A307e3167820daf22a377D777371753758f59c',
    [SupportedChainId.BSC_TESTNET]: '',
    [SupportedChainId.POLYGON]: '0x1F98415757620B543A52E61c46B32eB19261F984',
    [SupportedChainId.POLYGON_MUMBAI]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    [SupportedChainId.MAINNET]: '0x1F98415757620B543A52E61c46B32eB19261F984',
    [SupportedChainId.TLOS]: '0xf553b2be7aac670bcd812ba64a5025d9f5095ab5',
  },
}

export default contractAddresses

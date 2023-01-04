import { ChainId } from '@ape.swap/sdk'

const contractAddresses = {
  mulltiCallV3: {
    [ChainId.BSC]: '0x47A307e3167820daf22a377D777371753758f59c',
    [ChainId.BSC_TESTNET]: '',
    [ChainId.MATIC]: '0x1F98415757620B543A52E61c46B32eB19261F984',
    [ChainId.MATIC_TESTNET]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    [ChainId.MAINNET]: '0x1F98415757620B543A52E61c46B32eB19261F984',
    [ChainId.TLOS]: '0xf553b2be7aac670bcd812ba64a5025d9f5095ab5',
  },
}

export default contractAddresses

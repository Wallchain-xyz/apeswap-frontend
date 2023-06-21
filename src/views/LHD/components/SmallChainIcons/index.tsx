import { CHAIN_DETAILS } from 'views/LHD/utils/config'
import Icon from './Icon'

export const icons = CHAIN_DETAILS.reduce((obj, chainDetail) => {
  return {
    ...obj,
    [chainDetail.chainId]: <Icon chain={chainDetail.chainId} />,
  }
}, {})

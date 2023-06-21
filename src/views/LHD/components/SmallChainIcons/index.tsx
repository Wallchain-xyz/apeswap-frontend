import { CHAIN_DETAILS } from 'views/LHD/utils/config'
import Icon from './Icon'

export const icons: any = CHAIN_DETAILS.reduce((obj, chainDetail) => {
  return {
    ...obj,
    [chainDetail.chainId]: <Icon chain={chainDetail.chainId} />,
  }
}, {})

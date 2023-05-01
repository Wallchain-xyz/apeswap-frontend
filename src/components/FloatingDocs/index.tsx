import { NETWORK_LABEL } from 'config/constants/chains'
import { DOC_LINKS, FARMS, ROUTE_NAMES } from 'config/constants/tutorials'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Svg } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'

export const FloatingDocs = () => {
  const { asPath } = useRouter()
  const { chainId } = useWeb3React()
  const getDocsLink = () => {
    const networkLabel = NETWORK_LABEL[chainId as SupportedChainId]
    const farmTypes = networkLabel ? FARMS[networkLabel] : ''
    DOC_LINKS['FARMS'] = `https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/${farmTypes}`
    return DOC_LINKS[ROUTE_NAMES[asPath ?? '/'] || 'HOME']
  }

  return (
    <Flex
      sx={{
        position: 'fixed',
        right: ['20px', '20px', '35px'],
        bottom: ['20px', '20px', '30px'],
        width: ['40px', '40px', '50px'],
        zIndex: 5,
        cursor: 'pointer',
      }}
      onClick={() => window.open(getDocsLink(), '_blank')}
    >
      <Svg icon="docs" color="primaryBright" />
    </Flex>
  )
}

export default FloatingDocs

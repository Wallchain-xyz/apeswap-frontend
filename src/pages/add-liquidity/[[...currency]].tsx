import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import AddLiquidity from 'views/AddLiquidity'

const AddLiquidityPage = () => {
  const { chainId } = useWeb3React()
  const { query, push } = useRouter()
  const [currencyIdA, currencyIdB, feeAmountFromUrl] = (query.currency as string[]) || [undefined, undefined, '']

  if (chainId === SupportedChainId.ARBITRUM_ONE || chainId === SupportedChainId.MAINNET) {
    push(`${process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL}/add-liquidity`)
  }

  return (
    <PageContainer variant="dex">
      <AddLiquidity currencyIdA={currencyIdA ?? 'ETH'} currencyIdB={currencyIdB} feeAmountFromUrl={feeAmountFromUrl} />
    </PageContainer>
  )
}

export default AddLiquidityPage

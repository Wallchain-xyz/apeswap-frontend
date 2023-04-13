import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import AddLiquidity from 'views/AddLiquidity'

const AddLiquidityPage = () => {
  const { query } = useRouter()
  const [currencyIdA, currencyIdB, feeAmountFromUrl] = (query.currency as string[]) || [undefined, undefined, '']

  return (
    <PageContainer variant="dex">
      <AddLiquidity currencyIdA={currencyIdA ?? 'ETH'} currencyIdB={currencyIdB} feeAmountFromUrl={feeAmountFromUrl} />
    </PageContainer>
  )
}

export default AddLiquidityPage

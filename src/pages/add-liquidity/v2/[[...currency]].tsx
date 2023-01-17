import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import AddLiquidityV2 from './AddLiquidityV2'

const AddLiquidityPageV2 = () => {
  const { query } = useRouter()
  const [currencyIdA, currencyIdB] = (query.currency as string[]) || ['', '']

  return (
    <PageContainer>
      <AddLiquidityV2 currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
    </PageContainer>
  )
}

export default AddLiquidityPageV2

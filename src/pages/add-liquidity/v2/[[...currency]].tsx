import PageContainer from 'components/PageContainer'
import { useRouter } from 'next/router'
import AddLiquidityV2 from 'views/AddLiquidityV2'

const AddLiquidityPageV2 = () => {
  const { query } = useRouter()
  // TODO: Default to whatever pair we want
  const [currencyIdA, currencyIdB] = (query.currency as string[]) || ['', '']

  return (
    <PageContainer style={{ justifyContent: 'center', marginTop: '100px' }}>
      <AddLiquidityV2 currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
    </PageContainer>
  )
}

export default AddLiquidityPageV2

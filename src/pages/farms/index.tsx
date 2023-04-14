import PageContainer from 'components/PageContainer'
import useAllLpPrices from 'hooks/useAllLPPrices'
import mergeFarmConfigs from 'state/farms/mergeFarmConfigs'
import Bonds from 'views/Bonds'

const FarmsPage = () => {
  mergeFarmConfigs()
  useAllLpPrices()
  return (
    <PageContainer variant="listView">
      <Bonds />
    </PageContainer>
  )
}

export default FarmsPage

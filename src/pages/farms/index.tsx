import PageContainer from 'components/PageContainer'
import useAllLpPrices from 'hooks/useAllLPPrices'
import { usePollFarms } from 'state/farms/hooks'
import mergeFarmConfigs from 'state/farms/mergeFarmConfigs'
import Bonds from 'views/Bonds'
import Farms from 'views/Farms'

const FarmsPage = () => {
  usePollFarms()
  return (
    <PageContainer variant="listView">
      <Farms />
    </PageContainer>
  )
}

export default FarmsPage

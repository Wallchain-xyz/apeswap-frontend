import PageContainer from 'components/PageContainer'
import useAllLpPrices from 'hooks/useAllLPPrices'
import { usePollFarms } from 'state/farms/hooks'
import mergeFarmConfigs from 'state/farms/mergeFarmConfigs'
import Bonds from 'views/Bonds'

const FarmsPage = () => {
  usePollFarms()
  return (
    <PageContainer variant="listView">
      <Bonds />
    </PageContainer>
  )
}

export default FarmsPage

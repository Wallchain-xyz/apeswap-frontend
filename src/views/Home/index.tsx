import WelcomeContent from './components/WelcomeContent/WelcomeContent'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import SwiperProvider from 'contexts/SwiperProvider'
import { Flex } from 'components/uikit'
import StatCards from './components/StatCards/StatCards'
import TrendingTokens from './components/TrendingTokens/TrendingTokens'
import News from './components/News/News'
import Services from './components/Services/Services'
import Values from './components/Values/Values'
import LaunchCalendar from './components/LaunchCalendar/LaunchCalendar'
import useAllTokenPrices from 'hooks/useAllTokenPrices'

const Home = () => {
  const { chainId } = useWeb3React()
  useAllTokenPrices()

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <SwiperProvider>
        <WelcomeContent />
      </SwiperProvider>
      <StatCards />
      <TrendingTokens />
      <SwiperProvider>
        <News />
      </SwiperProvider>
      {chainId === SupportedChainId.BSC && (
        <SwiperProvider>
          <Services />
        </SwiperProvider>
      )}
      <SwiperProvider>
        <Values />
      </SwiperProvider>
      <SwiperProvider>
        <LaunchCalendar />
      </SwiperProvider>
    </Flex>
  )
}

export default Home

import dynamic from 'next/dynamic'
import WelcomeContent from './components/WelcomeContent/WelcomeContent'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import SwiperProvider from 'contexts/SwiperProvider'
import { Flex } from 'components/uikit'
import TrendingTokens from './components/TrendingTokens/TrendingTokens'
import Services from './components/Services/Services'
import LaunchCalendar from './components/LaunchCalendar/LaunchCalendar'
import useAllTokenPrices from 'hooks/useAllTokenPrices'

// Components
import BondsStatsCards from './components/BondsStatsCards'

// TODO: When updating the homepage these components should be built to SSR
// To make the UX slightly better we could have a SSR component on loading to restrict page jumps
const StatCards = dynamic(() => import('./components/StatCards/StatCards'), {
  ssr: false,
})
const News = dynamic(() => import('./components/News/News'), {
  ssr: false,
})
const Values = dynamic(() => import('./components/Values/Values'), {
  ssr: false,
})

const Home = ({ randomImage, randomLHDImage }: { randomImage: number; randomLHDImage: number }) => {
  const { chainId } = useWeb3React()
  useAllTokenPrices()

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <SwiperProvider>
        <WelcomeContent randomImage={randomImage} randomLHDImage={randomLHDImage} />
      </SwiperProvider>
      <BondsStatsCards />
      {/* TODO: Remove this and all its code */}
      {/* <StatCards /> */}
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

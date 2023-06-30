import PageContainer from 'components/PageContainer'
import LHD from 'views/LHD'

import { getIndustryStats } from 'hooks/queries/useGetIndustryStats'
import { getHistoricalIndustryStats } from 'hooks/queries/useGetHistoricalIndustryStats'
import { getLHDProfiles } from 'hooks/queries/useGetLHDProfiles'

const LHDPage = () => {
  return (
    <PageContainer variant="lhd">
      <LHD />
    </PageContainer>
  )
}

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export default LHDPage

export const getServerSideProps = async (ctx: any) => {
  const queryClient = new QueryClient()
  const { query: filters } = ctx
  await queryClient.prefetchQuery([QUERY_KEYS.INDUSTRY_STATS], getIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.HISTORICAL_INDUSTRY_STATS], getHistoricalIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.LHD_PROFILES, filters], () => getLHDProfiles({ filters }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

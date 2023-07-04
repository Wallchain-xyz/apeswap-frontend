import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { IndustryStats } from 'utils/types/lhd'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getHistoricalIndustryStats = async (): Promise<IndustryStats> => {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const { data } = await axios.get(`${LHD_API}/industry-stats/${date.toISOString().split('T')[0]}`)
  return data
}

export default function useGetHistoricalIndustryStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.HISTORICAL_INDUSTRY_STATS],
    queryFn: getHistoricalIndustryStats,
  })
}

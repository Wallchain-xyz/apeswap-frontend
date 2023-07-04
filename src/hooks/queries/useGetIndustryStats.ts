import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { IndustryStats } from 'utils/types/lhd'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getIndustryStats = async (): Promise<IndustryStats> => {
  const { data } = await axios.get(`${LHD_API}/industry-stats`)
  return data
}

export default function useGetIndustryStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.INDUSTRY_STATS],
    queryFn: getIndustryStats,
  })
}

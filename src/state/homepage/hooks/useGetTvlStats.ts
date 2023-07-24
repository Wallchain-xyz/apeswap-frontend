import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Constants
import { apiBaseUrl } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

// Types
import { TvlStats } from '../types'

export const getTvlStats = async (): Promise<TvlStats> => {
  const { data } = await axios.get(`${apiBaseUrl}/stats/tvl`)
  return data
}

export default function useGetTvlStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.TVL_STATS],
    queryFn: getTvlStats,
  })
}

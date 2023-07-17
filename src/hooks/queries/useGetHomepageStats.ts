import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { HomepageDTO } from 'utils/types/homepage'

// Constants
import { HOMEPAGE_API_TEMP } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getHomepageStats = async (): Promise<HomepageDTO> => {
  const { data } = await axios.get(`${HOMEPAGE_API_TEMP}/stats/homepage`)
  return data
}

export default function useGetHomepageStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.HOMEPAGE_STATS],
    queryFn: getHomepageStats,
  })
}

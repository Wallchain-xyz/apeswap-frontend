import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
// TODO: Add types
// import { HomepageDTO } from 'utils/types/homepage'

// Constants
import { baseUrlStrapi } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getLiveAndUpcoming = async (): Promise<any> => {
  const { data } = await axios.get(`${baseUrlStrapi}/home-live-and-upcomings`)
  return data
}

export default function useGetHomepageStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.LIVE_AND_UPCOMING],
    queryFn: getLiveAndUpcoming,
  })
}

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { LHDProfiles } from 'utils/types/lhd'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getLHDProfiles = async (query?: string, filters?: string): Promise<LHDProfiles> => {
  let profilesUrl = `${LHD_API}/liquidity-health-dashboard/profiles`

  if (query) {
    profilesUrl += `/search/${query}`
  } else if (filters) {
    profilesUrl += `?${filters}`
  }
  const { data } = await axios.get(profilesUrl)
  return data
}

export default function useGetLHDProfiles(query?: string, filters?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILES],
    queryFn: () => getLHDProfiles(query, filters),
  })
}

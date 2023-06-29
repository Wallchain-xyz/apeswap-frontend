import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import queryString from 'query-string'

// Types
import { LHDProfiles, Filters } from 'utils/types/lhd'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export const getLHDProfiles = async ({
  query,
  filters,
}: {
  query?: string
  filters?: Filters
}): Promise<LHDProfiles> => {
  let profilesUrl = `${LHD_API}/liquidity-health-dashboard/profiles`

  if (query) {
    profilesUrl += `/search/${query}`
  } else if (filters) {
    const parsedFilters = queryString.stringify(filters)
    profilesUrl += `?${parsedFilters}`
  }
  const { data } = await axios.get(profilesUrl)
  return data
}

export default function useGetLHDProfiles({ query, filters }: { query?: string; filters?: Filters }) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILES, filters],
    queryFn: () => getLHDProfiles({ query, filters }),
  })
}

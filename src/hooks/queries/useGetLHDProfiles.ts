import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import queryString from 'query-string'

// Types
import { LHDProfiles, Filters } from 'utils/types/lhd'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'

interface FiltersWithSearch extends Filters {
  search?: string
}

export const getLHDProfiles = async ({
  filters,
}: {
  query?: string
  filters?: FiltersWithSearch
}): Promise<LHDProfiles> => {
  let profilesUrl = `${LHD_API}/liquidity-health-dashboard/profiles`

  if (filters?.search) {
    profilesUrl += `/search/${filters.search}`
  } else if (filters) {
    const parsedFilters = queryString.stringify(filters)
    profilesUrl += `?${parsedFilters}`
  }
  const { data } = await axios.get(profilesUrl)
  return data
}

export default function useGetLHDProfiles({ filters }: { query?: string; filters?: FiltersWithSearch }) {
  return useQuery({
    queryKey: [QUERY_KEYS.LHD_PROFILES, filters],
    queryFn: () => getLHDProfiles({ filters }),
  })
}

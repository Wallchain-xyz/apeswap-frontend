import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Types
import { LHDProfiles, Filters } from 'utils/types/lhd'

// Helpers
import { generateSearchParams } from 'views/LHD/components/SearchBar/helpers'

// Constants
import { LHD_API } from 'config/constants/api'
import { QUERY_KEYS } from 'config/constants/queryKeys'
import { INITIAL_FILTER_VALUES } from 'views/LHD/utils/config'

interface FiltersWithSearch extends Filters {
  search?: string
}

export const getLHDProfiles = async ({ filters = {} }: { filters?: FiltersWithSearch }): Promise<LHDProfiles> => {
  let profilesUrl = `${LHD_API}/liquidity-health-dashboard/profiles`

  let parsedFilters = ''

  if (filters?.search) {
    parsedFilters = generateSearchParams({ ...INITIAL_FILTER_VALUES, offset: filters.offset ?? 0 })
    profilesUrl += `/search/${filters?.search}${parsedFilters ? `?${parsedFilters}` : ''}`
  } else if (filters) {
    parsedFilters = generateSearchParams({ ...INITIAL_FILTER_VALUES, ...filters })
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

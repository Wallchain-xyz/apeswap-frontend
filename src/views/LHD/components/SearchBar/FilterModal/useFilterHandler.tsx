import { useCallback, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'

// Types
import { Filters } from 'utils/types/lhd'

const useFilterHandler = (
  setSearchQueryString: (searchQuery: string) => void,
  searchQueryString: string,
  handleFiltersChange: ({ filters }: { filters: Filters }) => void,
) => {
  const debouncedQueryString = useDebounce(searchQueryString, 250)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryString(searchQuery)
    },
    [setSearchQueryString],
  )

  useEffect(() => {
    if (debouncedQueryString) {
      handleFiltersChange({ filters: { search: debouncedQueryString } })
    } else {
      handleFiltersChange({ filters: {} })
    }
  }, [debouncedQueryString])

  return handleQueryChange
}

export default useFilterHandler

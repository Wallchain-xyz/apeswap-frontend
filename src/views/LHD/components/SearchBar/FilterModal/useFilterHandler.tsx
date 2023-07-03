import { useCallback, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'

// Types
import { Filters } from 'utils/types/lhd'

const useFilterHandler = (
  setSearchQueryParam: (searchQuery: string) => void,
  searchQueryParam: string | null,
  handleFiltersChange: ({ filters }: { filters: Filters }) => void,
) => {
  const debouncedQuery = useDebounce(searchQueryParam, 250)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryParam(searchQuery)
    },
    [setSearchQueryParam],
  )

  useEffect(() => {
    // Do NOT call handleFiltersChange on component mount
    if (debouncedQuery === null) {
      return
    }

    if (debouncedQuery) {
      handleFiltersChange({ filters: { search: debouncedQuery } })
    } else {
      handleFiltersChange({ filters: {} })
    }
  }, [debouncedQuery])

  return handleQueryChange
}

export default useFilterHandler

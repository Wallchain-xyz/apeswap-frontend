import { useCallback, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'

// Types
import { Filters } from 'utils/types/lhd'

interface useFilterHandlerProps {
  searchQueryParam: string
  isSearchQuery: boolean
  setSearchQueryParam: (searchQuery: string) => void
  setIsSearchQuery: (isSearchQuery: boolean) => void
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
}

const useFilterHandler = ({
  searchQueryParam,
  isSearchQuery,
  setSearchQueryParam,
  handleFiltersChange,
  setIsSearchQuery,
}: useFilterHandlerProps) => {
  const debouncedQuery = useDebounce(searchQueryParam, 250)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryParam(searchQuery)
      setIsSearchQuery(true)
    },
    [setSearchQueryParam],
  )

  useEffect(() => {
    // Do NOT call handleFiltersChange on component mount or if searchQuery is not the intended action
    if (!isSearchQuery) {
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

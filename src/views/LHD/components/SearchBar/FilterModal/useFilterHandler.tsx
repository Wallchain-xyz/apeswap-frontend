import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { fetchProfilesQuery } from 'state/lhd/actions'
import useDebounce from 'hooks/useDebounce'

const useFilterHandler = (
  setSearchQueryString: any,
  searchQueryString: any,
  handleNoResults: (value: boolean) => void,
) => {
  const dispatch = useAppDispatch()
  const debouncedQueryString = useDebounce(searchQueryString, 1000)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryString(searchQuery)
    },
    [setSearchQueryString],
  )

  useEffect(() => {
    dispatch(fetchProfilesQuery(undefined, debouncedQueryString))
  }, [debouncedQueryString, dispatch, handleNoResults])

  return handleQueryChange
}

export default useFilterHandler

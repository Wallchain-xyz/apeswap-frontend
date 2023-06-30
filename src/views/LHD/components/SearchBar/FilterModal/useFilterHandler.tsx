import { useCallback, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'
import { useRouter } from 'next/router'

const useFilterHandler = (setSearchQueryString: (searchQuery: string) => void, searchQueryString: any) => {
  const router = useRouter()
  const debouncedQueryString = useDebounce(searchQueryString, 1000)

  const handleQueryChange = useCallback(
    (searchQuery: string) => {
      setSearchQueryString(searchQuery)
    },
    [setSearchQueryString],
  )

  useEffect(() => {
    router.replace({
      query: debouncedQueryString ? `search=${debouncedQueryString}` : '',
    })
  }, [debouncedQueryString])

  return handleQueryChange
}

export default useFilterHandler

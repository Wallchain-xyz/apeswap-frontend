import { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'components/uikit'
import { styles } from './styles'

// Components
import ListViewLayout from 'components/ListView/ListViewLayout'
import TokensProfileList from './components/TokensProfileList'
import TitleCards from './components/TitleCards'
import LHDModal from './components/LHDModal'

// Helpers
import { generateSearchParams, queryStringToObject, getFilterDiff } from './components/SearchBar/helpers'

// Constants
import { INITIAL_FILTER_VALUES } from './utils/config'

// Hooks
import { useSelector } from 'react-redux'
import useGetLHDProfiles from 'hooks/queries/useGetLHDProfiles'

// Types
import { Filters } from 'utils/types/lhd'
import { AppState } from 'state'

const LHD = () => {
  const router = useRouter()
  const { query: filters } = router
  const parsedFilters = queryStringToObject(filters as unknown as string)
  const appliedFiltersDiff = getFilterDiff({ ...INITIAL_FILTER_VALUES, ...parsedFilters })
  /**
   * Applied filters are the source of truth for the LHD filters, and are updated when the user changes the filters or searches.
   * The applied filters are used to fetch the data, and are also used to update the URL query string.
   * */
  const [appliedFilters, setAppliedFilters] = useState<Filters>(appliedFiltersDiff)
  /** Prevents a race condition between searching and filtering */
  const [isSearchQuery, setIsSearchQuery] = useState<boolean>(false)
  const { data: simpleProfiles = { count: 0, data: [] }, isLoading } = useGetLHDProfiles({ filters: appliedFilters })
  const { isLhdAuth } = useSelector((state: AppState) => state.lhd)

  const { offset, search, sort, ...appliedModalFilters } = appliedFilters
  /**
   * This function is called when the user changes the filters or searches.
   * It updates the applied filters, and updates the URL query string in the same action handler.
   */
  const handleFiltersChange = ({ filters }: { filters: Filters; query?: string }): void => {
    setIsSearchQuery(!!filters?.search)

    setAppliedFilters(filters)
    const filterString = generateSearchParams({ ...INITIAL_FILTER_VALUES, ...filters })

    router.replace(
      {
        query: filterString,
      },
      undefined,
      { scroll: false },
    )
  }

  return (
    <Flex sx={styles.mainLHDContainer}>
      <ListViewLayout>
        <TitleCards appliedFilters={appliedModalFilters} handleFiltersChange={handleFiltersChange} />
        <TokensProfileList
          simpleProfiles={simpleProfiles}
          isLoading={isLoading}
          isSearchQuery={isSearchQuery}
          setIsSearchQuery={setIsSearchQuery}
          handleFiltersChange={handleFiltersChange}
          appliedFilters={appliedFilters}
        />
      </ListViewLayout>
      <LHDModal isLhdAuthModalOpen={!isLhdAuth} />
    </Flex>
  )
}

export default LHD

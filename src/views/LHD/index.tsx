import { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'components/uikit'
import { styles } from './styles'
import queryString from 'query-string'

// Components
import ListViewLayout from 'components/ListView/ListViewLayout'
import TokensProfileList from './components/TokensProfileList'
import SearchBar from './components/SearchBar'
import TitleCards from './components/TitleCards'
import LHDModal from './components/LHDModal'

// Hooks
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import useGetLHDProfiles from 'hooks/queries/useGetLHDProfiles'

// Types
import { Filters } from 'utils/types/lhd'

const LHD = () => {
  const router = useRouter()
  const { query: filters } = router
  /**
   * Applied filters are the source of truth for the LHD filters, and are updated when the user changes the filters or searches.
   * The applied filters are used to fetch the data, and are also used to update the URL query string.
   * */
  const [appliedFilters, setAppliedFilters] = useState<Filters>(filters)
  const { data: simpleProfiles = { count: 0, data: [] }, isLoading } = useGetLHDProfiles({ filters: appliedFilters })
  const { isLhdAuth } = useSelector((state: AppState) => state.lhd)

  /**
   * This function is called when the user changes the filters or searches.
   * It updates the applied filters, and updates the URL query string in the same action handler.
   */
  const handleFiltersChange = ({ filters }: { filters: Filters }): void => {
    setAppliedFilters(filters)
    const filterString = queryString.stringify(filters)
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
        <TitleCards />
        <SearchBar handleFiltersChange={handleFiltersChange} />
        <TokensProfileList
          simpleProfiles={simpleProfiles}
          isLoading={isLoading}
          handleFiltersChange={handleFiltersChange}
          appliedFilters={appliedFilters}
        />
      </ListViewLayout>
      <LHDModal isLhdAuthModalOpen={!isLhdAuth} />
    </Flex>
  )
}

export default LHD

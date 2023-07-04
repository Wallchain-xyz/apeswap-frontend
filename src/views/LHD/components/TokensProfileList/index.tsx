import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'
import { Flex, Svg, Text } from 'components/uikit'
import Pagination from './components/Pagination'
import { sortProfiles } from './utils/sortProfiles'
import { useTranslation } from 'contexts/Localization'
import _ from 'lodash'

// Types
import { LHDProfiles, Filters } from 'utils/types/lhd'
interface TokensProfileListProps {
  simpleProfiles: LHDProfiles
  isLoading: boolean
  appliedFilters: Filters
  handleFiltersChange: ({ filters }: { filters: Filters }) => void
}

const TokensProfileList = ({
  simpleProfiles,
  isLoading,
  appliedFilters,
  handleFiltersChange,
}: TokensProfileListProps) => {
  const [sortCol, setSortCol] = useState(appliedFilters.sort ? 'Market Cap' : '#')
  const [sortType, setSortType] = useState<'asc' | 'desc'>(appliedFilters.sort ? 'desc' : 'asc')

  const { t } = useTranslation()

  useEffect(() => {
    if (appliedFilters.sort) {
      setSortCol('Market Cap')
      setSortType('desc')
    } else {
      setSortCol('#')
      setSortType('asc')
    }
  }, [appliedFilters.sort])

  const { offset, ...rest } = appliedFilters
  const currentPage = offset ? offset / 50 + 1 : 1

  const handlePaginate = (page: number): void => {
    if (page === 1) {
      // do not add offset to the query string AND cache if the page is 1
      handleFiltersChange({ filters: rest })
    } else {
      handleFiltersChange({ filters: { ...appliedFilters, offset: (page - 1) * 50 } })
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Box sx={styles.tableContainer}>
        <TableHeader
          sortCol={sortCol}
          onSortColChange={(value: string) => setSortCol(value)}
          sortType={sortType}
          onSortTypeChange={(value) => setSortType(value)}
        />
        {isLoading &&
          [...Array(50)].map((_, i) => {
            return <SkeletonRow key={i} />
          })}

        {simpleProfiles.count > 0 ? (
          sortProfiles(simpleProfiles.data ?? undefined, sortCol, sortType)?.map((simpleProfile, index) => {
            return <TableRow key={`simpleProfile${index}`} index={index} simpleProfile={simpleProfile} />
          })
        ) : (
          <Flex
            sx={{
              width: '100%',
              height: '200px',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: '20px',
            }}
          >
            <Svg icon="placeholderMonkey" />
            <Text sx={{ fontSize: '12px', fontWeight: 500, color: 'textDisabled' }}>{t('No Results Found')}</Text>
          </Flex>
        )}
      </Box>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: number) => handlePaginate(page)}
        totalPages={simpleProfiles ? Math.ceil(simpleProfiles.count / 50) : 0}
        hidePagination={simpleProfiles.count < 51}
      />
    </>
  )
}

export default TokensProfileList

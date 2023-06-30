import { useState } from 'react'
import { Box } from 'theme-ui'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'
import { Flex, Svg, Text } from 'components/uikit'
import Pagination from './components/Pagination'
import SearchBar from '../SearchBar'
import { sortProfiles } from './utils/sortProfiles'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import _ from 'lodash'
import queryString from 'query-string'

// Hooks
import useGetLHDProfiles from 'hooks/queries/useGetLHDProfiles'

const TokensProfileList = () => {
  const router = useRouter()
  const { query: filters } = router
  const [currentPage, setCurrentPage] = useState<number>(filters.offset ? Number(filters.offset) / 50 + 1 : 1)
  const [sortCol, setSortCol] = useState('#')
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  const [noResults, setNoResults] = useState(false)
  const { data: simpleProfiles = { count: 0, data: [] } } = useGetLHDProfiles({ filters })
  const { t } = useTranslation()

  const handlePaginate = (page: number): void => {
    setCurrentPage(page)
    const parsedFilters = queryString.stringify({ ...filters, offset: (page - 1) * 50 })
    router.replace({
      query: parsedFilters,
    })
  }

  return (
    <>
      <SearchBar />
      <Box sx={styles.tableContainer}>
        <TableHeader
          sortCol={sortCol}
          onSortColChange={(value: string) => setSortCol(value)}
          sortType={sortType}
          onSortTypeChange={(value) => setSortType(value)}
        />
        {simpleProfiles && simpleProfiles.count === 0 ? (
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
        ) : simpleProfiles?.data?.length > 0 ? (
          sortProfiles(simpleProfiles.data ?? undefined, sortCol, sortType)?.map((simpleProfile, index) => {
            return <TableRow key={`simpleProfile${index}`} index={index} simpleProfile={simpleProfile} />
          })
        ) : (
          <>
            {[...Array(50)].map((_, i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        )}
      </Box>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: number) => handlePaginate(page)}
        totalPages={simpleProfiles ? Math.ceil(simpleProfiles.count / 50) : 0}
        hidePagination={simpleProfiles.count < 51 || noResults}
      />
    </>
  )
}

export default TokensProfileList

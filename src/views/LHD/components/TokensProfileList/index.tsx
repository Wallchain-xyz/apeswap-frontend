import React, { useCallback, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { useIndustryAvg, useLHDFilterValues, useSimpleProfiles } from 'state/lhd/hooks'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'
import { Flex, Svg, Text } from 'components/uikit'
import Pagination from './components/Pagination'
import { fetchProfilesQuery } from '../../../../state/lhd/actions'
import { useAppDispatch } from '../../../../state/hooks'
import SearchBar from '../SearchBar'
import { sortProfiles } from './utils/sortProfiles'
import { useTranslation } from 'contexts/Localization'
import { generateSearchParams } from '../SearchBar/helpers'

const TokensProfileList = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const simpleProfiles = useSimpleProfiles()
  const [sortCol, setSortCol] = useState('#')
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  const { tokensTracked } = useIndustryAvg()
  const dispatch = useAppDispatch()
  const [searchQueryString, setSearchQueryString] = useState('')
  const [noResults, setNoResults] = useState(false)
  const paginatedQuery = `offset=${(currentPage - 1) * 50}`
  const filterState = useLHDFilterValues()
  const filterString = generateSearchParams(filterState)

  const fullQuery = `${paginatedQuery}${filterString ? '&' + filterString : ''}`

  useEffect(() => {
    if (fullQuery) {
      dispatch(fetchProfilesQuery(fullQuery))
    }
  }, [fullQuery, dispatch])

  const handleNoResults = useCallback((value: boolean) => {
    setNoResults(value)
  }, [])

  return (
    <>
      <SearchBar
        handleNoResults={handleNoResults}
        searchQueryString={searchQueryString}
        setSearchQueryString={setSearchQueryString}
      />
      <Box sx={styles.tableContainer}>
        <TableHeader
          sortCol={sortCol}
          onSortColChange={(value: string) => setSortCol(value)}
          sortType={sortType}
          onSortTypeChange={(value) => setSortType(value)}
        />
        {noResults ? (
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
        ) : simpleProfiles?.data.length > 0 ? (
          sortProfiles(simpleProfiles.data ?? undefined, sortCol, sortType)?.map((simpleProfile, index) => {
            return <TableRow key={`simpleProfile${index}`} index={index} simpleProfile={simpleProfile} />
          })
        ) : (
          <>
            {[...Array(50)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        )}
      </Box>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
        totalPages={simpleProfiles ? Math.ceil(simpleProfiles.count / 50) : 0}
        hidePagination={noResults}
      />
    </>
  )
}

export default TokensProfileList

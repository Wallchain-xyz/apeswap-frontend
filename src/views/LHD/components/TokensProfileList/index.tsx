import React, { useCallback, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { useLHDFilterValues, useSimpleProfiles } from 'state/lhd/hooks'
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
import { useRouter } from 'next/router'
import { setFilterState, initialFilterValues } from '../../../../state/lhd/reducer'
import _ from 'lodash'

const TokensProfileList = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const simpleProfiles = useSimpleProfiles()
  const [sortCol, setSortCol] = useState('#')
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
  const dispatch = useAppDispatch()
  const [searchQueryString, setSearchQueryString] = useState('')
  const [noResults, setNoResults] = useState(false)
  const router = useRouter()
  const paginatedQuery = `${
    currentPage > 1 ? 'offset=' + (currentPage - 1) * 50 : router.asPath.includes('offset=') ? 'offset=0' : ''
  }`
  const filterState = useLHDFilterValues()
  const filterString = generateSearchParams(filterState)

  let fullQuery = `${paginatedQuery}${filterString ? '&' + filterString : ''}`

  const queryStringToObject = (queryString: string) => {
    const searchParams = new URLSearchParams(queryString)
    const result: any = _.cloneDeep(initialFilterValues)

    searchParams.forEach((value, key) => {
      if (key === 'offset') {
        setCurrentPage(Number(value) / 50 + 1)
        return
      }

      let mainKey = key.endsWith('Min') || key.endsWith('Max') ? key.slice(0, -3) : key
      let subKey = key.endsWith('Min') || key.endsWith('Max') ? key.slice(-3).toLowerCase() : key

      if (result[mainKey]) {
        if (mainKey === 'tags' || mainKey === 'chains') {
          result[mainKey] = value.split(',')
        } else {
          let parsedValue = parseFloat(value)
          // if it's a decimal, multiply by 100
          if (parsedValue <= 1) {
            parsedValue *= 100
          }
          result[mainKey][subKey] = parsedValue
        }
      }
    })

    return result
  }

  useEffect(() => {
    //Note: we should be able to use router.query here but it's not giving stable results
    let qs = router.asPath.replace(router.pathname + '?', '').replace(router.pathname, '')
    let filterOptions = queryStringToObject(qs)

    if (qs) {
      dispatch(setFilterState(filterOptions))
    } else {
      dispatch(fetchProfilesQuery())
    }
  }, [router.asPath])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterString])

  useEffect(() => {
    if (fullQuery) {
      const newUrl = `${router.pathname}?${fullQuery}`
      router.replace(newUrl, newUrl)

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
        onPageChange={(page: number) => setCurrentPage(page)}
        totalPages={simpleProfiles ? Math.ceil(simpleProfiles.count / 50) : 0}
        hidePagination={simpleProfiles.count < 51 || noResults}
      />
    </>
  )
}

export default TokensProfileList

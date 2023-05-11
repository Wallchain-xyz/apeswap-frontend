import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { useSearchProfiles, useSimpleProfiles } from 'state/lhd/hooks'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'
import { Flex } from 'components/uikit'
import Pagination from './components/Pagination'
import { SimpleTokenProfile } from '../../../../state/lhd/types'
import { orderBy } from 'lodash'

const TokensProfileList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [simpleProfiles, queriedAPI] = useSimpleProfiles()
  const searchProfiles = useSearchProfiles()
  const [sortCol, setSortCol] = useState('#')
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')

  const sort = (profiles: SimpleTokenProfile[]) => {
    if (!profiles) return
    switch (sortCol) {
      case '#':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile.ranking,
          sortType
        )
      case 'Token':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.addressMapping?.tokenSymbol,
          sortType
        )
      case 'Market Cap':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.mcap?.reduce((sum, current) => sum + current.amount, 0),
          sortType
        )
      case '24h Change':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.priceChange24hr,
          sortType
        )
      case 'Extractable':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.extractableLiquidity,
          sortType
        )
      case 'Strength':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.healthScore,
          sortType
        )
      case 'Concentration':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.concentrationScore,
          sortType
        )
      case 'Ownership':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.ownershipScore,
          sortType
        )
      case 'Score':
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile?.totalScore,
          sortType
        )
      default:
        return orderBy(
          profiles,
          (profile: SimpleTokenProfile) => profile.ranking,
          sortType
        )
    }
  }

  return (
    <>
      <Box sx={styles.tableContainer}>
        <TableHeader sortCol={sortCol}
                     onSortColChange={(value: string) => setSortCol(value)}
                     sortType={sortType}
                     onSortTypeChange={(value) => setSortType(value) }
        />
      {searchProfiles.length > 0 ? (
        sort(searchProfiles)?.map((simpleProfile, index) => {
          return <TableRow key={`searchProfile-${index}`}
                           index={index}
                           simpleProfile={simpleProfile} />
        })
      ) : queriedAPI ? (
          <>
            {[...Array(20)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        ) :
        simpleProfiles.length > 0 ? (
          sort(simpleProfiles)?.map((simpleProfile, index) => {
            return <TableRow key={`simpleProfile${index}`}
                             index={index}
                             simpleProfile={simpleProfile} />
          })
        ) : (
          <>
            {[...Array(20)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        )
      }
      </Box>
      <Flex sx={styles.paginationCont}>
        <Pagination currentPage={currentPage}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    totalPages={50}
        />
      </Flex>
    </>
  )
}

export default TokensProfileList
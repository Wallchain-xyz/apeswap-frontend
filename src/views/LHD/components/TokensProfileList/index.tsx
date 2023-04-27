import React from 'react'
import { Box } from 'theme-ui'
import { useSearchProfiles, useSimpleProfiles } from 'state/lhd/hooks'
import TableHeader from './components/TableHeader'
import SkeletonRow from './components/SkeletonRow'
import { styles } from './styles'
import TableRow from './components/TableRow'

const TokensProfileList = () => {
  const [simpleProfiles, queriedAPI] = useSimpleProfiles()
  const searchProfiles = useSearchProfiles()

  return (
    <Box sx={styles.tableContainer}>
      <TableHeader />
      {searchProfiles.length > 0 ? (
        searchProfiles?.map((simpleProfile, index) => {
          return <TableRow key={`searchProfile-${index}`}
                           index={index}
                           simpleProfile={simpleProfile} />
        })
      ) : queriedAPI ? (
          <>
            {[...Array(15)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        ) :
        simpleProfiles.length > 0 ? (
          simpleProfiles.map((simpleProfile, index) => {
            return <TableRow key={`simpleProfile${index}`}
                             index={index}
                             simpleProfile={simpleProfile} />
          })
        ) : (
          <>
            {[...Array(15)].map((i) => {
              return <SkeletonRow key={i} />
            })}
          </>
        )
      }
    </Box>
  )
}

export default TokensProfileList
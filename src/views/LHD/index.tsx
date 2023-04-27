import React from 'react'
import { useLoadInitialProfiles } from 'state/lhd/hooks'
import { Flex } from 'components/uikit'
import ListViewLayout from 'components/ListView/ListViewLayout'
import SimpleProfilesView from './components/SimpleProfilesView'
import { styles } from './styles'
import TitleCards from './components/TitleCards'
import SearchBar from './components/SearchBar'

const LHD = () => {
  useLoadInitialProfiles()
  return (
    <Flex sx={styles.mainLHDContainer}>
      <ListViewLayout>
        <TitleCards />
        <SearchBar />
        <SimpleProfilesView />
      </ListViewLayout>
    </Flex>
  )
}

export default LHD
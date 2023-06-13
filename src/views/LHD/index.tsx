import { useLoadInitialProfiles } from 'state/lhd/hooks'
import { Flex } from 'components/uikit'
import ListViewLayout from 'components/ListView/ListViewLayout'
import TokensProfileList from './components/TokensProfileList'
import { styles } from './styles'
import TitleCards from './components/TitleCards'
import LHDModal from './components/LHDModal'

const LHD = () => {
  useLoadInitialProfiles()
  return (
    <Flex sx={styles.mainLHDContainer}>
      <ListViewLayout>
        <TitleCards />
        <TokensProfileList />
      </ListViewLayout>
      <LHDModal />
    </Flex>
  )
}

export default LHD

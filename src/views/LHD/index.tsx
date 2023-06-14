import { useLoadInitialProfiles } from 'state/lhd/hooks'
import { Flex } from 'components/uikit'
import ListViewLayout from 'components/ListView/ListViewLayout'
import TokensProfileList from './components/TokensProfileList'
import { styles } from './styles'
import TitleCards from './components/TitleCards'
import LHDModal from './components/LHDModal'

import { useSelector } from 'react-redux'
import { AppState } from 'state'

const LHD = () => {
  const { isLhdAuth } = useSelector((state: AppState) => state.lhd)

  useLoadInitialProfiles()
  return (
    <Flex sx={styles.mainLHDContainer}>
      <ListViewLayout>
        <TitleCards />
        <TokensProfileList />
      </ListViewLayout>
      <LHDModal isLhdAuthModalOpen={!isLhdAuth} />
    </Flex>
  )
}

export default LHD

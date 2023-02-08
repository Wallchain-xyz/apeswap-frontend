import { Flex, Svg } from 'components/uikit'
import styles from './styles'

const SwapSwitchButton = ({ onClick }: { onClick?: () => void }) => (
  <Flex sx={styles.swapSwitchContainer}>
    <Flex sx={styles.swapSwitchButton} onClick={onClick}>
      <Svg icon="swapArrows" width="13px" color="primaryBright" />
    </Flex>
  </Flex>
)

export default SwapSwitchButton

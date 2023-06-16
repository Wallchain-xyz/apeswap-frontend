import { Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'
import { SvgProps } from 'components/uikit/Svg/Icons/types'

interface ExemptAssetNoticeProps {
  icon?: SvgProps['icon']
  lineOne?: string
  lineTwo?: string
}

const lineOneDefault =
  'CEX liquidity is not yet integrated into Apeswap’s LHD. For large MCAP tokens cross reference with their CEX liquidity.'
const lineTwoDefault = 'We are working on a way to factor CEX depth in, please stay tuned!'

const ExemptAssetNotice: React.FC<ExemptAssetNoticeProps> = ({
  icon = 'cog',
  lineOne = lineOneDefault,
  lineTwo = lineTwoDefault,
}) => {
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.contentContainer}>
        <Flex sx={styles.visibleIcon}>
          <Svg width={80} color={'primaryBright'} icon={icon} />
        </Flex>
        <Flex sx={styles.invisibleIcon}>
          <Svg width={150} color={'primaryBright'} icon={icon} />
        </Flex>
        <Flex sx={styles.textContainer}>
          <Text sx={styles.text}>{lineOne}</Text>
          <Text sx={styles.text}>{lineTwo}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ExemptAssetNotice

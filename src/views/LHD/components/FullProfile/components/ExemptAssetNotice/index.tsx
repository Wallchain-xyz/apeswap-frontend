import { Flex, Svg, Text } from 'components/uikit'
import { styles } from './styles'
import { SvgProps } from 'components/uikit/Svg/Icons/types'

interface ExemptAssetNoticeProps {
  icon?: SvgProps['icon']
  lineOne?: string
  lineTwo?: string
  phraseCondition?: 'mcap' | 'dex'
}

const BANNER_PHRASES = {
  mcap: {
    lineOne:
      'CEX liquidity is not yet integrated into Apeswap’s LHD. For large MCAP tokens, cross reference with their CEX liquidity.',
    lineTwo: 'We are working on a way to factor CEX depth in, please stay tuned!',
  },
  dex: {
    lineOne: "This asset does not yet have it's primary decentralized exchange integrated on the LHD.",
    lineTwo: "See what's next for the LHD and our progress to integrate more DEXes on ApeSwap Officer our socials!",
  },
}

const ExemptAssetNotice: React.FC<ExemptAssetNoticeProps> = ({ icon = 'info', phraseCondition = 'mcap' }) => {
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.contentContainer}>
        <Flex sx={styles.visibleIcon}>
          <Svg width={50} icon={icon} />
        </Flex>
        <Flex sx={styles.invisibleIcon}>
          <Svg width={80} icon={icon} />
        </Flex>
        <Flex sx={styles.textContainer}>
          <Text sx={styles.text}>{BANNER_PHRASES[phraseCondition].lineOne}</Text>
          <Text sx={styles.text}>
            {BANNER_PHRASES[phraseCondition].lineTwo && BANNER_PHRASES[phraseCondition].lineTwo}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ExemptAssetNotice

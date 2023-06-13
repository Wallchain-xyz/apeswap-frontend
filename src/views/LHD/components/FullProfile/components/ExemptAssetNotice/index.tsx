import { Flex, Svg } from 'components/uikit'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'

const ExemptAssetNotice = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.contentContainer}>
        <Flex sx={styles.visibleIcon}>
          <Svg width={80} color={'primaryBright'} icon="cog" />
        </Flex>
        <Flex sx={styles.invisibleIcon}>
          <Svg width={100} color={'primaryBright'} icon="cog" />
        </Flex>
        {t(
          'This is a very important notice for tokens that are not suitable for the LHD. Right now it shows on all projects above $100M market caps, but we will update this placeholder text when we have more specifics.',
        )}
      </Flex>
    </Flex>
  )
}

export default ExemptAssetNotice

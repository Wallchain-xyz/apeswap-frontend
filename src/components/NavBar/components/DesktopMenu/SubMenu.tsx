import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import { useColorMode } from 'theme-ui'
import { MenuItem } from '../../types'
import styles from '../styles'

const SubMenu = ({ label, menuItems }: { label: string; menuItems: MenuItem[] }) => {
  const [colorMode] = useColorMode()
  const { t } = useTranslation()
  console.log(`/images/nav/${label}_${colorMode}.svg`)
  return (
    <Flex sx={styles.desktopSubMenuContainer}>
      <Flex sx={{ flexDirection: 'column', margin: '20px 0px 0px 20px' }}>
        {menuItems.map(({ label }) => {
          return (
            <Text key={label} weight={700} sx={styles.desktopSubMenuItem}>
              {t(label)}
            </Text>
          )
        })}
      </Flex>
      <Image
        priority
        src={`/images/nav/${label.toLowerCase()}_${colorMode}.svg`}
        alt={label}
        width={230}
        height={305}
        sx={{ position: 'absolute', top: '0px', right: '0px' }}
      />
    </Flex>
  )
}

export default SubMenu
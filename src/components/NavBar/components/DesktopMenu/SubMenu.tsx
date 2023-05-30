import { Flex, Text, Link } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import { useColorMode } from 'theme-ui'
import { MenuItem } from '../../types'
import styles from '../styles'

const SubMenu = ({
  label,
  menuItems,
  clearHoverLabel,
}: {
  label: string
  menuItems: MenuItem[]
  clearHoverLabel: () => void
}) => {
  const [colorMode] = useColorMode()
  const { t } = useTranslation()
  return (
    <Flex sx={styles.desktopSubMenuContainer}>
      <Flex sx={{ flexDirection: 'column', margin: '20px 0px 0px 20px' }}>
        {menuItems.map(({ label, href }) => {
          return (
            <Link
              href={href}
              rel="noreferrer noopener"
              key={href}
              sx={styles.desktopSubMenuItem}
              onClick={clearHoverLabel}
            >
              {t(label)}
            </Link>
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

// Components
import { Flex, Link, Text } from 'components/uikit'
import PopUpMobileMenu from './PopUpMobileMenu'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'
import { useState } from 'react'

// Types
import { NavItem } from '../types'
import { styles } from '../styles'

interface NavOptionProps {
  navItem: NavItem
}

const NavOptionMobile = ({ navItem }: NavOptionProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()
  const { label, items, href } = navItem

  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={styles.desktopNavOptionContainer}
    >
      {items ? (
        <>
          <PopUpMobileMenu isVisible={isHovered} items={items} />
          <Text
            sx={{
              fontSize: '11px',
              fontWeight: '500',
              color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
            }}
          >
            {t(label)}
          </Text>
        </>
      ) : (
        <>
          <Text
            sx={{
              fontSize: '11px',
              fontWeight: '500',
              color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
            }}
          >
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} href={href || '/'}>
              {t(label)}
            </Link>
          </Text>
        </>
      )}
    </Flex>
  )
}

export default NavOptionMobile

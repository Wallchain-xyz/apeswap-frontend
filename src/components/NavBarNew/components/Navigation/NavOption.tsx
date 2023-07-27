// Components
import { Flex, Link, Svg, Text } from 'components/uikit'
import DropdownMenu from './DropdownMenu'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'
import { useState } from 'react'

// Types
import { NavItem } from '../../types'
import { styles } from '../../styles'

interface NavOptionProps {
  navItem: NavItem
}

const NavOption = ({ navItem }: NavOptionProps) => {
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
          <Text
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
            }}
          >
            {t(label)}
          </Text>
          <Svg
            icon="navCaret"
            width="8px"
            color={colorMode === 'dark' && !isHovered ? 'buttonDisabledText' : 'text'}
            direction={isHovered ? 'up' : 'down'}
          />
          <DropdownMenu isVisible={isHovered} items={items} />
        </>
      ) : (
        <>
          <Link style={{ color: 'inherit', textDecoration: 'inherit' }} href={href || '/'}>
            <Text
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
              }}
            >
              {t(label)}
            </Text>
          </Link>
        </>
      )}
    </Flex>
  )
}

export default NavOption

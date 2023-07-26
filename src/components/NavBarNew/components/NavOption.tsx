import { useState } from 'react'

// Components
import { Flex, Link, Svg, Text } from 'components/uikit'
import DropdownMenu from './DropdownMenu'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'

// Types
import { NavItem } from '../types'

interface NavOptionProps {
  navItem: NavItem
}

const NavOption = ({ navItem }: NavOptionProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const { colorMode } = useThemeUI()
  const { t } = useTranslation()

  const { label, items } = navItem
  return (
    <Flex
      onMouseEnter={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        '&:hover': { bg: 'navbar' },
        height: '34px',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '7px',
        borderRadius: '6px',
        position: 'relative',
      }}
    >
      {items ? (
        <>
          <Text
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
            }}
            href={'https://google.com'}
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
          <Link style={{ color: 'inherit', textDecoration: 'inherit' }} href={navItem.href || '/'}>
            <Text
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                color: colorMode === 'dark' && !isHovered && 'buttonDisabledText',
              }}
              href={'https://google.com'}
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

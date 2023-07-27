// Components
import { Flex, Link, Text } from 'components/uikit'
import PopUpMobileMenu from './PopUpMobileMenu'
import Image from 'next/image'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { Box, useThemeUI } from 'theme-ui'
import { useState } from 'react'

// Types
import { NavItem } from '../types'
import { styles } from '../styles'

interface NavOptionProps {
  navItem: NavItem
}

const NavOptionMobile = ({ navItem }: NavOptionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()
  const { label, items, href } = navItem

  return (
    <Flex
      onClick={() => setIsOpen(!isOpen)}
      onMouseLeave={() => setIsOpen(false)}
      sx={{
        ...styles.mobileNavOptionContainer,
      }}
    >
      <Image width={25} height={25} src={`${navItem.icon}-${colorMode}.svg`} alt={`${navItem.label} logo`} />
      {items ? (
        <>
          <PopUpMobileMenu isVisible={isOpen} items={items} />
          <Text
            sx={{
              fontSize: '11px',
              fontWeight: '500',
              color: colorMode === 'dark' && !isOpen && 'buttonDisabledText',
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
              color: colorMode === 'dark' && !isOpen && 'buttonDisabledText',
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

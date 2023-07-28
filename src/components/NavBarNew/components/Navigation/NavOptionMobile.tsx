// Components
import { Flex, Text, Link } from 'components/uikit'
import { styles } from './styles'
import PopUpMobileMenu from './PopUpMobileMenu'
import Image from 'next/image'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { useThemeUI } from 'theme-ui'
import { useState } from 'react'

// Types
import { NavItem } from '../../types'

interface NavOptionProps {
  navItem: NavItem
}

const NavOptionMobile = ({ navItem }: NavOptionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()
  const { label, items, href } = navItem

  return items ? (
    <Flex
      onClick={() => setIsOpen(!isOpen)}
      onMouseLeave={() => setIsOpen(false)}
      sx={{
        ...styles.mobileNavOptionContainer,
        bg: isOpen && 'white1',
      }}
    >
      <Image width={25} height={25} src={`${navItem.icon}-${colorMode}.svg`} alt={`${navItem.label} logo`} />
      <PopUpMobileMenu isVisible={isOpen} items={items} />
      <Text sx={styles.mobileNavOptionText}>{t(label)}</Text>
    </Flex>
  ) : (
    <Flex
      sx={{
        ...styles.mobileNavOptionContainer,
      }}
    >
      <Image width={25} height={25} src={`${navItem.icon}-${colorMode}.svg`} alt={`${navItem.label} logo`} />
      <Text sx={styles.mobileNavOptionText}>
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} href={href || '/'}>
          {t(label)}
        </Link>
      </Text>
    </Flex>
  )
}

export default NavOptionMobile

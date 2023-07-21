import { useState } from 'react'

// Components
import { Flex, Svg, Text } from 'components/uikit'
import DropdownMenu from './DropdownMenu'

// Hooks
import { useTranslation } from 'contexts/Localization'
import { use } from 'react'

interface NavOptionProps {
  navItem: any
}

const NavOption = ({ navItem }: NavOptionProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

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
        gap: '10px',
        borderRadius: '6px',
        position: 'relative',
      }}
    >
      <Text sx={{ fontSize: '16px', fontWeight: '500', color: isHovered ? 'text' : 'buttonDisabledText' }}>
        {t(label)}
      </Text>
      {/* TODO: Add correct caret */}
      <Svg icon="caret" width="8px" direction={isHovered ? 'up' : 'down'} />
      <DropdownMenu isVisible={isHovered} items={items} />
    </Flex>
  )
}

export default NavOption

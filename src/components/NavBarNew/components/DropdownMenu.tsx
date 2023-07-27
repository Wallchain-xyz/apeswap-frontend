import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, useThemeUI } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

// Components
import { NavItemOptions } from '../types'

interface DropdownMenuProps {
  isVisible: boolean
  items: NavItemOptions[]
}

const DropdownMenu = ({ isVisible, items }: DropdownMenuProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const { colorMode } = useThemeUI()

  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        display: isVisible ? 'flex' : 'none',
        position: 'absolute',
        top: '35px',
        left: '0',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
        width: 'max-content',
        px: '30px',
        py: '20px',
        borderRadius: 'normal',
        backdropFilter: 'blur(15px)',
      }}
    >
      <Flex sx={{ gap: '10px', flexDirection: 'column' }}>
        {items.map(({ itemLabel, itemDesc, icon, href }, index) => {
          const isItemHovered = isHovered === index
          return (
            <Link href={href} key={itemLabel} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Flex
                onMouseEnter={() => setIsHovered(index)}
                onFocus={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                sx={{
                  p: '10px',
                  gap: '15px',
                  opacity: colorMode === 'dark' ? '0.7' : '0.85',
                  borderRadius: 'normal',
                  alignItems: 'center',
                  width: 'auto',
                  minWidth: '250px',
                  height: '59px',
                  '&:hover': { bg: 'white3', opacity: '1' },
                }}
              >
                <Box sx={{ height: '25px', width: '25px', position: 'relative' }}>
                  <Image src={`${icon}-${colorMode}.svg`} alt={`${itemLabel} logo`} fill />
                </Box>
                <Flex sx={{ flexDirection: 'column' }}>
                  <Text sx={{ fontSize: '15px', fontWeight: '400', lineHeight: '18px' }}>{t(itemLabel)}</Text>
                  <Text sx={{ fontSize: '12px', fontWeight: '300', lineHeight: '18px', color: 'buttonDisabledText' }}>
                    {t(itemDesc)}
                  </Text>
                </Flex>
                <Flex
                  sx={{
                    visibility: isItemHovered ? 'inherit' : 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    height: '15px',
                    width: '15px',
                    borderRadius: '20px',
                    bg: 'rgba(253, 251, 245, 0.20)',
                    fontSize: '12px',
                    lineHeight: '12px',
                  }}
                >
                  {'>'}
                </Flex>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DropdownMenu

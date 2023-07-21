import { useState } from 'react'
import Image from 'next/image'
import { Box } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

interface DropdownMenuProps {
  isVisible: boolean
  items: any[]
}

const DropdownMenu = ({ isVisible, items }: DropdownMenuProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null)

  console.log({ items })

  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        display: isVisible ? 'flex' : 'none',
        position: 'absolute',
        top: '36px',
        left: '0',
        bg: 'rgba(33, 33, 33, 0.90)',
        px: '30px',
        py: '20px',
        borderRadius: 'normal',
        backdropFilter: 'blur(15px)',
      }}
    >
      <Flex sx={{ gap: '10px', flexDirection: 'column' }}>
        {items.map(({ itemLabel, itemDesc, icon }, index) => {
          const isItemHovered = isHovered === index
          return (
            <Flex
              onMouseEnter={() => setIsHovered(index)}
              onFocus={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              key={itemLabel}
              sx={{
                p: '10px',
                gap: '15px',
                opacity: '0.5',
                borderRadius: 'normal',
                alignItems: 'center',
                width: 'max-content',
                minWidth: '250px',
                height: '59px',
                '&:hover': { bg: 'white1', opacity: '0.9' },
              }}
            >
              <Box sx={{ height: '25px', width: '25px', position: 'relative' }}>
                <Image src={icon} alt={`${itemLabel} logo`} fill />
              </Box>
              <Flex sx={{ flexDirection: 'column' }}>
                <Text sx={{ fontSize: '16px', fontWeight: '500' }}>{t(itemLabel)}</Text>
                <Text sx={{ fontSize: '12px', fontWeight: '500', color: 'buttonDisabledText' }}>{t(itemDesc)}</Text>
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
                  bg: 'white1',
                  fontSize: '12px',
                  lineHeight: '12px',
                }}
              >
                {'>'}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DropdownMenu

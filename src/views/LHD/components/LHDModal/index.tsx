import { useState, useEffect } from 'react'
import Image from 'next/image'

import { Text, Modal, Input } from 'components/uikit'
import { Flex, Box, Button, Link } from 'theme-ui'
import { Svg } from 'components/uikit'

import { icons } from 'components/uikit/Svg/types'

const SOCIAL_LINKS: { icon: icons; href: string }[] = [
  { icon: icons.TWITTER, href: 'https://twitter.com/ape_swap' },
  { icon: icons.TELEGRAM, href: 'https://t.me/ape_swap' },
  { icon: icons.DISCORD, href: 'https://apeswap.click/discord' },
]

const LHDModal = ({ isLhdAuthModalOpen }: { isLhdAuthModalOpen: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(isLhdAuthModalOpen)

  useEffect(() => {
    setIsModalOpen(isLhdAuthModalOpen)
  }, [isLhdAuthModalOpen])

  const handleSubmit = (): void => {
    setIsModalOpen(false)
  }

  return (
    <Modal open={isModalOpen} sx={{ height: ['100%', '100%', '515px'], width: ['100%', '100%', '841px'] }}>
      <Flex
        sx={{
          height: '100%',
          flexDirection: ['column', 'column', 'row-reverse'],
          gap: ['20px', '20px', '20px'],
        }}
      >
        <Box
          sx={{
            height: ['30%', '30%', '100%'],
            width: ['100%', '100%', '60%'],
            borderRadius: '25px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image src="/images/lhd/ape-pool.svg" alt="ape-pool" fill sx={{ objectFit: 'cover' }} />
        </Box>
        <Flex sx={{ width: 'auto', flex: 1, flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <Box sx={{ px: '10px' }}>
            <Flex
              sx={{
                flexDirection: ['row', 'row', 'column'],
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: ['0', '0', '20px'],
              }}
            >
              <Box sx={{ width: ['32px', '32px', '53px'], height: ['46px', '46px', '76px'], position: 'relative' }}>
                {/* TODO: Add liquidity icon to Icon theme */}
                <Image src="/images/lhd/liquidity-white.svg" alt="liquidity-icon" fill />
              </Box>
              <Text
                weight="bold"
                sx={{
                  fontSize: ['21px', '21px', '28px'],
                  textAlign: 'center',
                  lineHeight: ['25px', '25px', '34px'],
                }}
              >
                Liquidity Health Dashboard
              </Text>
            </Flex>
            <Box sx={{ textAlign: 'center', marginTop: ['10px', '10px', '15px'] }}>
              <Text sx={{ fontSize: ['12px', '12px'], lineHeight: '15px' }}>
                ApeSwap’s data visualization tool provides insights into the liquidity levels and sustainability of
                cryptocurrency projects.
              </Text>
            </Box>
          </Box>

          {/* TODO: Create a password input component with validation state as props */}
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
            placeholder="Password"
          />
          <Button sx={{ padding: '5px 10px' }} onClick={handleSubmit}>
            ACCESS BETA
          </Button>
          <Text sx={{ fontStyle: 'italic', fontSize: '12px' }}>Check our socials to find a password</Text>
          <Flex sx={{ gap: '20px' }}>
            {SOCIAL_LINKS.map(({ icon, href }) => {
              return (
                <Link
                  sx={{
                    height: '20px',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  key={icon}
                  as={Link}
                  href={href}
                  target="_blank"
                >
                  <Svg icon={icon} color="text" />
                </Link>
              )
            })}
          </Flex>
          <Flex
            sx={{
              mb: ['0', '0', '10px'],
              mt: 'auto',
              gap: '7px',
              fontSize: '10px',
            }}
          >
            <Svg icon="caret" color="text" height={'6px'} width={'6px'} direction="left" />
            <Link href="/" sx={{ textDecoration: 'underline' }}>
              Back to homepage
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default LHDModal

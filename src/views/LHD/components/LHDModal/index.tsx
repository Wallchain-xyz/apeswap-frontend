import { useState, useEffect } from 'react'

// components
import Image from 'next/image'
import { Text, Modal, Input } from 'components/uikit'
import { Flex, Box, Button, Link, useThemeUI } from 'theme-ui'
import { Svg } from 'components/uikit'
import { icons } from 'components/uikit/Svg/types'

// hooks and actions
import useDebounce from 'hooks/useDebounce'
import { useSetLhdAuth } from 'state/lhd/hooks/useGetIsLhdAuth'
import useGetIsPasswordVerified from 'state/lhd/hooks/useGetIsPasswordVerified'

const SOCIAL_LINKS: { icon: icons; href: string }[] = [
  { icon: icons.TWITTER, href: 'https://twitter.com/ape_swap' },
  { icon: icons.TELEGRAM, href: 'https://t.me/ape_swap' },
  { icon: icons.DISCORD, href: 'https://apeswap.click/discord' },
]

const LHDModal = ({ isLhdAuthModalOpen }: { isLhdAuthModalOpen: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isLhdAuthModalOpen)
  const [password, setPassword] = useState<string>('')

  const { setLhdAuth } = useSetLhdAuth()
  const debouncedPassword = useDebounce(password, 500)
  const { data, isLoading } = useGetIsPasswordVerified({ password: debouncedPassword })
  const { colorMode } = useThemeUI()

  const passwordStatus = !password.length || isLoading ? 'default' : data?.verified ? 'success' : 'error'

  const isDark = colorMode === 'dark'

  const getLiquidityIcon = (): string => {
    switch (passwordStatus) {
      case 'error':
        return isDark ? '/images/lhd/liquidity-red-transparent.svg' : '/images/lhd/liquidity-red.svg'
      case 'success':
        return isDark ? '/images/lhd/liquidity-green-transparent.svg' : '/images/lhd/liquidity-green.svg'
      default:
        return isDark ? '/images/lhd/liquidity-white.svg' : '/images/lhd/liquidity-gray.svg'
    }
  }

  useEffect(() => {
    setIsModalOpen(isLhdAuthModalOpen)
  }, [isLhdAuthModalOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const password = e.target.value
    setPassword(password)
  }

  const handleSubmit = (): void => {
    setLhdAuth(!!data?.verified)
    setIsModalOpen(false)
  }

  return (
    <Modal
      open={isModalOpen}
      backdrop={{ background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(5px)' }}
      sx={{ height: ['100%', '100%', '570px'], width: ['100%', '100%', '881px'], fontWeight: 'light' }}
    >
      <Flex
        sx={{
          height: '100%',
          flexDirection: ['column', 'column', 'row-reverse'],
          gap: ['20px', '20px', '40px'],
        }}
      >
        <Box
          sx={{
            height: ['30%', '30%', '100%'],
            width: ['100%', '100%', '58%'],
            borderRadius: '25px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image src="/images/lhd/ape-pool.png" alt="ape-pool" fill sx={{ objectFit: 'cover' }} />
        </Box>
        <Flex
          sx={{
            width: 'auto',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            pl: ['0px', '0px', '20px'],
          }}
        >
          <Box sx={{ px: '10px' }}>
            <Flex
              sx={{
                flexDirection: ['row', 'row', 'column'],
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: ['0', '0', '20px'],
              }}
            >
              <Box sx={{ width: ['53px', '53px', '72px'], height: ['76px', '76px', '83px'], position: 'relative' }}>
                <Image src={getLiquidityIcon()} alt="liquidity-icon" fill />
              </Box>
              <Text
                weight="bold"
                sx={{
                  fontSize: '28px',
                  textAlign: 'center',
                  lineHeight: '34px',
                }}
              >
                Liquidity Health Dashboard
              </Text>
            </Flex>
            <Box sx={{ textAlign: 'center', marginTop: ['10px', '10px', '15px'] }}>
              <Box sx={{ fontSize: ['14px', '14px', '12px'], lineHeight: ['25px', '22px', '18px'] }}>
                ApeSwap’s data visualization tool provides insights into the liquidity levels and sustainability of
                cryptocurrency projects.
              </Box>
            </Box>
          </Box>
          <Flex sx={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Input
              onChange={handleChange}
              placeholder="Password"
              value={password}
              variant="password"
              status={passwordStatus}
              isLoading={isLoading && !!password}
              sx={{ padding: '5px 10px', fontSize: ['16px', '16px', '12px'], fontWeight: 'normal' }}
            />
            <Button
              sx={{ padding: '5px 10px', height: '31px', marginTop: ['10px', '10px', '0px'] }}
              onClick={handleSubmit}
              disabled={!data?.verified}
            >
              ACCESS BETA
            </Button>
            <Text sx={{ fontStyle: 'italic', fontSize: ['12px', '12px', '10px'], mt: ['10px', '10px', '35px'] }}>
              Check our socials to find a password
            </Text>
            <Flex sx={{ gap: ['10px'], mt: ['10px', '10px', '12px'] }}>
              {SOCIAL_LINKS.map(({ icon, href }) => {
                return (
                  <Link
                    sx={{
                      height: '20px',
                      width: [
                        icon === icons.TELEGRAM ? '40px' : '30px',
                        icon === icons.TELEGRAM ? '40px' : '30px',
                        icon === icons.TELEGRAM ? '35px' : '25px',
                      ],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 0.6,
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
          </Flex>
          <Flex
            sx={{
              mb: '20px',
              mt: 'auto',
              gap: '7px',
              fontSize: '10px',
            }}
          >
            <Svg icon="caret" color="text" height={'4px'} width={'4px'} direction="left" />
            <Link href="/" sx={{ fontSize: ['12px', '12px', '10px'] }}>
              Back to homepage
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default LHDModal

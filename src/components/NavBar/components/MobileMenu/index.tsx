import { useWeb3React } from '@web3-react/core'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex, Svg } from 'components/uikit'
import { NAV_HEIGHT, NAV_MOBILE_DISPLAY } from '../styles'
import SubMenu from './SubMenu'
import { getNavConfig } from 'components/NavBar/config/chains'
import { LangSelectorButton } from 'components/Langauge'
import Moonpay from 'components/Moonpay'
import NetworkSelector from 'components/NetworkSelector'
import { icons } from 'components/uikit/Svg/types'
import Link from 'next/link'

export const SOCIAL_LINKS: { label: icons; href: string }[] = [
  { label: icons.TWITTER, href: 'https://twitter.com/ape_swap' },
  { label: icons.TELEGRAM, href: 'https://t.me/ape_swap' },
  { label: icons.DISCORD, href: 'https://apeswap.click/discord' },
]

const MobileMenu = ({ dropdownFlag }: { dropdownFlag: boolean }) => {
  const { chainId } = useWeb3React()

  return (
    <Flex sx={{ display: NAV_MOBILE_DISPLAY }}>
      <AnimatePresence>
        {dropdownFlag && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{
              position: 'absolute',
              top: NAV_HEIGHT,
              left: 0,
              height: '100px',
              width: '100%',
              overflow: 'hidden',
              background: 'white2',
            }}
          >
            {getNavConfig(chainId).map(({ label, items }) => {
              return <SubMenu label={label} menuItems={items} key={label} />
            })}
            <Flex sx={{ height: '130px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Flex>
                <LangSelectorButton />
                <Moonpay />
                <span sx={{ mr: '10px' }}>
                  <NetworkSelector />
                </span>
              </Flex>
              <Flex sx={{ mt: '15px', justifyContent: 'space-around', width: '200px' }}>
                {SOCIAL_LINKS.map(({ label, href }) => {
                  return (
                    <Flex
                      sx={{
                        height: '40px',
                        width: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        background: 'white3',
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.8,
                        },
                      }}
                      key={label}
                      as={Link}
                      href={href}
                      target="_blank"
                    >
                      <Svg icon={label} color="text" />
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default MobileMenu

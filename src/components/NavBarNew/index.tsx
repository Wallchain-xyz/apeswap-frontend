// Constants
import { getChainNavList } from './constants'
import { styles } from './styles'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useThemeUI } from 'theme-ui'

// Components
import { Flex, Svg, Link } from 'components/uikit'
import NavOption from './components/NavOption'
import NavBarNetworkSelect from './components/NavBarNetworkSelect'
import ConnectWalletButton from 'components/ConnectWallet'
import AccountLoggedIn from './components/AccountLoggedIn'
import NavOptionMobile from './components/NavOptionMobile'
import { NavItem } from './types'

const NavBarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { account, chainId } = useWeb3React()
  const { colorMode } = useThemeUI()

  const NAV_LIST = getChainNavList(chainId as number)

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 30 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <>
      {/* Desktop Nav, which reduces on mobile */}
      <Flex as="nav" sx={{ ...styles.mainNavContainer, bg: isScrolled ? 'white1' : '' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Link href="/" style={{ width: '35px', height: '35px', display: 'flex', marginRight: '30px' }}>
            <Svg icon="logo" />
          </Link>
          <Flex sx={{ gap: '40px', ...styles.hideOnMobile }}>
            {NAV_LIST.map((navItem: NavItem) => {
              return <NavOption key={navItem.label} navItem={navItem} />
            })}
          </Flex>
        </Flex>
        <Flex sx={{ gap: ['2px', '2x', '2px', '2px', '30px'] }}>
          <NavBarNetworkSelect />
          {account ? <AccountLoggedIn /> : <ConnectWalletButton navBarFlag />}
        </Flex>
      </Flex>

      {/* Mobile Bottom Nav */}
      <Flex
        as="nav"
        sx={{
          bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.95)' : 'rgba(249, 244, 231, 0.95)',
          ...styles.bottomMobileNavContainer,
        }}
      >
        {NAV_LIST.map((navItem: NavItem) => {
          return <NavOptionMobile key={navItem.label} navItem={navItem} />
        })}
      </Flex>
    </>
  )
}
export default NavBarNew

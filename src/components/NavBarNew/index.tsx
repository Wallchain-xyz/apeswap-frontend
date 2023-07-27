// Constants
import { BNB_NAV, getChainNavList } from './constants'
import { styles } from './styles'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useThemeUI } from 'theme-ui'

// Components
import { Flex, Svg, Link } from 'components/uikit'
import NavOption from './components/Navigation/NavOption'
import NavBarNetworkSelect from './components/Network/NavBarNetworkSelect'
import ConnectWalletButton from 'components/ConnectWallet'
import AccountLoggedIn from './components/Account/AccountLoggedIn'
import NavOptionMobile from './components/Navigation/NavOptionMobile'
import { NavItem } from './types'

const NavBarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [navList, setNavList] = useState<NavItem[]>(BNB_NAV)
  const { account, chainId } = useWeb3React()
  const { colorMode } = useThemeUI()

  useEffect(() => {
    if (chainId) {
      setNavList(getChainNavList(chainId))
    }
  }, [chainId])

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
            {navList.map((navItem: NavItem) => {
              return <NavOption key={navItem.label} navItem={navItem} />
            })}
          </Flex>
        </Flex>
        <Flex sx={{ gap: ['8px', '8x', '8px', '8px', '30px'] }}>
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
        {navList.map((navItem: NavItem) => {
          return <NavOptionMobile key={navItem.label} navItem={navItem} />
        })}
      </Flex>
    </>
  )
}
export default NavBarNew

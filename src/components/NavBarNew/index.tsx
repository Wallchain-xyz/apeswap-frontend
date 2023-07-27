import { useEffect, useState } from 'react'

// Hooks
import { useWeb3React } from '@web3-react/core'

// Components
import { Flex, Svg, Link } from 'components/uikit'
import NavOption from './components/NavOption'
import NavBarNetworkSelect from './components/NavBarNetworkSelect'
import NetworkSelector from 'components/NetworkSelector'
import ConnectWalletButton from 'components/ConnectWallet'
import AccountLoggedIn from './components/AccountLoggedIn'

// Constants
import { NAV_ITEMS } from './constants'

const NavBarNew = () => {
  const { account } = useWeb3React()
  const [isScrolled, setIsScrolled] = useState(false)

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
    <Flex
      as="nav"
      sx={{
        justifyContent: 'space-between',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        px: '40px',
        py: '12px',
        bg: isScrolled ? 'white1' : '',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Link href="/" style={{ width: '35px', height: '35px', display: 'flex', marginRight: '30px' }}>
          <Svg icon="logo" width="35px" />
        </Link>
        <Flex sx={{ gap: '40px' }}>
          {NAV_ITEMS.map((navItem) => {
            return <NavOption key={navItem.label} navItem={navItem} />
          })}
        </Flex>
      </Flex>
      <Flex sx={{ gap: '30px' }}>
        <NavBarNetworkSelect />
        {account ? <AccountLoggedIn /> : <ConnectWalletButton navBarFlag />}
      </Flex>
    </Flex>
  )
}
export default NavBarNew

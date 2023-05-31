import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { LangSelectorButton } from 'components/Langauge'
import Moonpay from 'components/Moonpay'
import NetworkSelector from 'components/NetworkSelector'
import { Flex, Link, Svg } from 'components/uikit'
import { useCallback, useState } from 'react'
import AccountLoggedInDisplay from './components/AccountLoggedInDisplay'
import DesktopMenu from './components/DesktopMenu'
import MobileMenu from './components/MobileMenu'
import styles, { NAV_DESKTOP_DISPLAY, NAV_MOBILE_DISPLAY } from './components/styles'

const NavBar = () => {
  const { account } = useWeb3React()
  const [dropdownFlag, setDropdownFlag] = useState(false)

  const closeNavBar = useCallback(() => {
    setDropdownFlag(false)
  }, [])

  return (
    <Flex sx={styles.container}>
      <Flex sx={{ maxWidth: '40px', width: '100%' }} as={Link} href="/" onClick={closeNavBar}>
        <Svg icon="logo" width="38px" />
      </Flex>
      <MobileMenu dropdownFlag={dropdownFlag} closeNavBar={closeNavBar} />
      <DesktopMenu />
      <Flex
        sx={{
          alignItems: 'center',
          minWidth: 'fit-content',
        }}
      >
        <Flex
          sx={{
            display: NAV_DESKTOP_DISPLAY,
            alignItems: 'center',
          }}
        >
          <LangSelectorButton />
          <Moonpay />
          <span sx={{ mr: '10px' }}>
            <NetworkSelector />
          </span>
        </Flex>
        {account ? <AccountLoggedInDisplay /> : <ConnectWalletButton navBarFlag />}
        <Flex
          sx={{
            alignItems: 'center',
            display: NAV_MOBILE_DISPLAY,
          }}
        >
          <Flex
            onClick={() => setDropdownFlag((prev) => !prev)}
            sx={{ alignItems: 'center', height: '100%', ml: '20px', mt: '4px', cursor: 'pointer' }}
          >
            {!dropdownFlag ? (
              <Svg icon="hamburger" width={22} />
            ) : (
              <span sx={{ mt: '15px', width: '22px' }}>
                <Svg icon="hamburgerClosed" width={30} />
              </span>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBar

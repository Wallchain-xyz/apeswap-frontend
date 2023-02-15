import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { LangSelectorButton } from 'components/Langauge'
import Moonpay from 'components/Moonpay'
import NetworkSelector from 'components/NetworkSelector'
import { Flex, Svg } from 'components/uikit'
import { useState } from 'react'
import { MenuButton } from 'theme-ui'
import AccountLoggedInDisplay from './components/AccountLoggedInDisplay'
import DesktopMenu from './components/DesktopMenu'
import MobileMenu from './components/MobileMenu'
import styles, { NAV_DESKTOP_DISPLAY, NAV_MOBILE_DISPLAY } from './components/styles'

const NavBar = () => {
  const { account } = useWeb3React()
  const [dropdownFlag, setDropdownFlag] = useState(false)
  return (
    <Flex sx={styles.container}>
      <Flex sx={{ maxWidth: '40px', width: '100%' }}>
        <Svg icon="logo" width="38px" />
      </Flex>
      <MobileMenu dropdownFlag={dropdownFlag} />
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
          <MenuButton onClick={() => setDropdownFlag((prev) => !prev)} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBar

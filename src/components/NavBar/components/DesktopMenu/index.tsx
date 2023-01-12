import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { LangSelectorButton } from 'components/Langauge'
import Moonpay from 'components/Moonpay'
import NetworkSelector from 'components/NetworkSelector'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import AccountLoggedInDisplay from '../AccountLoggedInDisplay'
import SubMenu from './SubMenu'
import { getNavConfig } from '../../config/chains'
import styles, { NAV_DESKTOP_DISPLAY } from '../styles'

const DesktopMenu = () => {
  const { chainId } = useWeb3React()
  const [hoverLabel, setHoverLabel] = useState<string>('')
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        justifyContent: 'flex-start',
        width: '100%',
        display: NAV_DESKTOP_DISPLAY,
      }}
    >
      <Flex sx={{ width: 'fit-content' }}>
        {getNavConfig(chainId).map(({ label, items }) => {
          return (
            <Flex
              key={label}
              onMouseEnter={() => setHoverLabel(label)}
              onFocus={() => setHoverLabel(label)}
              onMouseLeave={() => setHoverLabel('')}
              sx={{
                ...styles.menuItemContainer,
                ':hover': {
                  boxShadow: !items && `0px 2px 0px 0px`,
                  color: 'text',
                },
              }}
            >
              <Text weight={700}>{t(label)}</Text>
              {hoverLabel === label && items && <SubMenu label={label} menuItems={items} />}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DesktopMenu

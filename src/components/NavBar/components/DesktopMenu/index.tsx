import { useWeb3React } from '@web3-react/core'
import { Flex, Text, Link } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCallback, useState } from 'react'
import SubMenu from './SubMenu'
import { getNavConfig } from '../../config/chains'
import styles, { NAV_DESKTOP_DISPLAY } from '../styles'
import { useRouter } from 'next/router'

const DesktopMenu = () => {
  const { chainId } = useWeb3React()
  const [hoverLabel, setHoverLabel] = useState<string>('')
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const extendedDexHref = ['/liquidity']

  const clearHoverLabel = useCallback(() => {
    setHoverLabel('')
  }, [])

  return (
    <Flex
      sx={{
        justifyContent: 'flex-start',
        width: '100%',
        display: NAV_DESKTOP_DISPLAY,
      }}
    >
      <Flex sx={{ width: 'fit-content', ml: '10px' }}>
        {getNavConfig(chainId).map(({ label, items, href }) => {
          return (
            <Flex
              key={label}
              onMouseEnter={() => setHoverLabel(label)}
              onFocus={() => setHoverLabel(label)}
              onMouseLeave={() => setHoverLabel('')}
              sx={{
                ...styles.menuItemContainer,
                boxShadow:
                  items?.find(
                    ({ href }) => href === asPath || (label === 'Exchange' && extendedDexHref.includes(asPath)),
                  ) && '0px 2px 0px',
                color: 'text',
                ':hover': {
                  boxShadow: !items && `0px 2px 0px 0px`,
                  color: 'text',
                },
              }}
            >
              <Text sx={{ textDecoration: 'none' }} weight={700} as={href ? Link : 'p'} href={href}>
                {t(label)}
              </Text>
              {hoverLabel === label && items && (
                <SubMenu label={label} menuItems={items} clearHoverLabel={clearHoverLabel} />
              )}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DesktopMenu

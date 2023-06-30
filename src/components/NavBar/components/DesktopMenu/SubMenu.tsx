import { Flex, Text, Link, Button, Svg } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import { useColorMode } from 'theme-ui'
import { MenuItem } from '../../types'
import styles from '../styles'
import useModal from '../../../../hooks/useModal'
import MoonPayModal from '../../../Moonpay/MoonpayModal'

const SubMenu = ({
  label,
  menuItems,
  clearHoverLabel,
  closeNavBar,
}: {
  label: string
  menuItems: MenuItem[]
  clearHoverLabel: () => void
  closeNavBar: () => void
}) => {
  const [colorMode] = useColorMode()
  const { t } = useTranslation()
  const [onPresentModal] = useModal(<MoonPayModal />)

  return (
    <Flex sx={styles.desktopSubMenuContainer}>
      <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Flex sx={{ flexDirection: 'column', margin: '20px 0px 0px 20px' }}>
          {menuItems.map(({ label, href }) => {
            if (label === 'GNANA') {
              return (
                <Link
                  sx={{
                    ...styles.desktopSubMenuItem,
                  }}
                  key={label}
                  href={href}
                  onClick={closeNavBar}
                >
                  <Text
                    sx={{
                      background: 'gradient',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </Text>
                </Link>
              )
            }
            return (
              <Link
                href={href}
                rel="noreferrer noopener"
                key={href}
                sx={styles.desktopSubMenuItem}
                onClick={clearHoverLabel}
              >
                {t(label)}
              </Link>
            )
          })}
        </Flex>
        {label === 'Exchange' && (
          <Button sx={{ m: '0 0 20px 20px', height: '40px', fontWeight: 600 }} onClick={onPresentModal}>
            {t('Add Funds')}
            <Flex sx={{ ml: '5px' }}>
              <Svg icon="card" width="25px" color="primaryBright" />
            </Flex>
          </Button>
        )}
      </Flex>
      <Image
        priority
        src={`/images/nav/${label.toLowerCase()}_${colorMode}.svg`}
        alt={label}
        width={230}
        height={305}
        sx={{ position: 'absolute', top: '0px', right: '0px' }}
      />
    </Flex>
  )
}

export default SubMenu

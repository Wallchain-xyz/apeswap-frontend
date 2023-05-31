import { MenuItem } from 'components/NavBar/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex, Svg, Text, Link } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import styles from '../styles'

const SubMenu = ({
  label,
  menuItems,
  href,
  closeNavBar,
}: {
  label: string
  menuItems: MenuItem[] | undefined
  href: string | undefined
  closeNavBar: () => void
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation()
  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      <Link
        sx={styles.mobileSubMenuContainer}
        onClick={() => {
          menuItems && setOpened((prev) => !prev)
          !menuItems && closeNavBar()
        }}
        href={href ?? ''}
      >
        <Text weight={600}>{t(label)}</Text>
        {menuItems && <Svg icon="caret" width="8px" direction={opened ? 'up' : 'down'} />}
      </Link>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden' }}
          >
            {menuItems?.map(({ label, href }) => {
              return (
                <Link sx={styles.mobileSubItemContainer} key={label} href={href} onClick={closeNavBar}>
                  {label}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default SubMenu

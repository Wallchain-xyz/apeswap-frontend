import { MenuItem } from 'components/NavBar/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import styles from '../styles'

const SubMenu = ({ label, menuItems }: { label: string; menuItems: MenuItem[] | undefined }) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Flex sx={styles.mobileSubMenuContainer} onClick={() => menuItems && setOpened((prev) => !prev)}>
        <Text weight={600}>{t(label)}</Text>
        {menuItems && <Svg icon="caret" width="8px" direction={opened ? 'up' : 'down'} />}
      </Flex>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden' }}
          >
            {menuItems?.map(({ label }) => {
              return (
                <Flex sx={styles.mobileSubItemContainer} key={label}>
                  <Text>{label}</Text>
                </Flex>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SubMenu

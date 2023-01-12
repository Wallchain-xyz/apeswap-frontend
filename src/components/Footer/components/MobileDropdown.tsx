import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const MobileDropdown = ({
  title,
  items,
  underline = true,
}: {
  title: string
  items: { label: string; href: string }[]
  underline?: boolean
}) => {
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        display: ['flex', 'flex', 'none'],
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '50px',
      }}
      onClick={() => setOpened((prev) => !prev)}
    >
      <Flex
        sx={{
          height: '35px',
          width: '250px',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: underline && '1px solid',
          borderColor: underline && 'primaryBright',
        }}
      >
        <Text color="yellow"> {t(title)} </Text>
        <Svg icon="caret" color="primaryBright" direction={opened ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', width: '250px' }}
          >
            {items?.map(({ label }) => {
              return (
                <Flex sx={{ margin: '10px 0px' }} key={label}>
                  <Text color="primaryBright">{t(label)}</Text>
                </Flex>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default MobileDropdown
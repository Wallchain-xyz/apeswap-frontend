import { NAV_HEIGHT } from 'components/NavBar/components/styles'
import { Button, Flex, IconButton, Svg, Text } from 'components/uikit'
import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'
import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './styles'

import { useRemovePopup } from 'state/application/hooks'
import { Box } from 'theme-ui'
import { AlertProps } from './types'
import Link from 'next/link'

const Toast = ({ popKey, popIndex, variant, text, url, linkText }: AlertProps) => {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeThisPopup()
    }, DEFAULT_TXN_DISMISS_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeThisPopup])
  return (
    <motion.div
      initial={{ right: '-250px' }}
      animate={{ right: '10px' }}
      transition={{ duration: 0.5 }}
      exit={{ right: '-250px' }}
      sx={{ ...styles.alert, top: 70 * popIndex, zIndex: 103 }}
    >
      <Flex>
        <Svg
          icon={variant === 'danger' ? 'close' : variant}
          color={variant === 'error' || variant === 'danger' ? 'error' : 'success'}
          width="30px"
        />
      </Flex>

      <Flex sx={{ ...styles.content }}>
        <Text>{text}</Text>

        {linkText && url && (
          <Link href={url} sx={{ ...styles.link }} color="text" target="_blank">
            <Text mr="5px">{linkText}</Text>
            <Svg icon="external" />
          </Link>
        )}
      </Flex>

      <Flex onClick={removeThisPopup} sx={{ cursor: 'pointer', height: '20px' }}>
        <Text>X</Text>
      </Flex>
    </motion.div>
  )
}

export default Toast

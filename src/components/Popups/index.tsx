import Toast from 'components/Toast'
import { Flex } from 'components/uikit'
import { DEFAULT_TXN_DISMISS_MS } from 'config/constants/misc'
import { useCallback, useEffect } from 'react'
import { useActivePopups, useRemovePopup } from 'state/application/hooks'

const Popups = () => {
  const activePopups = useActivePopups()
  return (
    <>
      {activePopups.map((popup, i) => {
        return (
          <Toast
            key={popup.key}
            popKey={popup.key}
            popIndex={i + 1}
            variant={popup.content.type}
            text={popup.content.text}
            url={popup.content.url}
            linkText={popup.content.urlLabel}
          />
        )
      })}
    </>
  )
}

export default Popups

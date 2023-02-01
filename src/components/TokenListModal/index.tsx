import { Currency } from '@ape.swap/sdk-core'
import { Flex, Modal } from 'components/uikit'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from 'theme-ui'
import { isAddress } from 'utils'
import List from './components/List'

const TokenListModal = ({
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases,
  showCurrencyAmount,
  disableNonToken,
}: {
  onDismiss: () => void
  onCurrencySelect: (currency: Currency) => void
  selectedCurrency?: Currency | null
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])
  return (
    <Modal title="Tokens" minWidth="320px" onDismiss={onDismiss}>
      <Input onChange={handleInput} />
      <Flex sx={{ maxWidth: '100%', width: '400px' }}>
        <List searchQuery={searchQuery} onCurrencySelect={onCurrencySelect} onDismiss={onDismiss}/>
      </Flex>
    </Modal>
  )
}

export default React.memo(TokenListModal)

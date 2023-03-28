import { Currency } from '@ape.swap/sdk-core'
import { Flex, Modal, Svg } from 'components/uikit'
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
    <Modal title="Tokens" minWidth="300px" maxWidth="95%" onDismiss={onDismiss}>
      <Flex sx={{ position: 'relative', margin: '0px 5px', mb: '10px' }}>
        <Input
          onChange={handleInput}
          sx={{
            background: 'white3',
            height: '40px',
            border: '0px',
            ':focus': { outline: 'none' },
          }}
          placeholder="Name or Address"
        />
        <Flex sx={{ position: 'absolute', right: 5, justifyContent: 'center', height: '100%' }}>
          <Svg icon="search" />
        </Flex>
      </Flex>
      <Flex sx={{ maxWidth: '100%', width: '400px', maxHeight: '70vh' }}>
        <List
          searchQuery={searchQuery}
          onCurrencySelect={onCurrencySelect}
          onDismiss={onDismiss}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
          showCurrencyAmount={showCurrencyAmount}
          disableNonToken={disableNonToken}
        />
      </Flex>
    </Modal>
  )
}

export default React.memo(TokenListModal)

import { Currency, SupportedChainId } from '@ape.swap/sdk-core'
import { Flex, Modal, Svg } from 'components/uikit'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from 'theme-ui'
import { isAddress } from 'utils'
import List from './components/List'

const ChainTokenSelector = ({
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
}: {
  onDismiss?: () => void
  onCurrencySelect: (currency: Currency, chain: SupportedChainId) => void
  selectedCurrency?: Currency | null
}) => {
  //this should be able to handle chain switching locally, though if we want the state to persist
  //we will have to move this to redux. By persist I mean that if a user selects a chain, closes the modal
  //and then open it again polygon should still be selected. If we want that we will have to create a new variable
  //in the swap state, one for input and one for output
  const [selectedChain, setSelectedChain] = useState<SupportedChainId>(SupportedChainId.BSC)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])
  return (
    <Modal title="Tokens" zIndex={110} sx={{ height: '485px' }}>
      <Flex sx={{ position: 'relative', my: '10px' }}>
        <>Add new component here to select chains, pass selectedChain and SetSelectedChain</>
        <Input
          onChange={handleInput}
          sx={{
            background: 'white3',
            height: '45px',
            border: 'none',
            pl: '10px',
            borderRadius: '10px',
            ':focus': { outline: 'none' },
          }}
          placeholder="Name or Address"
        />
        <Flex sx={{ position: 'absolute', right: 5, justifyContent: 'center', height: '100%' }}>
          <Svg icon="search" />
        </Flex>
      </Flex>
      <Flex sx={{ maxWidth: '100%', width: '450px' }}>
        <List
          searchQuery={searchQuery}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={selectedCurrency}
          onDismiss={onDismiss}
          selectedChain={selectedChain}
        />
      </Flex>
    </Modal>
  )
}

export default ChainTokenSelector

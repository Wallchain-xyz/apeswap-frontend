import { Currency } from '@ape.swap/sdk-core'
import { Flex, Modal, Svg, Text } from 'components/uikit'
import useIsMobile from 'hooks/useIsMobile'
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
  const isMobile = useIsMobile()
  return (
    <Modal
      title="Tokens"
      minWidth="300px"
      maxWidth="95%"
      onDismiss={onDismiss}
      paddingWidth={isMobile ? '10px' : '20px'}
    >
      <Flex sx={{ position: 'relative', margin: '15px 5px', mb: '20px' }}>
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
      <Flex sx={{ maxWidth: '100%', width: '450px', maxHeight: '65vh' }}>
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
      <Flex
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(0px, 10px)',
          cursor: 'pointer',
        }}
        onClick={onDismiss}
      >
        <Text sx={{ textDecoration: 'underline' }}> Cancel </Text>
      </Flex>
    </Modal>
  )
}

export default React.memo(TokenListModal)

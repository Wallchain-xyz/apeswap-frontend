import { Flex, Modal } from 'components/uikit'
import { ChangeEvent, useCallback, useState } from 'react'
import { Input } from 'theme-ui'
import { isAddress } from 'utils'
import List from './List'

const ListModal = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])
  return (
    <Modal title="Tokens" minWidth="320px">
      <Input onChange={handleInput} />
      <Flex sx={{ maxWidth: '100%', width: '400px' }}>
        <List searchQuery={searchQuery} />
      </Flex>
    </Modal>
  )
}

export default ListModal

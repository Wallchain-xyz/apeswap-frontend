import { Flex } from 'components/uikit'
import Add from './Add'
import { AddInterface } from './types'

interface ActionsInterface extends AddInterface {}

const Actions = (props: ActionsInterface) => {
  return (
    <Flex sx={{ mt: '20px' }}>
      <Add {...props} />
    </Flex>
  )
}

export default Actions

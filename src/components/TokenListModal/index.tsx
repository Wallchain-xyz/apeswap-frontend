import { Button } from 'components/uikit'
import useModal from 'hooks/useModal'
import ListModal from './components/ListModal'

const TokenListModal = () => {
  const [onPresentTokenListModal] = useModal(<ListModal />, true, true, 'TokenListModal')

  return <Button onClick={onPresentTokenListModal}> Press Me </Button>
}

export default TokenListModal

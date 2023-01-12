import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import AccountModal from './AccountModal'

const AccountLoggedInDisplay = () => {
  const { account } = useWeb3React()
  const [onPresentAccountModal] = useModal(<AccountModal onDismiss={() => null} />)
  return account ? (
    <Flex>
      <Flex variant="flex.navContainer" onClick={onPresentAccountModal}>
        <Text size="14px">
          {account.slice(0, 4).toUpperCase()}...
          {account.slice(account.length - 4, account.length).toUpperCase()}
        </Text>
        <Flex sx={{ transform: 'translate(10px, 1px)' }}>
          <Svg icon="accountMonkey" width="28px" />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default AccountLoggedInDisplay

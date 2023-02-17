import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import { useMemo } from 'react'
import { useAllTransactions, useTransaction } from 'state/transactions/hooks'
import { Spinner } from 'theme-ui'
import AccountModal from './AccountModal'

const AccountLoggedInDisplay = () => {
  const { account } = useWeb3React()
  const [onPresentAccountModal] = useModal(<AccountModal onDismiss={() => null} />)
  const transactions = useAllTransactions()
  const pendingTransactions = useMemo(() => Object.values(transactions).filter((tx) => !tx.receipt), [transactions])
  console.log(transactions)
  return account ? (
    <Flex>
      <Flex variant="flex.navContainer" onClick={onPresentAccountModal}>
        {pendingTransactions?.length > 0 ? (
          <>
            <Flex sx={{ alignItems: 'center', mr: '10px' }}>
              <Text mr="5px"> {pendingTransactions.length} </Text>
              <Text> Pending </Text>
            </Flex>
            <Spinner size={20} />
          </>
        ) : (
          <>
            <Text size="14px">
              {account.slice(0, 4).toUpperCase()}...
              {account.slice(account.length - 4, account.length).toUpperCase()}
            </Text>
            <Flex sx={{ transform: 'translate(10px, 1px)' }}>
              <Svg icon="accountMonkey" width="28px" />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default AccountLoggedInDisplay

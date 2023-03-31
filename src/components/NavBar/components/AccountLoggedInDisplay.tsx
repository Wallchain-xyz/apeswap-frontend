import { useWeb3React } from '@web3-react/core'
import { Flex, Svg, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import Image from 'next/image'
import { useMemo } from 'react'
import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'
import { useAllTransactions, useTransaction } from 'state/transactions/hooks'
import { Spinner } from 'theme-ui'
import AccountModal from './AccountModal'

const AccountLoggedInDisplay = () => {
  const { account } = useWeb3React()
  const [onPresentAccountModal] = useModal(<AccountModal onDismiss={() => null} />)
  const transactions = useAllTransactions()
  const pendingTransactions = useMemo(() => Object.values(transactions).filter((tx) => !tx.receipt), [transactions])
  const profileImage = useAppSelector((state: AppState) => state.application.profileImage)
  console.log(profileImage)
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
              {profileImage ? (
                <Image src={profileImage} alt="" width={28} height={28} sx={{ borderRadius: '15px' }} />
              ) : (
                <Svg icon="accountMonkey" width="28px" />
              )}
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

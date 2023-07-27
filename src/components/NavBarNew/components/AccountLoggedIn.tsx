import { useMemo, useState } from 'react'

// Hooks
import { useWeb3React } from '@web3-react/core'

// Components
import Image from 'next/image'
import { Spinner } from 'theme-ui'
import { Flex, Svg, Text } from 'components/uikit'
import AccountDetailsDropdown from './AccountDetailsDropdown'

// State
import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'
import { useAllTransactions } from 'state/transactions/hooks'

const AccountLoggedIn = () => {
  const { account } = useWeb3React()
  const transactions = useAllTransactions()
  const pendingTransactions = useMemo(() => Object.values(transactions).filter((tx) => !tx.receipt), [transactions])
  const profileImage = useAppSelector((state: AppState) => state.application.profileImage)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return account ? (
    <Flex>
      <Flex
        sx={{
          cursor: 'pointer',
          '&:hover': { bg: 'navbar' },
          height: '34px',
          padding: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '7px',
          borderRadius: '6px',
          position: 'relative',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {pendingTransactions?.length > 0 ? (
          <>
            <Flex sx={{ alignItems: 'center', mr: '10px' }}>
              <Text sx={{ fontWeight: '400' }} mr="5px">
                {' '}
                {pendingTransactions.length}{' '}
              </Text>
              <Text sx={{ fontWeight: '400' }}> tx pending </Text>
            </Flex>
            <Spinner size={20} />
          </>
        ) : (
          <>
            {profileImage ? (
              <Image src={profileImage} alt="" width={24} height={24} sx={{ borderRadius: '15px' }} />
            ) : (
              <Svg icon="settings" width="18px" />
            )}
            <Text sx={{ fontWeight: '400' }} size="14px">
              {account.slice(0, 4)}...
              {account.slice(account.length - 4, account.length)}
            </Text>
          </>
        )}
        <AccountDetailsDropdown isVisible={isHovered} />
      </Flex>
    </Flex>
  ) : (
    <></>
  )
}

export default AccountLoggedIn

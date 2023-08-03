import axios from 'axios'

// Components
import styles from './styles'
import { Flex, Modal, Spinner, Svg, Text } from 'components/uikit'
import TransactionContainer from './TransactionContainer'

// Hooks
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Types, Constants, Utils
import { LiFiTransaction } from './types'

const TransactionHistory = ({ onDismiss }: { onDismiss?: () => void }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pendingTransactions, setPendingTransactions] = useState<LiFiTransaction[]>([])

  const { account } = useWeb3React()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://li.quest/v1/analytics/wallets/${account}?integrator=apeswap&fromTimestamp=${Math.floor(
          Date.now() / 1000 - 86400 * 30,
        )}`,
      )
      console.log(response?.data)
      const data = await response?.data?.transactions
      setPendingTransactions(data)
      setIsLoading(false)
    }
    fetchData()
  }, [account])

  // Sort by pending first, then by timestamp
  const transactions = pendingTransactions.sort((a, b) =>
    a.status === 'PENDING' ? -2 : a.sending.timestamp > b.sending.timestamp ? -1 : 1,
  )

  return (
    <Modal sx={{ height: '540px', width: '380px' }}>
      {/* Header & Header Icons */}
      <Flex sx={{ justifyContent: 'space-between', mb: '20px' }}>
        <Flex sx={{ cursor: 'pointer' }} onClick={onDismiss}>
          <Svg width="10px" icon="arrow" direction="left" />
        </Flex>
        <Text sx={{ fontSize: '16px', fontWeight: '300' }}>Transaction History</Text>
      </Flex>

      {/* Transaction History */}
      {isLoading ? (
        <Flex sx={styles.emptyHistoryContainer}>
          <Spinner size={200} />
          <Text sx={{ fontSize: '20px' }}>Loading Transactions...</Text>
        </Flex>
      ) : transactions.length > 0 ? (
        <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
          {transactions.map((transaction: LiFiTransaction) => {
            return <TransactionContainer key={transaction.transactionId} transaction={transaction} />
          })}
        </Flex>
      ) : (
        <Flex sx={styles.emptyHistoryContainer}>
          <Svg width="220px" height="50px" icon="placeholderMonkey" />
          <Text sx={{ fontSize: '20px' }}>No Recent Transactions</Text>
          <Text sx={{ fontSize: '14px', fontWeight: '300', textAlign: 'center' }}>
            Transaction history only shows transactions over the previous 30 days. Please check a block explorer
            directly for older transactions.
          </Text>
        </Flex>
      )}
    </Modal>
  )
}
export default TransactionHistory

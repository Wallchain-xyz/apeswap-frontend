// Components
import styles from './styles'
import { Flex, Modal, Svg, Text } from 'components/uikit'
import TransactionContainer from './TransactionContainer'

// Types, Constants, Utils
import { DUMMY_ROUTES, DUMMY_ROUTES_EMPTY } from './data'

const TransactionHistory = ({ onDismiss }: { onDismiss?: () => void }) => {
  return (
    <Modal sx={{ height: '540px', width: '380px' }}>
      {/* Header & Header Icons */}
      <Flex sx={{ justifyContent: 'space-between', mb: '20px' }}>
        <Flex sx={{ cursor: 'pointer' }} onClick={onDismiss}>
          <Svg width="10px" icon="arrow" direction="left" />
        </Flex>
        <Text sx={{ fontSize: '16px', fontWeight: '300' }}>Transaction History</Text>
        <Flex sx={{ cursor: 'pointer' }} onClick={() => alert('Implement logic to clear history')}>
          <Svg width="15px" icon="trash" />
        </Flex>
      </Flex>

      {/* Transaction History */}
      {DUMMY_ROUTES.length > 0 ? (
        <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
          {DUMMY_ROUTES.map((route) => {
            return <TransactionContainer key={route.txHash} route={route} />
          })}
        </Flex>
      ) : (
        <Flex sx={styles.emptyHistoryContainer}>
          <Svg width="220px" height="50px" icon="placeholderMonkey" />
          <Text sx={{ fontSize: '20px' }}>No Recent Transactions</Text>
          <Text sx={{ fontSize: '14px', fontWeight: '300', textAlign: 'center' }}>
            Transaction history is only stored locally and will be deleted if you clear your browser data.
          </Text>
        </Flex>
      )}
    </Modal>
  )
}
export default TransactionHistory

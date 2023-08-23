import Buy from '../Bonds/actions/Buy'
import Flex from '../../components/uikit/Flex'
import { Bills } from '../Bonds/types'
import { useBills } from '../../state/bills/hooks'
import { useWeb3React } from '@web3-react/core'
import state from '../../state'
import { APESWAP } from '../../config/constants/lists'
import { SupportedChainId } from '@ape.swap/sdk-core'

const BondWidget = ({
  capturedBillAddress,
  capturedChain,
}: {
  capturedBillAddress: string
  capturedChain: SupportedChainId
}) => {
  const { account } = useWeb3React()
  const bills: Bills[] | undefined = useBills()
  const bill: Bills | undefined = bills?.find(
    (billToSearch) => billToSearch?.contractAddress?.[capturedChain] === capturedBillAddress,
  )
  const isApeListInitialized = typeof state?.getState()?.lists?.byUrl?.[APESWAP]?.current?.tokens?.length === 'number'

  return (
    <Flex
      sx={{
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex sx={{ maxWidth: '500px', flexDirection: 'column' }}>
        {account}
        {bill && isApeListInitialized && <Buy bill={bill} />}
      </Flex>
    </Flex>
  )
}

export default BondWidget

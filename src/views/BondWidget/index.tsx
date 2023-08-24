import Buy from '../Bonds/actions/Buy'
import Flex from '../../components/uikit/Flex'
import { Bills } from '../Bonds/types'
import { useBills } from '../../state/bills/hooks'
import { useWeb3React } from '@web3-react/core'
import state from '../../state'
import { APESWAP } from '../../config/constants/lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import AccountLoggedIn from '../../components/NavBarNew/components/Account/AccountLoggedIn'
import { BillReferenceData, usePostBillReference } from 'state/bills/usePostBillReference'

const BondWidget = ({
  capturedBillAddress,
  capturedChain,
}: {
  capturedBillAddress: string
  capturedChain: SupportedChainId
}) => {
  const { account, chainId } = useWeb3React()
  const bills: Bills[] | undefined = useBills()
  const bill: Bills | undefined = bills?.find(
    (billToSearch) => billToSearch?.contractAddress?.[capturedChain] === capturedBillAddress,
  )
  const isApeListInitialized = typeof state?.getState()?.lists?.byUrl?.[APESWAP]?.current?.tokens?.length === 'number'

  const { mutate: postBillReference, isLoading, isError } = usePostBillReference()
  // TODO: Replace this test code with params from the widget config
  // This can be tested using the following code:
  // <button onClick={handleBuyReference} disabled={isLoading}>Test Post Data</button> 
  const billsReference: Partial<BillReferenceData> = {
    chainId,
    transactionHash: '1234',
    referenceId: 'TEST-REF'
  }
  const handleBuyReference = () => {
    postBillReference(billsReference);
  }

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
        <Flex sx={{ width: '100%', justifyContent: 'flex-end', mb: '10px', height: '34px' }}>
          {account && <AccountLoggedIn />}
        </Flex>
        {bill && isApeListInitialized && <Buy bill={bill} />}
      </Flex>
    </Flex>
  )
}

export default BondWidget

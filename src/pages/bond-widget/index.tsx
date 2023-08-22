import PageContainer from 'components/PageContainer'
import BondWidget from '../../views/BondWidget'
import { usePollSingleBill } from '../../state/bills/hooks'

const BondsPage = () => {
  const capturedBillAddress = '0x8303dd7222b5c162C85351292b0ce26C221c4acD'
  const capturedChain = 56
  usePollSingleBill(capturedChain, capturedBillAddress)
  return (
    <PageContainer variant="listView">
      <BondWidget capturedBillAddress={capturedBillAddress} capturedChain={capturedChain} />
    </PageContainer>
  )
}

export default BondsPage

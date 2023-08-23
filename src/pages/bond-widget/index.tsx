import BondWidget from '../../views/BondWidget'
import { usePollSingleBill } from '../../state/bills/hooks'

const BondsPage = () => {
  const capturedBillAddress = '0x8303dd7222b5c162C85351292b0ce26C221c4acD'
  const capturedChain = 56
  usePollSingleBill(capturedChain, capturedBillAddress)
  return <BondWidget capturedBillAddress={capturedBillAddress} capturedChain={capturedChain} />
}

export default BondsPage

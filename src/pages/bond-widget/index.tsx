import BondWidget from '../../views/BondWidget'
import { usePollSingleBill } from '../../state/bills/hooks'
import useConfigParser from '../../hooks/useConfigParser'

const BondsPage = () => {
  const [config, error] = useConfigParser()
  //const capturedBillAddress = '0x8303dd7222b5c162C85351292b0ce26C221c4acD'
  //const capturedChain = 56
  console.log(config)
  const capturedBillAddress = config?.billAddress
  const capturedChain = config?.chain
  usePollSingleBill(capturedChain, capturedBillAddress)
  return <BondWidget capturedBillAddress={capturedBillAddress} capturedChain={capturedChain} error={error} />
}

export default BondsPage

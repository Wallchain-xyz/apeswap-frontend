import BondWidget from '../../views/BondWidget'
import { usePollSingleBill } from '../../state/bills/hooks'
import useConfigParser from '../../hooks/useConfigParser'

const BondsPage = () => {
  const [config, error] = useConfigParser()
  const bondAddress = config?.bondAddress
  const chain = config?.chain
  usePollSingleBill(chain, bondAddress)
  return <BondWidget bondAddress={bondAddress} chain={chain} error={error} />
}

export default BondsPage

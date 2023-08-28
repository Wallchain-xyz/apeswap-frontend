import BondWidget from '../../views/BondWidget'
import { usePollSingleBill } from '../../state/bills/hooks'
import useConfigParser from '../../hooks/useConfigParser'
import { getSupportedChainId } from '../../utils/validateChainId'

const BondsPage = () => {
  const [config, error] = useConfigParser()
  const bondAddress = config?.bondAddress
  const chain: string | undefined = config?.chain
  const chainId = getSupportedChainId(chain)
  usePollSingleBill(chainId, bondAddress)
  return <BondWidget bondAddress={bondAddress} chain={chainId} error={error} />
}

export default BondsPage

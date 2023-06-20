import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useBills } from 'state/bills/hooks'

export const useBillLPType = (billAddress: string) => {
  const { chainId } = useWeb3React()
  const bills = useBills()
  const selectedBill = bills?.find(
    (bill) => bill?.contractAddress[chainId as SupportedChainId]?.toLowerCase() === billAddress?.toLowerCase(),
  )
  return selectedBill?.lpType
}

export const useBillLPTypes = (billAddresses: string[]) => {
  const { chainId } = useWeb3React()
  const bills = useBills()
  return billAddresses.map((billAddress) => {
    const selectedBill = bills?.find(
      (bill) => bill?.contractAddress[chainId as SupportedChainId]?.toLowerCase() === billAddress?.toLowerCase(),
    )
    return selectedBill?.lpType
  })
}

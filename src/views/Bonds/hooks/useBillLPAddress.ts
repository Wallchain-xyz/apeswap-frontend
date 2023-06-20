import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useBills } from 'state/bills/hooks'

export const useBillLPAddress = (billAddress: string) => {
  const { chainId } = useWeb3React()
  const bills = useBills()
  const selectedBill = bills?.find(
    (bill) => bill?.contractAddress[chainId as SupportedChainId]?.toLowerCase() === billAddress?.toLowerCase(),
  )
  return selectedBill?.lpToken?.address[chainId as SupportedChainId]
}

export const useBillLPAddresses = (billAddresses: string[]) => {
  const { chainId } = useWeb3React()
  const bills = useBills()
  return billAddresses.map((billAddress) => {
    const selectedBill = bills?.find(
      (bill) => bill?.contractAddress[chainId as SupportedChainId]?.toLowerCase() === billAddress?.toLowerCase(),
    )
    return selectedBill?.lpToken?.address[chainId as SupportedChainId]
  })
}

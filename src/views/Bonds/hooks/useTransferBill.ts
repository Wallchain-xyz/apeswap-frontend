import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondNftContract } from 'hooks/useContract'

// Transfer a bill
const useTransferBill = (billNftAddress: string, billId: string, toAddress: string) => {
  const { account, chainId } = useWeb3React()
  const bondNftContract = useBondNftContract(billNftAddress)
  const billType = useBillType(billNftAddress)
  // TODO: Add handlers
  const handleTransfer = useCallback(async () => {
    try {
      const tx = await bondNftContract['safeTransferFrom(address,address,uint256)'](account ?? '', toAddress, billId)
      track({
        event: billType ?? '',
        chain: chainId,
        data: {
          cat: 'transfer',
          id: billId,
          from: account,
          to: toAddress,
        },
      })
      return tx
    } catch (e) {
      console.error(e)
      return null
    }
  }, [billId, toAddress, chainId, bondNftContract, account, billType])
  return { onTransfer: handleTransfer }
}

export default useTransferBill

import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondContract } from 'hooks/useContract'

// Claim a Bill
const useClaimBill = (billAddress: string, billIds: string[]) => {
  const { chainId } = useWeb3React()
  const bondContract = useBondContract(billAddress)
  const billType = useBillType(billAddress)
  const handleClaimBill = useCallback(async () => {
    const tx = await bondContract.batchRedeem(billIds)
    track({
      event: billType ?? '',
      chain: chainId,
      data: {
        cat: 'claim',
        address: bondContract.address,
        id: billIds,
      },
    })
    return tx
  }, [bondContract, billIds, chainId, billType])

  return { onClaimBill: handleClaimBill, billType }
}

export default useClaimBill

import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useTokenContract } from 'hooks/useContract'
import { useApproveCallback } from 'hooks/useApproveCallback'

// Approve a bill
const useApproveBill = (tokenAddress: string, billAddress: string) => {
  const tokenContract = useTokenContract(tokenAddress)
  const approve = useApproveCallback()
  const handleApprove = useCallback(async () => {
    const tx =  await tokenContract?.approve(billAddress, ethers.constants.MaxUint256).then((trx) => trx.wait())
    return tx
  }, [billAddress, tokenContract])
  return { onApprove: handleApprove }
}

export default useApproveBill

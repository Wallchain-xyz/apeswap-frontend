import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

// Claim a Bill
const useClaimBill = (billAddress: string, billIds: string[]) => {
  const { chainId } = useWeb3React()
  const bondContract = useBondContract(billAddress)
  const billType = useBillType(billAddress)
  const addTransaction = useTransactionAdder()
  const handleClaimBill = useCallback(async () => {
    const tx = await bondContract.batchRedeem(billIds)
    addTransaction(tx, { type: TransactionType.CLAIM_BILL })
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
  }, [bondContract, billIds, addTransaction, chainId, billType])

  return { onClaimBill: handleClaimBill, billType }
}

export default useClaimBill

import { useWeb3React } from '@web3-react/core'
import {
  useDualFarmContract,
  useJungleFarmContract,
  useMasterChefContract,
  useMasterChefV2Contract,
} from 'hooks/useContract'
import { useCallback } from 'react'
import { FarmTypes } from 'state/farms/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'

const useHarvest = (farmType: FarmTypes, pid: number, contractAddress?: string) => {
  const { account } = useWeb3React()
  const masterChefV1Contract = useMasterChefContract()
  const masterChefV2Contract = useMasterChefV2Contract()
  const jungleFarmContract = useJungleFarmContract(contractAddress ?? '')
  const miniApeContract = useDualFarmContract()
  const addTransaction = useTransactionAdder()

  const callReturn = useCallback(async () => {
    if (farmType === FarmTypes.MASTER_CHEF_V1) {
      return masterChefV1Contract?.deposit(pid, '0').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        return trx.wait()
      })
    }
    if (farmType === FarmTypes.MASTER_CHEF_V2) {
      return masterChefV2Contract?.deposit(pid, '0').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        return trx.wait()
      })
    }
    if (farmType === FarmTypes.JUNLGE_FARM) {
      return jungleFarmContract?.deposit('0').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        return trx.wait()
      })
    }
    if (farmType === FarmTypes.DUAL_FARM) {
      return miniApeContract?.harvest(pid, account ?? '').then((trx) => {
        addTransaction(trx, { type: TransactionType.HARVEST })
        return trx.wait()
      })
    }
  }, [
    pid,
    farmType,
    account,
    masterChefV1Contract,
    masterChefV2Contract,
    addTransaction,
    jungleFarmContract,
    miniApeContract,
  ])

  const handleHarvest = useCallback(async () => {
    const txHash = await callReturn()
    return txHash
  }, [callReturn])

  return handleHarvest
}

export default useHarvest

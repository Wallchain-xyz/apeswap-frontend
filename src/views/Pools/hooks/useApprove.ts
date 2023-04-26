import { useWeb3React } from '@web3-react/core'
import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import { useSousChef } from 'hooks/useContract'
import { useCallback } from 'react'
import track from 'utils/track'

// Approve a Pool
export const useSousApprove = (lpContract: Erc20 | null, sousId: number) => {
  const { chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    const tx = await lpContract?.approve(sousChefContract.address, ethers.constants.MaxUint256).then((trx) => {
      return trx.wait()
    })
    track({
      event: 'pool',
      chain: chainId,
      data: {
        token: tx?.to,
        id: sousId,
        cat: 'enable',
      },
    })
    return tx
  }, [lpContract, sousChefContract, sousId, chainId])

  return { onApprove: handleApprove }
}

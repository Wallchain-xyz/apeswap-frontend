import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import contractAddresses from 'config/constants/contractAddresses'
import { useMemo } from 'react'
import { getContract } from 'utils'

// ABIS

import multicallV3Abi from 'config/abi/multicallv3.json'
import ERC20_ABI from 'config/abi/erc20.json'
import ERC20_BYTES32_ABI from 'config/abi/erc20_bytes32.json'
import { Multicallv3 } from 'config/abi/types'
import { Erc20 } from 'config/abi/types/Erc20'
import { Erc20_bytes32 } from 'config/abi/types/Erc20_bytes32'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useInterfaceMulticall() {
  return useContract<Multicallv3>(contractAddresses.mulltiCallV3, multicallV3Abi, false)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20_bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

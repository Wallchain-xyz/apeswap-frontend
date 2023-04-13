import { BillVersion, bills } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Interface } from 'ethers/lib/utils'
import { useMultipleContractSingleData } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import bondAbi from 'config/abi/bond.json'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { getFirstNonZeroDigits } from 'utils/roundNumber'
import { Erc20Interface } from 'config/abi/types/Erc20'
import ERC20ABI from 'config/abi/erc20.json'
import { BondInterface } from 'config/abi/types/Bond'

const BOND_INTERFACE = new Interface(bondAbi) as BondInterface
const ERC20Interface = new Interface(ERC20ABI) as Erc20Interface

const useUserBonds = () => {
  const { chainId, account } = useWeb3React()
  const filteredBonds = useMemo(
    () => bills.filter((bond) => bond.contractAddress[chainId as SupportedChainId]),
    [chainId],
  )
  const bondAddresses = useMemo(
    () => filteredBonds.map((bond) => bond.contractAddress[chainId as SupportedChainId]),
    [chainId, filteredBonds],
  )

  const tokenAddresses = useMemo(
    () => filteredBonds.map((bond) => bond.lpToken.address[chainId as SupportedChainId]),
    [chainId, filteredBonds],
  )

  const balanceOfResult = useMultipleContractSingleData(tokenAddresses, ERC20Interface, 'balanceOf', [account])
  const getBillIdsResults = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'getBillIds', [account])

  console.log(getBillIdsResults)

  return null
}

export default useUserBonds

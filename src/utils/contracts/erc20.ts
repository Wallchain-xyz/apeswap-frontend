import { Web3Provider } from '@ethersproject/providers'
import ERC20_ABI from 'config/abi/erc20.json'
import { Erc20 } from 'config/abi/types/Erc20'
import { getContract } from 'utils'


export function getErc20Contract(address: string, provider: Web3Provider, account?: string) {
    return getContract(address, ERC20_ABI, provider, account) as Erc20
}

export async function getErc20Approval(erc20: Erc20, owner: string, spender: string) {
    return await erc20.allowance(owner, spender)
}
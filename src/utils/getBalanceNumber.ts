import { BigNumber } from 'ethers'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return balance.div(BigNumber.from(10).pow(decimals)).toString()
}

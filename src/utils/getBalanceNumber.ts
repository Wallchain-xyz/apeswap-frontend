import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

export const getBalanceNumber = (balance: BigNumber, decimals = 18): number => {
  const displayBalance = formatUnits(balance, decimals)
  return parseFloat(displayBalance)
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18): string => {
  const displayBalance = formatUnits(balance, decimals)
  return displayBalance
}

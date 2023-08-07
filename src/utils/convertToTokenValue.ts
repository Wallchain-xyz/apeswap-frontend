import { ethers } from 'ethers'

const convertToTokenValue = (numberString: string, decimals: number): ethers.BigNumber => {
  const numericValue = parseFloat(numberString)
  const tokenValue = ethers.utils.parseUnits(numericValue.toString(), decimals)
  return tokenValue
}

export default convertToTokenValue

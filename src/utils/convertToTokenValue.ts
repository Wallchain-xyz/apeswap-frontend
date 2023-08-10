import { ethers } from 'ethers'

const convertToTokenValue = (numberString: string, decimals: number): ethers.BigNumber => {
  if (isNaN(parseFloat(numberString))) {
    console.error('Error: numberString to parse is not a number')
    return ethers.utils.parseUnits('0', decimals)
  }

  const tokenValue = ethers.utils.parseUnits(numberString, decimals)
  return tokenValue
}

export default convertToTokenValue

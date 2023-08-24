import { SupportedChainId } from '@ape.swap/sdk-core'

export const getSupportedChainId = (input: string | number = ''): SupportedChainId | undefined => {
  const numberInput = typeof input === 'string' ? Number(input) : input

  // Check if the input is a valid number and exists within the enum values
  if (!isNaN(numberInput) && Object.values(SupportedChainId).includes(numberInput)) {
    return numberInput
  }

  return undefined
}

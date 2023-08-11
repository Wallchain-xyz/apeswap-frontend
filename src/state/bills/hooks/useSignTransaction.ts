import { useWeb3React } from '@web3-react/core'

const useSignTransaction = () => {
  const { provider } = useWeb3React()

  const signTransaction = async (dataToSign: any): Promise<string | undefined> => {
    const tx = await provider?.getSigner().sendTransaction(dataToSign)
    return tx?.hash
  }
  return { signTransaction }
}

export default useSignTransaction

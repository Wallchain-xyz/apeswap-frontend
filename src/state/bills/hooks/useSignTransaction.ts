import { useWeb3React } from '@web3-react/core'
import { QuoteResult } from 'wido'

const useSignTransaction = () => {
  const { provider } = useWeb3React()

  const signTransaction = async ({
    widoQuote,
  }: {
    widoQuote: QuoteResult | null | undefined
  }): Promise<string | undefined> => {
    const { to, data, value } = widoQuote ?? {}

    const tx = await provider?.getSigner().sendTransaction({ data, to, value })
    return tx?.hash
  }
  return { signTransaction }
}

export default useSignTransaction

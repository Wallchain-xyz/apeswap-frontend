import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useAddTxFromHash, useTransactionAdder } from '../state/transactions/hooks'
import { LiFi, Route } from '@lifi/sdk'
import { getTxHashFromRoute } from '../views/Swap/utils'
import { TransactionType } from '../state/transactions/types'
import { TradeType } from '@ape.swap/sdk-core'
import { currencyId } from '../utils/currencyId'

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export const useSwapCallback = (selectedRoute: Route | undefined): () => Promise<Route | undefined> => {
  const { provider } = useWeb3React()
  const signer = provider?.getSigner()

  return useCallback(async () => {
    console.log('callback function is called')  // Debugging log
    const lifi = new LiFi({
      //make this a const
      integrator: 'apeswap',
    })
    if (!signer || !selectedRoute) return
    return await lifi.executeRoute(signer, selectedRoute)
      .then((response) => {
        console.log('response from executeRoute:', response)

        return response
      }).catch((error) => {
        console.error('An error occurred while executing the route:', error)
        throw error
      })
  }, [selectedRoute, signer])
}

import { useWeb3React } from '@web3-react/core'
import { SwapCallbackState } from 'lib/hooks/swap/useSwapCallback'
import { ReactNode, useCallback } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { LiFi, Route } from '@lifi/sdk'

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  selectedRoute: Route | undefined,
): { state?: SwapCallbackState; callback: undefined | (() => Promise<Route>); error?: ReactNode | null } {
  const { provider } = useWeb3React()

  const addTransaction = useTransactionAdder()

  const callback = useCallback(async () => {
    console.log('callback function is called')  // Debugging log
    const lifi = new LiFi({
      //make this a const
      integrator: 'apeswap',
    })
    const signer = provider?.getSigner()
    if (!signer || !selectedRoute) return undefined
    return await lifi.executeRoute(signer, selectedRoute)
      .then((response) => {
        console.log('response from executeRoute:', response)
        return response
      }).catch((error) => {
        console.error('An error occurred while executing the route:', error)
        throw error
      })
  }, [provider, selectedRoute])

  return {
    state: undefined,
    //@ts-ignore
    callback,
    error: undefined,
  }
}

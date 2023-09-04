import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { ExchangeRateUpdateParams, LiFi, Route } from '@lifi/sdk'
import { TWallchainStatus, getWallchainRoute } from 'hooks/useWallchain'
import { Web3Provider } from "@ethersproject/providers"

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export const useSwapCallback = (
  selectedRoute: Route | undefined,
  wallchainStatus?: TWallchainStatus
): ((
  updateRouteHook: (route: Route) => void,
  acceptExchangeRateUpdateHook: (params: ExchangeRateUpdateParams) => Promise<boolean>,
) => Promise<Route | undefined>) => {
  const { provider } = useWeb3React()
  const signer = provider?.getSigner()

  return useCallback(
    async (
      updateRouteHook: (route: Route) => void,
      acceptExchangeRateUpdateHook: (params: ExchangeRateUpdateParams) => Promise<boolean>,
    ) => {
      console.log('Initiate swap callback') // Debugging log
      
      const lifi = new LiFi({
        //make this a const
        integrator: 'apeswap',
      })
      if (!signer || !selectedRoute) return
      let wallchainSteps;
      try {
        wallchainSteps = await getWallchainRoute(provider as Web3Provider, selectedRoute, wallchainStatus)
      } catch (error) {
        if (
            wallchainStatus === 'found' 
            && selectedRoute.fromAddress !== '0x0000000000000000000000000000000000000000'
        ) { // if route was here it means we checked allowance for Wallchain not for LiFi, so need to restart
            throw new Error('Route has changed, please try again.')
        } else {
            wallchainSteps = selectedRoute
        }
      }
      return await lifi
        .executeRoute(signer, wallchainSteps, { updateRouteHook, acceptExchangeRateUpdateHook })
        .then((response) => {
          console.log('Executed route:', response)
          return response
        })
        .catch((error) => {
          console.error('An error occurred while executing the route:', error)
          throw error
        })
    },
    [selectedRoute, signer, wallchainStatus],
  )
}

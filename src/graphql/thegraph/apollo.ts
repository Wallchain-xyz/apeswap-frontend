import { SupportedChainId } from '@ape.swap/sdk-core'
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client'

import store, { AppState } from '../../state/index'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [SupportedChainId.POLYGON]: 'https://api.thegraph.com/subgraphs/name/prof-sd/as-polygon-v3',
  [SupportedChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/prof-sd/as-bsc-v3',
}

const httpLink = new HttpLink({ uri: CHAIN_SUBGRAPH_URL[SupportedChainId.POLYGON] })

// This middleware will allow us to dynamically update the uri for the requests based off chainId
// For more information: https://www.apollographql.com/docs/react/networking/advanced-http-networking/
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  // TODO: Add applciation chainId
  const chainId = (store.getState() as AppState).application.chainId

  operation.setContext(() => ({
    uri:
      chainId && CHAIN_SUBGRAPH_URL[chainId]
        ? CHAIN_SUBGRAPH_URL[chainId]
        : CHAIN_SUBGRAPH_URL[SupportedChainId.POLYGON],
  }))

  return forward(operation)
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

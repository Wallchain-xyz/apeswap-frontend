import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { fetchChains } from '../actions'
import { AppState } from '../../index'
import { Chain } from '@lifi/sdk'

const useFetchChains = () => {
  const dispatch = useDispatch()
  const chains = useSelector((state: AppState) => state.lists.supportedChains)

  const { isLoading, error, data } = useQuery(
    ['fetchChains'],
    async () => {
      const response = await axios.get('https://li.quest/v1/chains')
      // Transform the chains array into an object with chain IDs as keys
      const chainsObject = response?.data?.chains?.reduce((obj: Chain[], item: Chain) => {
        return {
          ...obj,
          [item.id]: item,
        }
      }, {})

      return chainsObject
    },
    {
      // The query will not execute until the chain length is 0
      enabled: chains.length === 0,
    },
  )

  if (!isLoading && data) {
    // dispatch the data into the redux state
    dispatch(fetchChains(data))
  }

  return { isLoading, error, data }
}

export default useFetchChains

import { addSimpleProfiles } from './reducer'
import { SimpleTokenProfile } from './types'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import store from 'state'

//TODO: move this to a const file and/or make it a env variable

const apiEndpoint = 'https://lhd-temp-api.herokuapp.com/liquidity-health-dashboard'
const getSearchResults = async (searchQuery: string): Promise<SimpleTokenProfile[]> => {
  const res = await axios(`${apiEndpoint}/profiles/search/${searchQuery}`)

  return res.data
}
export const fetchProfiles = async (query?: string) => {
  console.log('hello world')
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    let res
    if (query) {
      res = await axios.get(`${apiEndpoint}/profiles/search/${query ?? ''}`)
    } else {
      res = await axios.get(`${apiEndpoint}/profiles`)
    }
    console.log(res)
    if (res?.data?.statusCode === 500) {
      return null
    }
    return res.data
  } catch (error) {
    return null
  }
}
export const fetchInitialProfiles = () => async (dispatch: any) => {
  try {
    const listData: SimpleTokenProfile[] = await fetchProfiles()
    dispatch(addSimpleProfiles(listData))
  } catch (error) {
    console.warn(error)
  }
}
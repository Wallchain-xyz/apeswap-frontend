import { addIndustryData, addSimpleProfiles } from './reducer'
import { SimpleTokenProfile } from './types'
import axios from 'axios'
import axiosRetry from 'axios-retry'

//TODO: move this to a const file and/or make it a env variable

const apiEndpoint = 'https://lhd-temp-api.herokuapp.com'

export const fetchProfiles = async (query?: string) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    let res
    if (query) {
      res = await axios.get(`${apiEndpoint}/liquidity-health-dashboard/profiles/search/${query}`)
    } else {
      res = await axios.get(`${apiEndpoint}/liquidity-health-dashboard/profiles`)
    }
    if (res?.data?.statusCode === 500) {
      return null
    }
    return res.data
  } catch (error) {
    return null
  }
}

export const fetchIndustry = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const res = await axios.get(`${apiEndpoint}/industry-stats`)
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
    const industryAverage = await fetchIndustry()
    dispatch(addIndustryData(industryAverage))
    dispatch(addSimpleProfiles(listData))
  } catch (error) {
    console.warn(error)
  }
}

export const fetchFullProfile = async (query?: string) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const res = await axios.get(`${apiEndpoint}/liquidity-health-dashboard/profiles/${query ?? ''}`)
    if (res?.data?.statusCode === 500) {
      return null
    }
    return res.data
  } catch (error) {
    return null
  }
}
import { addIndustryData, addSimpleProfiles } from './reducer'
import { ProfilesResponse, SimpleTokenProfile } from './types'
import axios from 'axios'
import axiosRetry from 'axios-retry'

//TODO: move these to a const file and/or make it a env variable

const apiEndpoint = 'https://lhd-temp-api.herokuapp.com'
const lhdApiEndpoint = 'https://lhd-api.apeswap.finance'

export const fetchProfiles = async (query?: string, filters?: string) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    let res
    if (query) {
      res = await axios.get(`${apiEndpoint}/liquidity-health-dashboard/profiles/search/${query}`)
    } else if (filters) {
      res = await axios.get(`${apiEndpoint}/liquidity-health-dashboard/profiles?${filters}`)
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
  const date = new Date()
  date.setDate(date.getDate() - 7)

  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const res = await axios.get(`${apiEndpoint}/industry-stats`)
    const resHistorical = await axios.get(`${apiEndpoint}/industry-stats/${date.toISOString().split('T')[0]}`)
    if (res?.data?.statusCode === 500 || resHistorical?.data?.statusCode === 500) {
      return null
    }

    const industryAverageChange =
      Math.round(
        ((res.data.averageTotalScore - resHistorical.data.averageTotalScore) / resHistorical.data.averageTotalScore) *
          10000,
      ) / 100

    return {
      ...res.data,
      industryAverageChange: industryAverageChange > 0 ? '+' + industryAverageChange : industryAverageChange,
    }
  } catch (error) {
    return null
  }
}

export const fetchInitialProfiles = () => async (dispatch: any) => {
  try {
    // const listData: ProfilesResponse = await fetchProfiles()
    const industryAverage = await fetchIndustry()
    dispatch(addIndustryData(industryAverage))
    // dispatch(addSimpleProfiles(listData))
  } catch (error) {
    console.warn(error)
  }
}

export const fetchProfilesQuery = (query?: string, filters?: string) => async (dispatch: any) => {
  try {
    const listData: ProfilesResponse = await fetchProfiles(filters, query)
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

export const fetchIsPasswordVerified = async (password: string): Promise<boolean | null> => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })

    const res = await axios.get(`${lhdApiEndpoint}/verify/${password}`)
    if (res?.data?.statusCode === 500) {
      return null
    }
    return res.data.verified
  } catch (error) {
    return null
  }
}

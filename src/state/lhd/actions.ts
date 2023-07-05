import axios from 'axios'
import axiosRetry from 'axios-retry'

//TODO: move these to a const file and/or make it a env variable
const lhdApiEndpoint = 'https://lhd-api.apeswap.finance'

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

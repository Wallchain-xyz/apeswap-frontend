import { apiBaseUrl } from 'config/constants/api'
import { ServiceData } from './types'

const getHomepageServiceStats = async (): Promise<ServiceData[] | null> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/features`)
    const serviceResp = await response.json()
    if (serviceResp.statusCode === 500) {
      return null
    }
    return serviceResp
  } catch (error) {
    return null
  }
}

export default getHomepageServiceStats

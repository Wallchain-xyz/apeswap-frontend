import { apiBaseUrl } from 'config/constants/api'
import { HomepageData } from './types'

const getHomepageStats = async (): Promise<HomepageData | null> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/tvl`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export default getHomepageStats

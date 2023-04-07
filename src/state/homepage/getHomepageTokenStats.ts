import { apiBaseUrl } from 'config/constants/api'
import { HomepageTokenStats } from './types'

const getHomepageTokenStats = async (category: string): Promise<HomepageTokenStats[] | null> => {
  try {
    const response = await fetch(`${apiBaseUrl}/tokens/${category}`)
    const tokenRes = await response.json()
    if (tokenRes.statusCode === 500) {
      return null
    }
    return tokenRes
  } catch (error) {
    return null
  }
}

export default getHomepageTokenStats

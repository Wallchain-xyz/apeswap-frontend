import { baseUrlStrapi } from 'config/constants/api'
import { NewsCardType } from './types'

const getHomepageNews = async (): Promise<NewsCardType[] | null> => {
  try {
    const response = await fetch(`${baseUrlStrapi}/home-v-2-marketing-cards`)
    const newsRes = await response.json()
    if (newsRes.statusCode === 500) {
      return null
    }
    return newsRes
  } catch (error) {
    return null
  }
}

export default getHomepageNews

import { baseUrlStrapi } from 'config/constants/api'
import { LaunchCalendarCard } from './types'

const getHomepageLaunchCalendar = async (): Promise<LaunchCalendarCard[] | null> => {
  try {
    const response = await fetch(`${baseUrlStrapi}/home-v-2-launch-calendars?_sort=launchTime:asc`)
    const launchRes = await response.json()
    if (launchRes.statusCode === 500) {
      return null
    }
    return launchRes
  } catch (error) {
    return null
  }
}

export default getHomepageLaunchCalendar

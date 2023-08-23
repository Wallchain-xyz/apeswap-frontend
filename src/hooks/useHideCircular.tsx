import { getLocalStorage } from '../utils/useLocalStorage'

export const useHideCircular = (): boolean => {
  const hideCircular = getLocalStorage('hideCircular')
  return hideCircular ? JSON.parse(hideCircular) : false
}

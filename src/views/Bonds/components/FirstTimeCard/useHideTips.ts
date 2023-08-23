import { setLocalStorage } from '../../../../utils/useLocalStorage'

export const useHideTips = () => {
  return (value: boolean) => {
    setLocalStorage('hideTips', JSON.stringify(value))
  }
}

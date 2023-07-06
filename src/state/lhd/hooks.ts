import { useAppDispatch } from '../hooks'
import { setIsLhdAuth } from './reducer'
import { useRouter } from 'next/router'

export const useSetLhdAuth = () => {
  const dispatch = useAppDispatch()
  const setLhdAuth = (isAuth: boolean): void => {
    localStorage.setItem('isLhdAuth', JSON.stringify(isAuth))
    dispatch(setIsLhdAuth(isAuth))
  }
  return { setLhdAuth }
}

export const useGetIsLhdAuth = () => {
  const { query } = useRouter()
  const { setLhdAuth } = useSetLhdAuth()
  const isWhitelisted = query?.whitelist === 'true'

  const getIsLhdAuth = (): { isAuth: boolean } => {
    const isLocalLdhAuth = localStorage.getItem('isLhdAuth') === 'true'
    if (isLocalLdhAuth || isWhitelisted) {
      setLhdAuth(true)
      return { isAuth: true }
    }
    setLhdAuth(false)
    return { isAuth: false }
  }
  return { getIsLhdAuth }
}

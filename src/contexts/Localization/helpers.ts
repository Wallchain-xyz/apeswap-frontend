import { EN } from 'config/localization/languages'
import { getLocalStorage } from '../../utils/useLocalStorage'

const publicUrl = process.env.PUBLIC_URL || ''

export const LS_KEY = 'apeswap_language'

export const fetchLocale = async (locale: string) => {
  const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = getLocalStorage(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}

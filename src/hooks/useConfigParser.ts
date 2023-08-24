import { useRouter } from 'next/router'

function useConfigParser() {
  const { query } = useRouter()
  let configObject = null
  let error = false

  const configValue = query.config

  if (Array.isArray(configValue)) {
    return [null, true] // if it's an array, return error as true
  }

  if (configValue) {
    try {
      configObject = JSON.parse(decodeURIComponent(configValue))
    } catch (e) {
      error = true
    }
  }

  return [configObject, error]
}

export default useConfigParser

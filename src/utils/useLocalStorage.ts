export const getLocalStorage = (key: string) => {
  if (window.self === window.top) {
    // Not in an iframe, safe to access localStorage
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Failed to get value from localStorage:', error)
      return null
    }
  } else {
    // Inside an iframe, don't access localStorage
    console.log('Running inside an iframe')
    return null
  }
}

export const setLocalStorage = (key: string, value: any) => {
  if (window.self === window.top) {
    // Not in an iframe, safe to access localStorage
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to set value in localStorage:', error)
    }
  } else {
    // Inside an iframe, don't access localStorage
    console.log('Running inside an iframe')
  }
}

export const removeLocalStorage = (key: string) => {
  if (window.self === window.top) {
    // Not in an iframe, safe to access localStorage
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove value from localStorage:', error)
    }
  } else {
    // Inside an iframe, don't access localStorage
    console.log('Running inside an iframe')
  }
}

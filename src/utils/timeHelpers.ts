export const formatTime = (date: Date | string): string => {
  // Convert string to Date object if necessary
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  // Array of month names for conversion
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = monthNames[parsedDate.getUTCMonth()]
  const day = parsedDate.getUTCDate()
  const hours = String(parsedDate.getUTCHours()).padStart(2, '0') // Padding for single digit hours
  const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0') // Padding for single digit minutes

  // Convert day to its ordinal form
  let dayWithSuffix
  if (day % 10 === 1 && day !== 11) {
    dayWithSuffix = `${day}st`
  } else if (day % 10 === 2 && day !== 12) {
    dayWithSuffix = `${day}nd`
  } else if (day % 10 === 3 && day !== 13) {
    dayWithSuffix = `${day}rd`
  } else {
    dayWithSuffix = `${day}th`
  }

  // Return the formatted string
  return `Launches on ${month} ${dayWithSuffix}, ${hours}:${minutes} UTC`
}

export const isFutureTime = (isoTime: string): boolean => {
  const currentTime = new Date()
  const providedTime = new Date(isoTime)
  return providedTime > currentTime
}

export const getCountdownString = (targetIsoTime: string): string => {
  const targetTime = new Date(targetIsoTime)
  const now = new Date()

  let delta = (targetTime.getTime() - now.getTime()) / 100 // difference in deciseconds

  // If the target time has passed, return zero countdown
  if (delta <= 0) return '0d 0h 0m 0s 00'

  const days = Math.floor(delta / 864000)
  delta -= days * 864000

  const hours = Math.floor(delta / 36000) % 24
  delta -= hours * 36000

  const minutes = Math.floor(delta / 600) % 60
  delta -= minutes * 600

  const seconds = Math.floor(delta / 10) % 60
  delta -= seconds * 10

  const deciseconds = Math.floor(delta) % 10

  return `${days}d ${hours}h ${minutes}m ${seconds}s ${deciseconds}${Math.floor((delta - deciseconds) * 10)}...`
}

import { FilterState, initialFilterValues } from '../../../../state/lhd/reducer'

export function countChangedProperties(current: FilterState): number {
  const initial = initialFilterValues
  let changedProperties = 0

  // Iterate over the keys (properties) of the FilterState object
  for (const key in initial) {
    // Assert that key is a key of FilterState
    const typedKey = key as keyof FilterState

    // Check if both min and max values have changed for the given property
    if (typedKey === 'tags' || typedKey === 'chains') {
      if (initial[typedKey].length !== current[typedKey].length) {
        changedProperties++
      }
    } else {
      if (initial[typedKey].min !== current[typedKey].min || initial[typedKey].max !== current[typedKey].max) {
        changedProperties++
      }
    }
  }

  return changedProperties
}

// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const shouldDivideBy100 = (key: string): boolean => {
  return ['totalScore', 'health', 'ownership', 'concentration'].includes(key)
}

export const generateSearchParams = (values: FilterState): string => {
  const differences: string[] = []

  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      if (key === 'tags' || key === 'chains') {
        if (values[key].length > 0) {
          differences.push(`${key}=` + values[key].join(','))
        }
        continue
      }
      const value = values[key as keyof FilterState]
      const initialValue = initialFilterValues[key as keyof FilterState]

      if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
        const keyValuePairs = Object.entries(value)
          .map(([subKey, subValue]) => {
            if (shouldDivideBy100(key)) {
              subValue /= 100
            }
            return `${key}${capitalizeFirstLetter(subKey)}=${subValue}`
          })
          .join('&')

        differences.push(keyValuePairs)
      }
    }
  }
  return differences.join('&')
}

import { useEffect, useState } from 'react'

// Helper for getting value from localStorage
const getLocalStorageValue = <T>(key: string, initialValue: T) => {
  // Window does not exist when server side rendering
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const localStorageItem = localStorage.getItem(key)
    // Values are always stored as JSON string so they need to be parsed
    return localStorageItem ? JSON.parse(localStorageItem) : initialValue
  } catch (error) {
    console.warn(`useLocalStorage - error getting value for ${key}: `, error)
    return initialValue
  }
}

const setLocalStorageValue = <T>(key: string, value?: T) => {
  if (value === undefined || typeof value === 'function') return
  try {
    // Values are always stored as JSON string
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`useLocalStorage - error setting value for ${key}: `, error)
  }
}

/**
 * A hook for persisting state in localStorage.
 *
 * Use if you need a value to persist across browser sessions.
 *
 * @param key `string`
 * @param initialState - any `JSON` parseable object
 *
 */
export const useLocalStorage = <T>(
  key: string,
  initialState?: T | (() => T)
) => {
  const state = useState<T>(getLocalStorageValue(key, initialState))

  const [value] = state

  useEffect(() => {
    setLocalStorageValue(key, value)
  }, [key, value])

  return state
}

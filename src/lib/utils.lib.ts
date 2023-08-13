import { isString } from 'formik'
import { isValidPhoneNumber as isValidPhoneNumber_ } from 'libphonenumber-js'

export const convertToLowerSnakeCase = (text: string) => {
  return text.replaceAll(' ', '_').toLowerCase()
}

export const isValidPhoneNumber = (value: any): boolean => {
  if (!isString(value)) return false

  if (value.length === 0) return false

  return isValidPhoneNumber_(value, 'NG')
}

export const serialize = (num: number): string => {
  if (num === 0) return '0'

  if (Math.abs(num) < 10) {
    if (num < 0) {
      return '-0' + Math.abs(num)
    } else {
      return '0' + num
    }
  } else {
    return String(num)
  }
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

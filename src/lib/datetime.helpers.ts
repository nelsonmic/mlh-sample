import { format, formatDistance, parseISO } from 'date-fns'
import { serialize } from './utils.lib'

export const safeParseISO = (isoString: string): Date | null => {
  try {
    const formattedDate = parseISO(isoString)
    if (formattedDate.toString().includes('Invalid Date')) return null

    return formattedDate
  } catch (err) {
    return null
  }
}

export const safeFormat = (...args: Parameters<typeof format>) => {
  if (String(args[0]) === 'Invalid Date') return null

  return format(...args)
}

export const safeFormatDistance = (...args: Parameters<typeof formatDistance>) => {
  if (String(args[0]) === 'Invalid Date') return null

  return formatDistance(...args)
}

export const secondsToHms = (d: number): [string, string, string] => {
  const gtZero = (n: number) => n > 0
  const isNum = (n: any) => typeof n === 'number' && !Object.is(NaN, n)

  const numToTime = (d: number) => {
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)

    return [h, m, s]
  }

  const [h, m, s] = numToTime(d)

  return [
    isNum(h) && gtZero(h) ? serialize(h) : '00',
    isNum(m) && gtZero(m) ? serialize(m) : '00',
    isNum(s) && gtZero(s) ? serialize(s) : '00',
  ]
}

export const CustomTimestamp = (dateString: any) => {
  const date = safeParseISO(dateString) || ''
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return formattedDate
}

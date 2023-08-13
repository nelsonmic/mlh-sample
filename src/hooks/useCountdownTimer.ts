import { secondsToHms } from 'lib/datetime.helpers'
import { useCallback, useEffect, useRef, useState } from 'react'

import useEffectEvent from 'react-use-event-hook'

type useCountDownProps =
  | {
      key?: undefined
      debug?: undefined
      autoStart: boolean
      delay: number
    }
  | {
      key: string
      debug: boolean
      autoStart: boolean
      delay: number
    }

export function useCountDown({ autoStart = true, delay = 60000, ...props }: useCountDownProps) {
  const delayInSecs = delay / 1000
  const intervalId = useRef<any>([])
  const [ended, setStop] = useState(false)
  const [hms, setHms] = useState<[string, string, string]>(() => secondsToHms(delayInSecs))
  const running = useRef(true)
  const delayInSeconds = useRef(delayInSecs)

  const clearTimer = useCallback(() => {
    intervalId.current.map((id: number) => clearInterval(id))
    intervalId.current = []
  }, [])

  const stop = useCallback(() => {
    running.current = false
    setStop(true)
  }, [])

  const start = useCallback(() => {
    clearTimer()

    const id = setInterval(() => {
      if (!running.current) {
        return pause()
      }
      const decrementSeconds = delayInSeconds.current - 1
      const timerEnded = decrementSeconds <= 0

      if (timerEnded) {
        stop()
      }

      setHms(secondsToHms(decrementSeconds))

      delayInSeconds.current = decrementSeconds
    }, 1000)

    intervalId.current = intervalId.current.concat([id])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.key, stop])

  const pause = () => {
    clearTimer()
    stop()
  }

  const reset = useEffectEvent(() => {
    clearTimer()
    running.current = true
    delayInSeconds.current = delayInSecs
    setHms(secondsToHms(delayInSecs))
    setStop(false)
  })

  const restart = useCallback(() => {
    reset()
    start()
  }, [reset, start])

  useEffect(() => {
    if (!autoStart) return clearTimer

    restart()
    return clearTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ended,
    hms,
    start: start,
    pause,
    stop,
    reset,
    restart: restart,
    formatted: [hms[0], hms[1], hms[2]].join(':'),
  }
}

export default useCountDown

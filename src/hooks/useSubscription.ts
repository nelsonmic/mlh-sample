import React from 'react'
import { Observable } from 'rxjs'

export const useSubscription = <S extends Observable<unknown>>(
  subject: S,
  callback: Parameters<S['subscribe']>[0],
) => {
  React.useEffect(() => {
    const subscription = subject.subscribe(callback)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line
  }, [])
}

import { useSubscription } from 'hooks/useSubscription'
import React from 'react'
import { Subject } from 'rxjs'

export function makeSignal<T>(subject: Subject<{ type: 'signal'; value: T }>) {
  function useSubSignal(initial: T) {
    const [state, setState] = React.useState<T>(initial)

    useSubscription(subject, (evt) => {
      if (evt.type === 'signal') {
        setState(evt.value)
      }
    })

    return state
  }

  const update = (value: T) => {
    subject.next({ type: 'signal', value })
  }

  return { useSignal: useSubSignal, update }
}

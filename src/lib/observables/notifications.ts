/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Subject } from 'rxjs'
import { curry, has } from 'ramda'
import { upperFirst } from 'lodash'
import React from 'react'
import { ErrorCodes } from 'core/constants'

type ApiError = {
  kind: 'ApiError'
  message: string
  response: any
}

type DataError = { message: string; name: string; value: any }

type ValidationError = {
  kind: 'ValidationError'
  messages: DataError[]
}

type UnexpectedApiErrorResponse = {
  kind: 'UnexpectedErrorRes'
  message: string
  value: any
}

type ExpectedError = {
  kind: 'ExpectedError'
  code: number
  message: string
}

export type ApiErrors = ExpectedError | ValidationError | ApiError | UnexpectedApiErrorResponse

type AlertMessage =
  | { message: React.JSX.Element | string }
  | { title: string; message: React.JSX.Element | string }

type NotificationEvents = {
  kind: 'toast'
  type: 'success' | 'error' | 'warning' | 'info'
  params: AlertMessage & { onClose?: () => void; autoHideDuration?: number }
}

export const NotificationSubject = new Subject<NotificationEvents>()

/**
 * Shows a toast notification
 */
export const notify = curry(
  (type: NotificationEvents['type'], args2: string | NotificationEvents['params']) => {
    if (typeof args2 === 'string')
      return NotificationSubject.next({
        kind: 'toast',
        type,
        params: { message: args2 },
      })

    NotificationSubject.next({ kind: 'toast', type, params: args2 })
  },
)

export const handleApiError = (err: any) => {
  // ignore expired session error
  if (err?.code === ErrorCodes.UNAUTHORIZED && err?.message === 'Session expired') {
    return
  }

  notify('error', translateMessage(resolveErrorMessage(err)))
}

export const tapHandleApiError = (err: any) => {
  handleApiError(err)
  throw err
}

const translateMessage = (message: string) => {
  if (message.includes('Bad credentials for exsting user'))
    return 'A user with that phone number/email address already exist'

  return message
}

export const resolveErrorMessage = <Err extends ApiErrors>(err: Err): string => {
  //   @ts-ignore
  if (err.response.status === 401) return 'Looks like you have to be logged in'
  // @ts-ignore
  if (err instanceof Error) return upperFirst(err.response.data.message)

  if (!has('kind', err)) return 'Something went wrong'
  // @ts-ignore
  if (err.kind === 'ValidationError') return upperFirst(err.response.data.message)
  // @ts-ignore
  return upperFirst(err.response.data.message)
}

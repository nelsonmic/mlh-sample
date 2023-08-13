/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const makePortal = (id: string) => {
  const Outlet = ({
    as = 'div',
    children,
    ...props
  }: { as?: keyof JSX.IntrinsicElements } & JSX.IntrinsicElements['div']) => {
    const Component = as

    return (
      // @ts-ignore
      <Component {...props} id={`${id}`}>
        {/* @ts-ignore*/}
        {children}
      </Component>
    )
  }

  const Slot = ({ children }: React.PropsWithChildren<any>) => {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>(`#${id}`)
      setMounted(true)
      return () => setMounted(false)
    }, [])

    return mounted && ref.current ? createPortal(children, ref.current) : null
  }

  return {
    Outlet,
    Slot,
  }
}

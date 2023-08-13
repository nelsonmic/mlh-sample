import React from 'react'
import cn from 'classnames'

export const FocusButton = ({
  children,
  className,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode
  className?: string
  onClick?: any
  type?: 'submit' | 'reset' | 'button'
}) => {
  return (
    <button
      type={type}
      onClick={() => {
        setTimeout(() => {
          onClick()
        }, 200)
      }}
      className={cn(
        'flex items-center justify-center outline-none transition ease-in-out duration-500 aspect-square focus:bg-[#3A3A3AE8]/[0.2] hover:bg-[#3A3A3AE8]/[0.2] hover:cursor-pointer border-none w-[30px] h-[30px] rounded-2xl shadow-2xl',
        className,
      )}
    >
      {children}
    </button>
  )
}

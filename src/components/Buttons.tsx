import cn from 'classnames'
import { ComponentProps } from 'react'
import Loader from '../assets/icons/loader.svg'

const Sizes = {
  lg: 'py-4 px-8 font-semibold text-lg',
  md: 'py-3 px-6 font-semibold text-lg',
  sm: 'py-2 px-4 font-semibold text-base',
}

const colors = {
  primary: {
    filled: 'bg-black text-white',
    outline: 'border-font-black text-font-black hover:bg-font-black/[.16] hover:text-white',
  },
  red: {
    filled: 'bg-red-500 text-white',
    outline: 'border-red-500 text-red-500 hover:bg-red-500/[.16]',
  },
} as const

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'red'
  loading?: boolean
  variant: 'filled' | 'outline'
  children?: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    variant,
    color = 'primary',
    size = 'lg',
    loading = false,
    ...props_
  } = props

  return (
    <button
      {...props_}
      disabled={props_.disabled || loading}
      className={cn(
        'outline-none inline-flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed rounded-[8px]',
        className,
        Sizes[size],
        colors[color]?.[variant],
        {
          'border bg-transparent': variant === 'outline',
        },
      )}
    >
      {loading ? <img src={Loader} alt='edit button' /> : children}
    </button>
  )
}

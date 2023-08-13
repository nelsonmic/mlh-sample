import React, { forwardRef, useState } from 'react'
import { FormInput, FormInputProps } from './FormInput'
import EyeClose from '../assets/icons/eyeClose.svg'
import EyeOpen from '../assets/icons/eyeOpen.svg'

type PasswordInputProps = FormInputProps & {
  hideToggle?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput_({ hideToggle = false, ...props }, ref) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
      <FormInput
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        handleClick={() => setShowPassword(!showPassword)}
        rightIcon={
          hideToggle ? null : showPassword ? (
            <img src={EyeClose} alt='password closed eye' />
          ) : (
            <img src={EyeOpen} alt='password opened eye' />
          )
        }
      />
    )
  },
)

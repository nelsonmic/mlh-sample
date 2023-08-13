import React, { useRef, useState } from 'react'

type PinInputProps = {
  onChange: (pin: string) => void
  length?: number
  token: string
}

export const PinInput: React.FC<PinInputProps> = ({ onChange, length = 6, token }) => {
  const input = useRef(Array(length).fill('')).current
  const [values, setValues] = useState<string[]>(() =>
    token ? token.slice(0, length).split('') : input,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    const newValues = [...values]
    const index = Number(name)

    if (index >= 0 && index < length) {
      newValues[index] = value
      setValues(newValues)
      onChange(newValues.join(''))

      if (index < length - 1) {
        const nextInput = document.getElementsByName((index + 1).toString())[0] as HTMLInputElement
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const { name } = event.target as HTMLInputElement

    if (key.toLowerCase() === 'backspace' && Number(name)) {
      const newValues = [...values]
      newValues[Number(name)] = ''
      setValues(newValues)

      const previousInput = document.getElementsByName(
        (Number(name) - 1).toString(),
      )[0] as HTMLInputElement
      previousInput.focus()
    }
  }

  return (
    <div className='flex justify-between items-center'>
      {input.map((_, i) => (
        <input
          type='text'
          data-testid={'input'}
          name={i.toString()}
          value={values[i]}
          key={i}
          required
          maxLength={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='bg-grey-200 text-font-grey-300 font-semibold rounded-lg p-2 mx-1 text-[24px] text-center w-[50px] h-[50px] outline-none valid:bg-primary valid:text-font-grey-300 transition-colors duration-700'
        />
      ))}
    </div>
  )
}

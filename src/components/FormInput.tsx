import { ComponentProps, HTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { FocusButton } from './FocusButton'

type RightIconProps =
  | { rightIcon?: undefined; handleClick?: undefined }
  | {
      rightIcon: React.ReactNode
      handleClick: () => void
    }

interface InputProps extends ComponentProps<'input'> {
  label?: string
  placeholder?: string
  error?: boolean | any
}

export type FormInputProps = InputProps & RightIconProps

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput_(
  props,
  ref,
) {
  const { name, error, label, rightIcon, type, readOnly, handleClick, ...inputProps } = props
  return (
    <span className={cn('mb-8 flex flex-col gap-2')}>
      <label className='text-[14px] font-semibold mb-4' htmlFor={name}>
        {label}
      </label>
      <div className='relative'>
        <input
          className={cn(
            'bg-grey-200 w-full text-font-grey-300 font-semibold placeholder:text-lg text-[16px] outline-none p-4 py-[15px] focus-within:ring ring-green-500/[0.4] transition ease-in duration-500',
            readOnly && 'cursor-not-allowed',
            {
              'ring-red-500/[0.4]': Boolean(error) === true,
            },
          )}
          ref={ref}
          type={type}
          name={name}
          id={name}
          readOnly={readOnly}
          onChange={props.onChange}
          {...inputProps}
        />

        {!rightIcon ? null : (
          <FocusButton
            type={'button'}
            className='absolute z-20 top-[50%] translate-y-[-50%] right-0 mr-2'
            onClick={() => handleClick()}
          >
            {rightIcon}
          </FocusButton>
        )}
      </div>
      {Boolean(error) && <p className='text-lg text-red-500 font-semibold'>{error}</p>}
    </span>
  )
})

interface FormTextAreaProps extends ComponentProps<'textarea'> {
  label?: string
  classes?: { textarea?: string }
  error?: boolean | any
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  function FormTextArea_(props, ref) {
    const { name, error, label, readOnly, classes, ...textareaProps } = props

    return (
      <span className={cn('mb-6 flex flex-col gap-2')}>
        <label className='text-[14px] mb-4 font-semibold' htmlFor={name}>
          {label}
        </label>
        <textarea
          ref={ref}
          {...textareaProps}
          {...InputDirectives.listItems}
          name={name}
          className={cn(
            'bg-grey-200 text-font-grey-300 font-semibold placeholder:text-lg text-[16px] outline-none p-4 py-[15px] focus-within:ring ring-green-500/[0.4]',
            readOnly && 'cursor-not-allowed',
            classes?.textarea,
            {
              'ring-red-500/[0.4]': Boolean(error) === true,
            },
          )}
          readOnly={readOnly}
        />
        {Boolean(error) && <p className='text-lg text-red-500 font-semibold'>{error}</p>}
      </span>
    )
  },
)

let listItemNumber = 1
const InputDirectives: Record<'listItems', HTMLAttributes<HTMLElement>> = {
  listItems: {
    inputMode: 'text',
    onKeyDown: (e): void => {
      const target = e.target as HTMLTextAreaElement
      if (listItemNumber === 1 && e.key !== 'Enter') {
        if (e.key === 'Backspace') {
          if (listItemNumber === 1) listItemNumber = 1
        } else {
          target.value += `${listItemNumber}. `
          listItemNumber++
        }
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        target.value += `\n${listItemNumber}. `
        listItemNumber++
      }
    },
    onInput: (e): void => {
      const target = e.target as HTMLTextAreaElement
      const lines = target.value.split('\n')

      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim()
        if (line === '') {
          listItemNumber = i + 1
          break
        }
      }
    },
  },
}
export const CurrencyInputDirective: Record<'numbersOnly', HTMLAttributes<HTMLElement>> = {
  numbersOnly: {
    inputMode: 'numeric',
    onKeyDown: (e) => {
      if (e.code === '') return
      if (['Backspace', 'Tab', 'Period'].includes(e.code)) return
      if ((e.code || '').includes('Arrow')) return

      if (!/\d+?/.test(e.code)) {
        e.preventDefault()
      }
    },
    onInput: (e) => {
      const target = e.target as HTMLInputElement
      const currentValue = target.value

      let newValue = currentValue
        .replace(/[^\d.]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))(?<!\.\d*)/g, ',')

      const parts = newValue.split('.')

      if (parts.length > 1) {
        const integerPart = parts[0]
        const decimalPart = parts[1].slice(0, 2)
        newValue = integerPart + '.' + decimalPart
      }

      target.value = newValue
    },
  },
}

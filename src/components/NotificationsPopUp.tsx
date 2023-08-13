/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import styled, { css } from '@wigxel/react-components'
// @ts-ignore
import { color, propIs } from '@wigxel/react-components/lib/utils'
import Theme from 'Theme'
import React from 'react'
import { RiCloseLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'

type AlertVariants = 'default' | 'success' | 'warning' | 'error' | 'info'

const variantIs = (
  variant: string,
  {
    textColor,
    bgColor,
    strokeColor,
    fillColor,
    fallbackColor,
  }: {
    textColor: string
    bgColor: string
    strokeColor: string
    fillColor: string
    fallbackColor: string
  },
) =>
  propIs(
    'variant',
    (e: AlertVariants) => e === variant,
    css`
      color: ${textColor};
      background-color: ${fallbackColor};
      border: solid 1px rgba(255, 255, 255, 0.45);

      @supports (backdrop-filter: blur(34px)) {
        backdrop-filter: blur(34px);
        background-color: ${bgColor};
      }

      .close-icon {
        --fill-color: ${fillColor};
        --stroke-color: ${strokeColor};
      }
    `,
  )

const StyledBox = styled.div`
  display: flex;
  min-width: 246px;
  border-radius: 9px;
  color: #333;
  padding: 1rem 1.5rem;
  background-color: #fff;
  align-items: flex-start;
  //box-shadow: 0px -15px 18px rgba(79, 79, 79, 0.05);

  > .icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: inline-flex;
    justify-content: center;
    margin-left: -0.5rem;
    margin-right: 0.5rem;
    align-items: center;
  }

  .message {
    margin-top: 3.3px;
    flex: 1 1 auto;
  }

  ${propIs(
    'variant',
    (variant: AlertVariants) => {
      return variant === 'error'
    },
    css`
      background-color: #fce7e7;
      color: #f44848;
    `,
  )}

  ${propIs(
    'variant',
    (variant: AlertVariants) => {
      return variant === 'info'
    },
    css`
      background-color: #e5f0fa;
      color: #4100fe;
    `,
  )}

  ${propIs(
    'variant',
    (variant: AlertVariants) => {
      return variant === 'success'
    },
    css`
      color: #009763;
      background-color: #fff;
    `,
  )}

  ${propIs(
    'variant',
    (variant: AlertVariants) => {
      return variant === 'default'
    },
    css`
      background-color: white;
      color: ${color('primary')};
    `,
  )}
`

// textColor, bgColor, strokeColor, fillColor, fallbackColor
const StyledMessageBox = styled(StyledBox)`
  border-radius: 12px;
  box-shadow: 0 20px 28px rgba(79, 79, 79, 0.08), 0 -4px 12px -6px rgba(255, 255, 255, 0.36) inset;
  ${variantIs('error', {
    textColor: Theme.colors.red600,
    bgColor: 'rgba(244, 177, 173, 0.75)',
    strokeColor: Theme.colors.red400,
    fillColor: Theme.colors.red50,
    fallbackColor: 'rgba(244, 177, 173, 0.95)',
  })}

  ${variantIs('warning', {
    textColor: 'rgb(255 217 101)',
    bgColor: 'rgba(255, 217, 101, 0.75)',
    strokeColor: Theme.colors.yellow600,
    fillColor: Theme.colors.yellow600,
    fallbackColor: 'rgb(255 217 101, 0.95)',
  })}

  ${variantIs('success', {
    textColor: '#fff',
    bgColor: Theme.colors.primary,
    strokeColor: Theme.colors.blue400,
    fillColor: Theme.colors.blue100,
    fallbackColor: 'rgba(214, 210, 253, 0.95)',
  })}

  ${variantIs('info', {
    textColor: '#2f602a',
    bgColor: 'rgba(162,255,207,0.78)',
    strokeColor: Theme.colors.blue400,
    fillColor: Theme.colors.blue100,
    fallbackColor: 'rgba(214, 210, 253, 0.95)',
  })}

  ${variantIs('default', {
    textColor: Theme.colors.blue600,
    bgColor: 'rgba(214, 210, 253, 0.3)',
    strokeColor: Theme.colors.blue400,
    fillColor: Theme.colors.blue100,
    fallbackColor: 'rgba(214, 210, 253, 0.95)',
  })}
`

const StyledToastBox = styled(StyledBox)`
  min-width: auto;
  background-color: #fff;
  color: ${Theme.colors.blue600};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  align-items: center;
  padding: 6px 10px;

  .icon {
    display: none;
  }
`

export type IToastBox = React.PropsWithChildren<{
  variant: AlertVariants
  Icon?: () => React.JSX.Element
  onClose?: () => void
}>

export interface IMessageBox extends IToastBox {
  title?: string
}

export const MessageBox = React.forwardRef<null, IMessageBox>(function MessageBox(
  { variant, children, title = null, onClose = () => {} },
  ref,
) {
  return (
    <StyledMessageBox ref={ref} id='custom-notif' variant={variant}>
      <span
        className='close-icon absolute opacity-50 top-0 right-0 cursor-pointer rounded-full p-2'
        onClick={onClose}
      >
        <RiCloseLine size={18} />
      </span>

      {['error', 'warning'].includes(variant) ? (
        <span className='icon opacity-40'>
          <RiErrorWarningLine size={20} />
        </span>
      ) : (
        <span className='icon opacity-50'>
          <RiInformationLine size={20} />
        </span>
      )}

      <section className='flex w-full pr-4'>
        <div className='flex flex-1 flex-col'>
          {title && <span className='message font-bold'>{title}</span>}
          <span className='message text-xl font-semibold'>{children}</span>
        </div>
      </section>
    </StyledMessageBox>
  )
})

export const ToastBox = React.forwardRef(function ToastBox(
  { Icon, variant, children }: React.PropsWithChildren<IToastBox>,
  ref,
) {
  return (
    <div className='flex justify-center'>
      <StyledToastBox ref={ref} id='mooooo' variant={variant}>
        {Icon && (
          <span className='icon'>
            {/* @ts-ignore */}
            <Icon size={24} />
          </span>
        )}
        <span className='message'>{children}</span>
      </StyledToastBox>
    </div>
  )
})

import { useState } from 'react'
import { AuthHeader } from '.'
import { Routes } from 'core/routing'
import { PinInput } from 'components/PinInput'
import { Button } from 'components/Buttons'
import useCountdownTimer from 'hooks/useCountdownTimer'

const EnterOTP = () => {
  const { hms, restart, ended } = useCountdownTimer({
    autoStart: true,
    delay: 30000,
  })
  const [pin, setPin] = useState('')
  console.log(pin)

  return (
    <>
      <AuthHeader to={Routes.Login} label='Enter OTP' />

      <p className='mt-[1rem] mb-[4rem] text-[1.4rem] text-grey-300'>
        Type out the 6 digits pin sent to your email address to reset your password.
      </p>
      <form action=''>
        <PinInput length={6} onChange={(value: string) => setPin(value)} token={''} />
        <div className='text-[1.2rem] text-blue-100 font-semibold mt-8'>
          {!ended ? (
            <p>
              Resend code{' '}
              <span>
                ({hms[1]}:{hms[2]}sec)
              </span>
            </p>
          ) : (
            <p>
              <span className={'font-semibold'}>{'Didn\'t get a code?'}</span>{' '}
              <button
                type={'button'}
                title={'Resend email'}
                className='border-none text-[13px] font-bold appearance-none hover:underline focus:outline-none'
                onClick={() => {
                  restart()
                  // props.onResend()
                }}
              >
                Resend email
              </button>
            </p>
          )}
        </div>
        <Button
          type='submit'
          variant={'filled'}
          size='lg'
          className='w-full py-6 mt-16'
          loading={false}
        >
          <p>Continue</p>
        </Button>
      </form>
    </>
  )
}

export default EnterOTP

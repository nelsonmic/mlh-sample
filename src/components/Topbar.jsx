import React from 'react'
import Bell from '../assets/icons/bell.svg'
import { RxCaretDown } from 'react-icons/rx'
import { HiUser } from 'react-icons/hi'
import cn from 'classnames'
import { FocusButton } from './FocusButton'
import { NotificationPopUp } from './PopupAndModals'

const Topbar = () => {
  const [showNotificationModal, setShowNotificationModal] = React.useState(false)
  const [showCaret, setShowCaret] = React.useState(false)
  return (
    <div className={'relative flex items-end justify-end bg-white shadow-sm border py-8 px-[40px]'}>
      <div className='flex items-center'>
        <FocusButton
          onClick={() => setShowNotificationModal(!showNotificationModal)}
          className='mr-24'
        >
          <img src={Bell} alt='bell' className='w-[20px] h-[20px] m-auto' />
        </FocusButton>
        <div className='flex items-center gap-8'>
          <span className='p-2 bg-sec-100 rounded-full'>
            <HiUser className='w-[20px] h-[20px] text-white' />
          </span>
          <div>
            <h4 className='font-medium text-2xl'>John Doe</h4>
            <p className='text-base'>Super Admin</p>
          </div>
          <button
            onClick={() => setShowCaret(!showCaret)}
            className='hover:cursor-pointer outline-none transition ease-in-out duration-500 focus:bg-[#3A3A3AE8]/[0.2] hover:[#3A3A3AE8]/[0.2] border-none w-[30px] h-[30px] rounded-2xl shadow-2xl'
          >
            <RxCaretDown
              className={cn(
                'w-[25px] h-[25px] font-bold m-auto transition ease-in-out duration-500',
                showCaret && 'rotate-180',
              )}
            />
          </button>
        </div>
      </div>
      <NotificationPopUp isOpen={showNotificationModal} />
    </div>
  )
}

export default Topbar

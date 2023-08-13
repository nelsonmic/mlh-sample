import React from 'react'
import { makePortal } from 'components/Portal'
import { useGetNotifications } from 'api/dashboard'
import { useFormik } from 'formik'
import { FormInput, FormTextArea, CurrencyInputDirective } from './FormInput'
import { Button } from './Buttons'
import { editHaulageValidation } from 'lib/validators.lib'
// import { FocusButton } from './FocusButton'
// import Close from '../assets/icons/close.svg'

export const NotificationContent = makePortal('notification-pop-up')
export const NotificationRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='absolute mr-6 z-40 right-0 border top-[100%] bg-white overflow-x-scroll max-h-[590px] min-w-[408px] max-w-[408px] p-8 pt-0 rounded-lg shadow-2xl'>
      <NotificationContent.Outlet className='flex-1'>{children}</NotificationContent.Outlet>
    </div>
  )
}

type NotificationPopupType = {
  isOpen: true
}

export const NotificationPopUp = ({ isOpen }: NotificationPopupType) => {
  const { data: notifications } = useGetNotifications()
  if (!isOpen) return null
  return (
    <NotificationRoot>
      <NotificationContent.Slot>
        <div>
          <div className='flex justify-between mb-12 sticky top-0 pt-8 pb-4 bg-white'>
            <h2 className='font-medium text-2xl'>Notifications</h2>
            <p className='font-medium text-lg'>Mark all as read</p>
          </div>
          <div>
            {!notifications ? (
              <p className='text-center p-6 font-medium text-lg text-font-grey'>
                You have no notifications!
              </p>
            ) : (
              <>
                {notifications.map((_: any, indx: React.Key | null | undefined) => {
                  return <Notification key={indx} />
                })}
              </>
            )}
          </div>
        </div>
      </NotificationContent.Slot>
    </NotificationRoot>
  )
}

const Notification = () => {
  return (
    <div className='flex gap-4 justify-start border-b pb-4 mt-6'>
      <div className='w-[10px] h-[10px] min-w-[10px] min-h-[10px] rounded-full bg-sec-200 mt-[5px]'></div>
      <div className='flex flex-col gap-4 pr-12'>
        <h2 className='font-medium text-2xl text-font-black'>New user sign up</h2>
        <p className='text-lg text-font-light'>
          You have just received an escrow transaction from Udefi Francisca.
        </p>
        <p className='text-font-grey'>20 mins ago</p>
      </div>
    </div>
  )
}

export const EditHaulageContent = makePortal('edit-haulage-modal')
export const EditHaulageRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed w-[100vw] h-[100vh] top-0 left-0 bg-font-grey/[0.6] flex items-center justify-center'>
      <EditHaulageContent.Outlet>{children}</EditHaulageContent.Outlet>
    </div>
  )
}

type Props = {
  isOpen: boolean
  close: React.Dispatch<React.SetStateAction<boolean>>
  data: any
}

export const EditHaulageModal: React.FC<Props> = ({ isOpen, close, data }) => {
  if (!isOpen) return null
  const formik = useFormik({
    initialValues: {
      status: '',
      categories: '',
      description: '',
      delivery_time: '',
      total_charge: '',
    },
    validationSchema: editHaulageValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <EditHaulageRoot>
      <EditHaulageContent.Slot>
        <div className='bg-white rounded-[8px] w-[600px] h-[80vh] max-h-[550px] overflow-y-scroll p-16 shadow-2xl'>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label='Name of Receipient'
              name='name'
              type='text'
              placeholder='e.g John Doe'
              readOnly
              value={data.recipientName}
            />
            <FormInput
              label='Phone Number of Recepient'
              name='phone'
              type='tel'
              placeholder='Enter mobile number'
              readOnly
              value={data.recipientPhone}
            />
            <FormInput
              label='Status'
              type='text'
              placeholder='e.g Approved'
              {...formik.getFieldProps('status')}
              error={formik.touched.status && formik.errors.status}
            />
            <FormInput
              label='Item Name'
              type='text'
              placeholder='e.g Accessories'
              {...formik.getFieldProps('categories')}
              error={formik.touched.categories && formik.errors.categories}
            />
            <FormTextArea
              label='Item list'
              placeholder='1. bag of glucose'
              rows={4}
              {...formik.getFieldProps('description')}
              error={formik.touched.description && formik.errors.description}
            />
            <FormInput
              label='Delivery Time'
              type='text'
              placeholder='e.g 2-3 days'
              {...formik.getFieldProps('delivery_time')}
              error={formik.touched.delivery_time && formik.errors.delivery_time}
            />
            <FormInput
              label='Amount'
              type='text'
              inputMode='decimal'
              {...CurrencyInputDirective.numbersOnly}
              placeholder='Enter amount'
              {...formik.getFieldProps('total_charge')}
              error={formik.touched.total_charge && formik.errors.total_charge}
            />

            <span className='block pt-12 flex items-center justify-center gap-6'>
              <Button size={'lg'} variant={'filled'} type='submit' className='w-[120px]'>
                Save
              </Button>
              <Button
                onClick={() => close(!isOpen)}
                size={'lg'}
                variant={'outline'}
                className='w-[120px] hover:bg-red-500 transition ease-in duration-300'
              >
                Cancel
              </Button>
            </span>
          </form>
        </div>
      </EditHaulageContent.Slot>
    </EditHaulageRoot>
  )
}

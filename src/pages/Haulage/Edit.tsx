import { FocusButton } from 'components/FocusButton'
import Arrow from '../../assets/icons/arrow.svg'
import EditIcon from '../../assets/icons/edit.svg'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { EditHaulageModal } from 'components/PopupAndModals'
import { useRowData } from '.'
import { capitalizeFirstLetter } from 'lib/utils.lib'
import { Routes } from 'core/routing'
const Edit = () => {
  const { rowData } = useRowData()
  const navigate = useNavigate()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  if (!rowData) {
    navigate(Routes.Haulage)
  }
  // React.useEffect(()=>{

  // }, [rowData, navigate])
  return (
    <>
      {rowData && (
        <>
          <div>
            <div className='flex items-center gap-8'>
              <FocusButton
                className='p-2'
                onClick={() => {
                  navigate('..', { relative: 'path' })
                }}
              >
                <img src={Arrow} alt='back arrow' />
              </FocusButton>
              <h2 className='text-3xl font-semibold'>Order details</h2>
              <Status status={capitalizeFirstLetter(rowData?.status)} className='w-[250px]' />
            </div>
            <div className='pt-24'>
              <div className='w-max flex items-center gap-6'>
                <div className='min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] w-[60px] h-[60px] rounded-full border-2'>
                  <img
                    src={rowData?.itemImage}
                    alt='back arrow'
                    className='rounded-full h-full w-full object-cover'
                  />
                </div>
                <span>
                  <p className='text-lg'>{rowData?.orderId}</p>
                  <p className='text-2xl font-semibold'>{rowData?.recipientName}</p>
                </span>
              </div>
              <span className='block mt-8 py-28 bg-font-grey'></span>
              <div className='py-4 mt-12 relative'>
                <div>
                  <HaulageData title='Item name' content={rowData?.itemsName} />
                  <HaulageData title='Recepient Name' content={rowData?.recipientName} />
                  <HaulageData title='Recepient Phone Number' content={rowData?.recipientPhone} />
                  <HaulageData
                    title='Pickup Location'
                    content='No 30 Oshodi road, Ikate. Surulere Lagos'
                  />
                  <HaulageData
                    title='Dropoff Location'
                    content='No 30 Oshodi road, Ikate. Surulere Lagos'
                  />
                </div>
                <FocusButton
                  onClick={() => {
                    setShowModal(!showModal)
                  }}
                  className='absolute top-0 right-0 p-2 w-[40px] h-[40px]'
                >
                  <img src={EditIcon} alt='edit button' />
                </FocusButton>
              </div>
            </div>
          </div>
          <EditHaulageModal isOpen={showModal} close={setShowModal} data={rowData} />
        </>
      )}
    </>
  )
}

export default Edit

// type StatusType = {
//   status: 'Approved' | 'Paid' | 'Completed' | 'In transit'
// }
export const Status = ({ status, className }: { status: string; className?: string }) => {
  return (
    <span
      className={cn(
        'p-2 max-w-[200px] block text-center rounded-[14px] text-lg font-medium',
        {
          'bg-status-active-secondary': status === 'Approved',
          'bg-status-pending-secondary': status === 'Paid',
          'bg-status-completed-secondary': status === 'Completed',
          'bg-status-canceled-secondary': status === 'In transit',
        },
        {
          'text-status-active-primary': status === 'Approved',
          'text-status-pending-primary': status === 'Paid',
          'text-status-completed-primary': status === 'Completed',
          'text-status-canceled-primary': status === 'In transit',
        },
        className,
      )}
    >
      {status}
    </span>
  )
}

const HaulageData = ({ title, content }: { title: string; content: string }) => {
  return (
    <span className='block mb-6'>
      <p className='text-lg text-font-grey font-medium'>{title}</p>
      <p className='text-2xl font-semibold'>{content}</p>
    </span>
  )
}

import { createColumnHelper } from '@tanstack/react-table'
import AdminDashboardHeader from '../components/AdminDashboardHeader'
import Button from '../components/Button'
import Table from '../components/Table'

interface tableType {
  emailAddress: string
  transactionId: number
  date: string
}

const tableData: tableType[] = [
  {
    emailAddress: 'amarangba@gmail.com',
    transactionId: 2436,
    date: '2/12/21',
  },
  {
    emailAddress: 'amarangba@gmail.com',
    transactionId: 2436,
    date: '2/12/21',
  },
  {
    emailAddress: 'amarangba@gmail.com',
    transactionId: 2436,
    date: '2/12/21',
  },
  {
    emailAddress: 'amarangba@gmail.com',
    transactionId: 2436,
    date: '2/12/21',
  },
  {
    emailAddress: 'amarangba@gmail.com',
    transactionId: 2436,
    date: '2/12/21',
  },
]

const Newsletter = () => {
  const columnHelper = createColumnHelper<tableType>()

  const columns = [
    columnHelper.accessor('emailAddress', {
      id: 'emailAddress',
      header: 'Email Address',
    }),

    columnHelper.accessor('transactionId', {
      id: 'transactionId',
      header: 'Transaction ID',
    }),

    columnHelper.accessor('date', {
      id: 'date',
      header: 'Date',
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: () => <Button text='Delete' />,
    }),
  ]

  return (
    <div className='spacing_section'>
      <AdminDashboardHeader headerText='Newsletter' content='View all newsletter subscribers' />

      <Table columnsHeader={columns} tableData={tableData} />
    </div>
  )
}

export default Newsletter

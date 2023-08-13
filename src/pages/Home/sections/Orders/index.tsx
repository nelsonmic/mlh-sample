import React from 'react'
import Table from '../../../../components/Table'
import recentOrders from './recent_orders.json'
import Header from './components/Header'
import { createColumnHelper } from '@tanstack/react-table'
import Status from '../../../../components/Table/components/Status'
import { getStatusColor } from '../../../../components/Table/utils'
import { ArrowDown2 } from 'iconsax-react'

const Orders = () => {
  interface Order {
    orderId: number
    itemsName: string
    dateOrdered: string
    estimatedValue: string
    recipientName: string
    status: string
    carrierName: string
  }

  const columnHelper = createColumnHelper<Order>()

  // defining the columns
  const columns = [
    columnHelper.accessor('orderId', {
      id: 'orderId',
      header: () => 'Order Id',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('itemsName', {
      id: 'itemsName',
      header: () => 'Item Name',
    }),

    columnHelper.accessor('dateOrdered', {
      id: 'dateOrdered',
      header: () => 'Date Ordered',
    }),

    columnHelper.accessor('estimatedValue', {
      id: 'estimatedValue',
      header: () => 'Estimated Value',
    }),

    columnHelper.accessor('recipientName', {
      id: 'recipientName',
      header: () => 'Recipient Name',
    }),

    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <span>
          Status <ArrowDown2 />{' '}
        </span>
      ),
      cell: (info) => <Status text={info.getValue()} type={getStatusColor(info.getValue())} />,
    }),

    columnHelper.accessor('carrierName', {
      id: 'carrierName',
      header: () => 'Carrier Name',
    }),
  ]

  return (
    <section style={{ paddingTop: '8em' }}>
      <Header />
      <Table columnsHeader={columns} tableData={recentOrders} center={true} />
    </section>
  )
}

export default Orders

/* eslint-disable quotes */
import { createColumnHelper } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import AdminDashboardHeader from '../components/AdminDashboardHeader'
import DropDown from '../components/DropDown'
import Status from '../components/Table/components/Status'
import { getStatusColor } from '../components/Table/utils'
import TableTabs from '../components/TableTabs'
import { useTabTitles } from '../hooks/table.hook'
import { convertToLowerSnakeCase } from '../lib/utils.lib'
import { Order } from 'pages/Haulage/Haulage'

const recentOrders = [
  {
    orderId: '814567',
    itemsName: 'Electronics',
    dateOrdered: '2/2/12',
    estimatedValue: 'N3,000',
    recipientName: 'Ifeanyi Okoro',
    status: 'Successful',
    carrierName: 'Mabel Rose',
  },
  {
    orderId: '814567',
    itemsName: 'Make up kit',
    dateOrdered: '2/2/12',
    estimatedValue: 'N3,000',
    recipientName: 'Ifeanyi Okoro',
    status: 'Canceled',
    carrierName: 'Mabel Rose',
  },
  {
    orderId: '814567',
    itemsName: 'Cake Mixer',
    dateOrdered: '2/2/12',
    estimatedValue: 'N3,000',
    recipientName: 'Ifeanyi Okoro',
    status: 'Canceled',
    carrierName: 'Mirabel Jones',
  },
  {
    orderId: '814567',
    itemsName: 'Headset',
    dateOrdered: '2/2/12',
    estimatedValue: 'N3,000',
    recipientName: 'Ifeanyi Okoro',
    status: 'Successful',
    carrierName: 'Agnes Okafor',
  },
]

const Orders = () => {
  const { tabTitles, activeTab, setActiveTab } = useTabTitles([
    'all',
    'ongoing',
    'completed',
    'cancelled',
  ])
  const [tableColumn, setTableColumn] = useState<any>()
  const [tableData, setTableData] = useState<any>()

  const changeActiveTab = (newTab: string) => {
    setActiveTab(newTab)
  }

  const columnHelper = createColumnHelper<Order>()

  useEffect(() => {
    const activeTabLowerCase = convertToLowerSnakeCase(activeTab)
    if (activeTabLowerCase === 'all') {
      const columns = [
        columnHelper.accessor('orderId', {
          id: 'orderId',
          header: () => 'Order Id',
        }),

        columnHelper.accessor('itemsName', {
          id: 'itemsName',
          header: () => 'Items Name',
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
          header: () => 'Status',
          cell: (info) => <Status text={info.getValue()} type={getStatusColor(info.getValue())} />,
        }),

        columnHelper.accessor('carrierName', {
          id: 'carrierName',
          header: () => 'Carrier Name',
        }),

        columnHelper.display({
          id: 'action',
          header: 'Action',
          cell: () => (
            <DropDown>
              <li>view details</li>
            </DropDown>
          ),
        }),
      ]

      setTableColumn(columns)
      setTableData(recentOrders)
    } else {
      setTableColumn(null)
      setTableData(null)
    }
  }, [activeTab])

  return (
    <div className='orderContainer'>
      <AdminDashboardHeader headerText='Orders' content='Manage all orders here' />

      <TableTabs
        tableTabTitles={tabTitles}
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tableColumn={tableColumn}
        centerTable={true}
        tableData={tableData}
      />
    </div>
  )
}

export default Orders

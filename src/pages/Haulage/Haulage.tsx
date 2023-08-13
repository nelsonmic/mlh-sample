/* eslint-disable quotes */
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import AdminDashboardHeader from '../../components/AdminDashboardHeader'
import TableTabs from '../../components/TableTabs'
import { useTabTitles } from '../../hooks/table.hook'
import { capitalizeFirstLetter, convertToLowerSnakeCase } from '../../lib/utils.lib'
import { useGetHaulageOrders } from 'api/dashboard'
import { Status } from './Edit'
import { useOutletContext } from 'react-router-dom'
import { useRowData } from '.'

// const recentOrders = [
//   {
//     orderId: '814567',
//     itemsName: 'Electronics',
//     dateOrdered: '2/2/12',
//     estimatedValue: 'N3,000',
//     recipientName: 'Ifeanyi Okoro',
//     status: 'Successful',
//     carrierName: 'Mabel Rose',
//   },
//   {
//     orderId: '814567',
//     itemsName: 'Make up kit',
//     dateOrdered: '2/2/12',
//     estimatedValue: 'N3,000',
//     recipientName: 'Ifeanyi Okoro',
//     status: 'Canceled',
//     carrierName: 'Mabel Rose',
//   },
//   {
//     orderId: '814567',
//     itemsName: 'Cake Mixer',
//     dateOrdered: '2/2/12',
//     estimatedValue: 'N3,000',
//     recipientName: 'Ifeanyi Okoro',
//     status: 'Canceled',
//     carrierName: 'Mirabel Jones',
//   },
//   {
//     orderId: '814567',
//     itemsName: 'Headset',
//     dateOrdered: '2/2/12',
//     estimatedValue: 'N3,000',
//     recipientName: 'Ifeanyi Okoro',
//     status: 'Successful',
//     carrierName: 'Agnes Okafor',
//   },
// ]

export interface Order {
  orderId: number
  itemsName: string
  dateOrdered: string
  estimatedValue: string
  recipientName: string
  status: string
  carrierName: string
}

const Haulage = () => {
  const { setRowData } = useRowData()
  const { isLoading, data } = useGetHaulageOrders()
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
          cell: (info) => <Status status={capitalizeFirstLetter(info.getValue())} />,
        }),

        columnHelper.accessor('carrierName', {
          id: 'carrierName',
          header: () => 'Carrier Name',
        }),
      ]

      setTableColumn(columns)
      if (data) setTableData(data)
    } else {
      setTableColumn(null)
      setTableData(null)
    }
  }, [activeTab, data])

  return (
    <div className='orderContainer'>
      <AdminDashboardHeader headerText='Haulage' content='Manage Haulage here' />

      {!isLoading ? (
        <TableTabs
          tableTabTitles={tabTitles}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
          tableColumn={tableColumn}
          centerTable={true}
          tableData={tableData}
          setRowData={setRowData}
        />
      ) : (
        <p>Loading data</p>
      )}
    </div>
  )
}

export default Haulage

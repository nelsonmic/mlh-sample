import { createColumnHelper } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import AdminDashboardHeader from '../components/AdminDashboardHeader'
import TableTabs from '../components/TableTabs'
import { useTabTitles } from '../hooks/table.hook'
import { convertToLowerSnakeCase } from '../lib/utils.lib'

const allColumnData = [
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
]

const userColumnData = [
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'user',
  },
]

const businessOwnerColumnData = [
  {
    userId: 815646,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Business Owner',
  },
]

const riderColumnData = [
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
  {
    userId: 81456,
    email: 'emmanuel@gmail.com',
    dateJoined: '2/12/23',
    community: 'Rider',
  },
]

interface Order {
  userId: number
  email: string
  dateJoined: string
  community: string
}

const Waitlist = () => {
  const { tabTitles, activeTab, setActiveTab } = useTabTitles([
    'All',
    'User',
    'Business Owner',
    'Rider',
  ])
  const [tableData, setTableData] = useState<any>()

  const columnHelper = createColumnHelper<Order>()
  const columns = [
    columnHelper.accessor('userId', {
      id: 'userId',
      header: () => 'User Id',
    }),

    columnHelper.accessor('email', {
      id: 'email',
      header: () => 'Email',
    }),

    columnHelper.accessor('dateJoined', {
      id: 'dateJoined',
      header: () => 'Date Joined',
    }),

    columnHelper.accessor('community', {
      id: 'community',
      header: () => 'Community',
    }),
  ]

  useEffect(() => {
    const activeTabLowerCase = convertToLowerSnakeCase(activeTab)

    if (activeTabLowerCase === 'all') {
      setTableData(allColumnData)
    } else if (activeTabLowerCase === 'user') {
      setTableData(userColumnData)
    } else if (activeTabLowerCase === 'business_owner') {
      setTableData(businessOwnerColumnData)
    } else if (activeTabLowerCase === 'rider') {
      setTableData(riderColumnData)
    }
  }, [activeTab])

  return (
    <div className='spacing_section'>
      <AdminDashboardHeader headerText='Waitlist' content='Manage all waitlist subscribers' />

      <TableTabs
        activeTab={activeTab}
        tableTabTitles={tabTitles}
        changeActiveTab={setActiveTab}
        tableColumn={columns}
        tableData={tableData}
      />
    </div>
  )
}

export default Waitlist

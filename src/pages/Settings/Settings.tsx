import { createColumnHelper } from '@tanstack/react-table'
import useModal from 'hooks/modal.hook'
import { Add } from 'iconsax-react'
import { useEffect, useState } from 'react'
import AdminDashboardHeader from '../../components/AdminDashboardHeader'
import DropDown from '../../components/DropDown'
import Status from '../../components/Table/components/Status'
import { getStatusColor } from '../../components/Table/utils'
import TableTabs from '../../components/TableTabs'
import { useTabTitles } from '../../hooks/table.hook'
import { convertToLowerSnakeCase } from '../../lib/utils.lib'
import AddUserModal from './AddUserModal'

const systemUserData = [
  {
    firstName: 'Amara',
    lastName: 'Gbenga',
    phoneNumber: '09094738428',
    emailAddress: 'amaragbengag@ditosel.com',
    role: 'Super Admin'
  },
  {
    firstName: 'Amara',
    lastName: 'Gbenga',
    phoneNumber: '09094738428',
    emailAddress: 'amaragbengag@ditosel.com',
    role: 'admin'
  },
  {
    firstName: 'Amara',
    lastName: 'Gbenga',
    phoneNumber: '09094738428',
    emailAddress: 'amaragbengag@ditosel.com',
    role: 'admin'
  },
  {
    firstName: 'Amara',
    lastName: 'Gbenga',
    phoneNumber: '09094738428',
    emailAddress: 'amaragbengag@ditosel.com',
    role: 'admin'
  },
  {
    firstName: 'Amara',
    lastName: 'Gbenga',
    phoneNumber: '09094738428',
    emailAddress: 'amaragbengag@ditosel.com',
    role: 'admin'
  },
]

const roleConfigurationData = [
  {
    roleName: 'Admin',
    createdBy: 'Genga Williams',
    createdDate: '2/12/21',
    status: 'Active',
    updatedDate: '2/01/22'
  },

  {
    roleName: 'Super Admin',
    createdBy: 'Genga Williams',
    createdDate: '13/02/22',
    status: 'suspended',
    updatedDate: '3/02/22'
  },

]

const Settings = () => {
  const { modalOpened, closeModal, openModal } = useModal()

  // table data
  const { tabTitles, activeTab, setActiveTab } = useTabTitles(
    ['System Users', 'Role Configuration']
  )
  const [tableColumn, setTableColumn] = useState<any>()
  const [tableData, setTableData] = useState<object[]>([])


  //  creating  first columns
  const columnHelper = createColumnHelper<systemUserColumnType>()
  const systemUserColumn = [
    columnHelper.accessor('firstName', {
      id: 'firstName',
      header: () => 'First Name'
    }),

    columnHelper.accessor('lastName', {
      id: 'lastName',
      header: () => 'Last Name'
    }),

    columnHelper.accessor('phoneNumber', {
      id: 'phoneNumber',
      header: () => 'Phone Number'
    }),

    columnHelper.accessor('emailAddress', {
      id: 'emailAddress',
      header: () => 'Email Address'
    }),

    columnHelper.accessor('role', {
      id: 'role',
      header: () => 'Role'
    }),

    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: () => <DropDown>
        <li>Edit</li>
        <li>Disable</li>
        <li>Delete</li>
      </DropDown>
    })

  ]

  // creating second columns
  const roleConfigurationColumnHelper = createColumnHelper<roleConfigurationColumnType>()
  const roleConfigurationColumn = [
    roleConfigurationColumnHelper.accessor('roleName', {
      id: 'roleName',
      header: () => 'Role Name'
    }),

    roleConfigurationColumnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: () => 'Created By'
    }),

    roleConfigurationColumnHelper.accessor('createdDate', {
      id: 'createdDate',
      header: () => 'Created Date'
    }),

    roleConfigurationColumnHelper.accessor('status', {
      id: 'status',
      header: () => 'Status',
      cell: info => <Status text={info.getValue()} type={getStatusColor(info.getValue())} />
    }),

    roleConfigurationColumnHelper.accessor('updatedDate', {
      id: 'updatedDate',
      header: () => 'Updated Date'
    }),

    roleConfigurationColumnHelper.display({
      id: 'action',
      header: 'Action',
      cell: () => <DropDown>
        <li>Update</li>
        <li>Suspend</li>
      </DropDown>
    })
  ]

  useEffect(() => {
    // change table date depending on the active tab
    const activeTabLowerCase = convertToLowerSnakeCase(activeTab)
    if (activeTabLowerCase === 'system_users') {
      setTableColumn(systemUserColumn)
      setTableData(systemUserData)
    }
    if (activeTabLowerCase === 'role_configuration') {
      setTableColumn(roleConfigurationColumn)
      setTableData(roleConfigurationData)
    }
  }, [activeTab])

  return (
    <div className='spacing_section'>
      <AdminDashboardHeader
        headerText='System Settings'
        content='Assign roles to users here'
      />

      <TableTabs
        tableTabTitles={tabTitles}
        activeTab={activeTab}
        changeActiveTab={setActiveTab}
        tableColumn={tableColumn}
        tableData={tableData}
        buttonText='Add System User'
        handleButtonClicked={openModal}
        buttonIcon={<Add />} />

      <AddUserModal modalOpened={modalOpened} closeModal={closeModal} />
    </div>
  )
}

export default Settings

import React from 'react'
// import { tableRowPropType } from '../type'

const TableRow = ({ children, click }: { children: React.ReactNode; click?: any }) => {
  return (
    <tr onClick={click} className='hover:bg-grey-200 hover:cursor-pointer'>
      {children}
    </tr>
  )
}

export default TableRow

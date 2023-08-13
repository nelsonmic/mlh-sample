import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

const HaulageEntry = () => {
  const [rowData, setRowData] = React.useState()
  return (
    <main>
      <Outlet context={{ rowData, setRowData }} />
    </main>
  )
}

export const useRowData = () => {
  return useOutletContext<any>()
}

export default HaulageEntry

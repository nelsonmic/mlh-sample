import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import TableBody from './components/TableBody'
import TableHead from './components/TableHead'
import TableRow from './components/TableRow'
import TableWrapper from './components/TableWrapper'
import TableCell from './components/TableCell'

// styles
import styles from './index.module.scss'

import { tablePropType } from './type'
import { useNavigate } from 'react-router-dom'
import { Routes } from 'core/routing'

const Table = ({ columnsHeader, tableData, center, setRowData }: tablePropType) => {
  const navigate = useNavigate()
  const table = useReactTable({
    columns: columnsHeader,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  })

  if (!columnsHeader || !tableData) return null

  return (
    <TableWrapper>
      <table className={`${styles.table} ${center && styles.center}`}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell type='head' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              click={() => {
                setRowData(row.original)
                navigate(Routes.EditHaulage)
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>
    </TableWrapper>
  )
}

export default Table

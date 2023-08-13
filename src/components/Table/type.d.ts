type recentOrder = any

export type statusTextType = 'success' | 'error' | 'in_progress' | undefined

export type tablePropType = {
  columnsHeader: any[]
  tableData: recentOrder[]
  center?: boolean
  setRowData?: any
}

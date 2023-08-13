interface tableTabsType {
  tableTabTitles: string[]
  activeTab: string
  changeActiveTab: function
  tableColumn: any[]
  tableData: object[]
  centerTable?: boolean
  buttonText?: string
  handleButtonClicked?: () => void
  buttonIcon?: React.ReactNode
  setRowData?: any
}

import Table from '../Table'
import TableTab from './components/TableTab'
import styles from './style.module.scss'
import Button from '../Button'
import Pagination from '../Pagination'

const TableTabs = ({
  tableTabTitles,
  activeTab,
  centerTable,
  changeActiveTab,
  tableColumn,
  tableData,
  buttonText,
  buttonIcon,
  handleButtonClicked,
  setRowData,
}: tableTabsType) => {
  return (
    <div className={styles.tableTabs}>
      <div className={styles.tableTabHeader}>
        <div className={styles.tableTabTitles}>
          {tableTabTitles.map((tab, idx) => (
            <TableTab
              key={`tab-${idx}`}
              label={tab}
              count={10}
              isActive={activeTab === tab}
              changeActiveTab={() => changeActiveTab(tab)}
            />
          ))}
        </div>
        {buttonText && (
          <Button onClick={handleButtonClicked} text={buttonText} RightIcon={buttonIcon} />
        )}
      </div>
      <Table
        setRowData={setRowData}
        columnsHeader={tableColumn}
        tableData={tableData}
        center={centerTable}
      />
      <Pagination />
    </div>
  )
}

export default TableTabs

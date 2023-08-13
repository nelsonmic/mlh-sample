import styles from './style.module.scss'

const TableTab = ({ label, count, isActive, changeActiveTab }: tableTabType) => {

    return (
        <button className={`${styles.tableTabTitle} ${isActive && styles.active}`} onClick={changeActiveTab}>
            {label} ({count})
        </button>
    )
}

export default TableTab
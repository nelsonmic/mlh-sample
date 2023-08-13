import React from 'react'
import { tableHeaderPropType } from '../type'
import styles from './index.module.scss'

const TableHead = ({ children }: tableHeaderPropType) => {
    return (
        <thead className={styles.table_head}>
            {children}
        </thead>
    )
}

export default TableHead
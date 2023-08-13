import React from 'react'
import { tableWrapperPropType } from '../type'
import styles from './index.module.scss'

const TableWrapper = ({ children }: tableWrapperPropType) => {
    return (
        <div className={styles.overflow_wrapper}>
            {children}
        </div>
    )
}

export default TableWrapper
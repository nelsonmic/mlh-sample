import React from 'react'
import styles from './style.module.scss'

interface Props {
    children: React.ReactNode
    opened: boolean
}

const Overlay = ({ children, opened }: Props) => {
    return (
        <div className={`${styles.overlay} ${opened ? styles.opened : ''}`}>
            {children}
        </div>
    )
}

export default Overlay
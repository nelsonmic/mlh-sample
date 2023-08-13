import React, { ReactElement, useState } from 'react'
import styles from './style.module.scss'

interface dropDownPropType {
    children: ReactElement<HTMLLIElement>[] | ReactElement<HTMLLIElement>
}

const DropDown = ({ children }: dropDownPropType) => {
    const [opened, setOpened] = useState(false)

    return (
        <div className={styles.dropdown}>
            <button className={styles.three_btns} onClick={() => setOpened(!opened)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`${styles.dropdown_content} ${opened && styles.show}`}>
                {children}
            </ul>
        </div>
    )
}

export default DropDown
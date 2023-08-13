import React from 'react'
import ButtonLeft from '../PaginationButtons/ButtonLeft'
import ButtonRight from '../PaginationButtons/ButtonRight'
import styles from './style.module.scss'

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <ButtonLeft isDisabled />
      <ul>
        <li className={styles.active}>1</li>
        <li>2</li>
      </ul>
      <ButtonRight />
    </div>
  )
}

export default Pagination
import ButtonLeft from 'components/PaginationButtons/ButtonLeft'
import ButtonRight from 'components/PaginationButtons/ButtonRight'
import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.order_header}>
      <h2 className='font-medium text-4xl'>Recent Orders</h2>
      <div className={styles.flex}>
        <button className={styles.see_all_btn}>See All</button>
        <div className={styles.pagination_btns}>
          <ButtonLeft isDisabled={true} />
          <ButtonRight />
        </div>
      </div>
    </div>
  )
}

export default Header

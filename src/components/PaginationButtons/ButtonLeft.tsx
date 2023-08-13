import { ArrowLeft2 } from 'iconsax-react'
import styles from './buttonsStyle.module.scss'
import { paginationButtonPropType } from './type'

const ButtonLeft = ({ isDisabled }: paginationButtonPropType) => {
    return (
        <button className={`${styles.arrow_left} ${isDisabled && styles.disabled}`}>
            <ArrowLeft2 />
        </button>
    )
}

export default ButtonLeft
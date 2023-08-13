import { ArrowRight2 } from 'iconsax-react'
import styles from './buttonsStyle.module.scss'
import { paginationButtonPropType } from './type'

const ButtonRight = ({ isDisabled }: paginationButtonPropType) => {
    return (
        <button className={`${styles.arrow_right} ${isDisabled && styles.disabled}`}>
            <ArrowRight2 />
        </button>
    )
}

export default ButtonRight
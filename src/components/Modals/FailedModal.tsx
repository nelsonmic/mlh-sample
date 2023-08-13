import { RxCross1 } from 'react-icons/rx'
import SadIllustration from '../../assets/icons/sad.svg'
import styles from './style.module.scss'



const FailedModal = ({ description, closeModal }: SharedModalProps) => {
    return (
        <div className={`${styles.modal}`}>
            <button onClick={closeModal}>
                <RxCross1 />
            </button>
            <img src={SadIllustration} alt="sad illustration" />
            <p>{description}</p>
        </div>
    )
}

export default FailedModal
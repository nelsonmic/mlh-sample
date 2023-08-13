import { RxCross1 } from 'react-icons/rx'
import VerifyIllustration from '../../assets/icons/verified.svg'
import styles from './style.module.scss'



const SuccessModal = ({ description, closeModal }: SharedModalProps) => {
    return (
        <div className={`${styles.modal}`}>
            <button onClick={closeModal}>
                <RxCross1 />
            </button>
            <img src={VerifyIllustration} alt="Verify illustration" />
            <p>{description}</p>
        </div>
    )
}

export default SuccessModal
import styles from './style.module.scss'

const Button = ({ text, LeftIcon, RightIcon, center, fullWidth, ...props }: buttonType) => {
    return (
        <button className={`${styles.btn} ${center ? styles.center : ''} ${fullWidth ? styles.full_width : ''}`} {...props}>
            {LeftIcon && LeftIcon}
            {text}
            {RightIcon && RightIcon}
        </button>
    )
}

export default Button
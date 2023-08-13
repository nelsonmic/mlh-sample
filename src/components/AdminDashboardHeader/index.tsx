import { adminDashboardHeaderType } from './type'
import styles from './style.module.scss'

const AdminDashboardHeader = ({ headerText, content }: adminDashboardHeaderType) => {
    return (
        <section className={styles.dashboardHeader}>
            <h1>{headerText}</h1>
            <p>{content}</p>
        </section>
    )
}

export default AdminDashboardHeader
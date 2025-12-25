import styles from '../styles/Header.module.css'

import favicon from '../assets/favicon.svg'

export default function Header(){
    return(
        <>
            <div className={styles.container}>

                <div className={styles.logoContainer}>
                    <img src={favicon} alt="Kanban Manager" />
                    <p>Kanban Manager</p>
                </div>

            </div>
        </>
    )
}
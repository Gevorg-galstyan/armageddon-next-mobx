import React, {useContext} from "react";
import {distanceContext} from "../../../stores/cometStore";
import Link from "next/link";
import styles from '../../../assets/css/header.module.css';
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {forDestroy} = useContext(distanceContext)

    return (
        <header>
            <nav className={`container ${styles.headerContainer}`}>
                <Link href="/">
                    <a className={`${styles.logo} navbar-brand`}>
                        <h1 className={styles.generalHeading}>ARMAGGEDON V</h1>
                        <p className={styles.pageDescription}>Сервис мониторинга и уничтожения астероидов, опасно
                            подлетающих к Земле.</p>
                    </a>
                </Link>


                <div className={'navbarNav'}>

                        <Link href={'/'}>
                            <a className={styles.navLink}>
                                Астероиды
                            </a>
                        </Link>
                        <Link
                            href={'/destroy'}
                        >
                            <a className={styles.navLink}>
                                <div className={styles.destruct}>
                                    Уничтожение
                                    {forDestroy.size > 0 && <span>{forDestroy.size}</span>}
                                </div>
                            </a>

                        </Link>
                </div>
            </nav>
        </header>
    )
})

export default Header

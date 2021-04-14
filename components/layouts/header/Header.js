import React, {useContext} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {distanceContext} from "../../../stores/cometStore";
import Link from "next/link";
import styles from '../../../assets/css/header.module.css';
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {forDestroy} = useContext(distanceContext)

    return (
        <header>
            <Navbar bg="transparent" expand="lg" className={`container ${styles.headerContainer}`}>
                <Link href="/">
                    <a className={`${styles.logo} navbar-brand`}>
                        <h1 className={styles.generalHeading}>ARMAGGEDON V</h1>
                        <p className={styles.pageDescription}>Сервис мониторинга и уничтожения астероидов, опасно
                            подлетающих к Земле.</p>
                    </a>
                </Link>


                <Navbar.Collapse className={'show'} id="basic-navbar-nav">
                    <Nav className={`${styles.headerNavLinks} ml-auto`}>
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
})

export default Header

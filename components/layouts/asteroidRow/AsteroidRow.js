import React, {useContext} from "react";
import {distanceContext} from "../../../stores/cometStore";
import {fractional} from "../../../helpers/utils";
import {observer} from "mobx-react-lite";
import Link from "next/link";
import styles from "../../../assets/css/asteroid.module.css";

const AsteroidRow = observer(({asteroid, date, destroy}) => {

    const {distance, onlyDangers, forDestroy, addToDestroy} = useContext(distanceContext)

    const name = asteroid.name.match('\\((.*?)\\)')[1];
    const width = asteroid.estimated_diameter.meters.estimated_diameter_min <= 85 ? 85 : asteroid.estimated_diameter.meters.estimated_diameter_min

    if (onlyDangers && !asteroid.is_potentially_hazardous_asteroid) {
        return false
    }
    return (
        <div
            className={`${styles.asteroidContainer} 
            ${asteroid.is_potentially_hazardous_asteroid ? styles.dangerAsteroid : styles.dontDangerAsteroid} 
            align-items-center position-relative mb-3 load-after-scroll row`}>

            <div className={'h-100 align-self-end col-lg position-lg-relative'}>
                <Link href={`/asteroid/[id]`} as={`/asteroid/${asteroid.id}`} >
                    <a className={'text-decoration-none'}>
                        <div className={styles.asteroidImage}>
                            <img src={'/img/asteroid.svg'} alt="" width={width}
                                 className={width > 200 ? styles.bottom0 : styles.bottom25}/>
                        </div>
                        <div className={styles.dinosaur}>
                            <img src={'/img/dinosaur.png'} alt=""/>
                        </div>
                    </a>
                </Link>
            </div>
            <div className={'col-lg'}>
                <Link href={`/asteroid/[id]`} as={`/asteroid/${asteroid.id}`}>
                    <a className={'text-decoration-none'}>
                        <h2 className={styles.asteroidName}>{name}</h2>

                        <ul className={styles.asteroidParams}>
                            {date &&
                            <li>
                                <span>????????</span>
                                <span>{date}</span>
                            </li>
                            }
                            <li>
                                <span>????????????????????</span>
                                <span>{fractional(Math.round(distance ? asteroid.close_approach_data[0].miss_distance.kilometers : asteroid.close_approach_data[0].miss_distance.lunar))} {distance ? '????' : "????????????"}</span>
                            </li>
                            <li>
                                <span>????????????</span>
                                <span>{Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min)} ??</span>
                            </li>
                        </ul>
                    </a>
                </Link>
            </div>
            <div className={'col-lg'}>
                <div className={styles.dangerRating}>
                    <p className={'m-0'}>????????????:</p>
                    <span>{asteroid.is_potentially_hazardous_asteroid ? "????????????" : '???? ????????????'}</span>
                </div>
                <div className={'text-center'}>
                    {
                        destroy ?
                            <button
                                className={`${styles.toDestroy} btn btn-primary`}
                                onClick={() => addToDestroy(asteroid.id)}
                            >
                                ????????????????????
                            </button> :
                            <button
                                className={`${styles.toDestroy} btn btn-primary`}
                                onClick={() => addToDestroy(asteroid.id)}
                                disabled={forDestroy.has(asteroid.id)}
                            >
                                {forDestroy.has(asteroid.id) ? '?? ????????????' : "???? ??????????????????????"}
                            </button>
                    }

                </div>

            </div>
        </div>
    );
});

export default AsteroidRow;

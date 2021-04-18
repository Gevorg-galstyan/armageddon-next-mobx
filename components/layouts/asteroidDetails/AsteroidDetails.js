import {useState} from "react";
import {dateFormat, fractional} from "../../../helpers/utils";
import style from '../../../assets/css/single.module.css';
import styles from '../../../assets/css/asteroid.module.css';


const AsteroidDetails = ({asteroid}) => {
    const [tableShow, setTableShow] = useState(true)

    return (
        <div className={'mt-4 row'}>
            <div className={'d-flex flex-wrap w-100 mb-3'}>
                <h3 className={'m-0'}>Список всех сближений</h3>
                <div className={'d-flex ml-auto align-items-center'}>
                    <input
                        type="checkbox"
                        id={'showTable'}
                        onChange={() => setTableShow(!tableShow)}
                    />
                    <label htmlFor="showTable" className={'m-0 ml-2'}>Смотреть в {tableShow ? "списке" : 'таблице'}</label>
                </div>
            </div>

            {
                !tableShow &&
                <div className={'w-100'}>
                    {
                        asteroid.close_approach_data.map(e => {
                            return (
                                <div key={e.epoch_date_close_approach} className={'mb-2 border-bottom'}>
                                    <h2 className={'p-0 bg-transparent'}>
                                        <div className={style.accordionBtn}>
                                                <span className={style.caption}>ГОД - {dateFormat(e.close_approach_date)}</span>
                                        </div>
                                    </h2>
                                    <div>
                                        <div>
                                            <ul className={styles.asteroidParams}>
                                                <li>
                                                    <span>Скорость полёта</span>
                                                    <span>{fractional(Math.round(e.relative_velocity.kilometers_per_hour))} км/ч</span>
                                                </li>
                                                <li>
                                                    <span>Расстояние до земли</span>
                                                    <span>{fractional(Math.round(e.miss_distance.kilometers))} км</span>
                                                </li>
                                                <li>
                                                    <span>Орбита </span>
                                                    <span>{e.orbiting_body}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                tableShow &&
                <table className={'table-dark table-striped table table-bordered'}>
                    <thead className={style.stickyHead}>
                    <tr>
                        <th>ГОД</th>
                        <th>Скорость полёта</th>
                        <th>Расстояние до земли</th>
                        <th>Орбита</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        asteroid.close_approach_data.map(e => {
                            return (
                                <tr key={e.epoch_date_close_approach}>
                                    <td>{dateFormat(e.close_approach_date)}</td>
                                    <td>{fractional(Math.round(e.relative_velocity.kilometers_per_hour))} км/ч</td>
                                    <td>{fractional(Math.round(e.miss_distance.kilometers))} км</td>
                                    <td>{e.orbiting_body}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>}
        </div>
    );
};

export default AsteroidDetails;

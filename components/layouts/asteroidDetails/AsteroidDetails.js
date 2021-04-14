import {useState} from "react";
import {Accordion, Card, Row, Table} from "react-bootstrap";
import {dateFormat, fractional} from "../../../helpers/utils";
import style from '../../../assets/css/single.module.css';
import styles from '../../../assets/css/asteroid.module.css';


const AsteroidDetails = ({asteroid}) => {
    const [tableShow, setTableShow] = useState(true)

    return (
        <Row className={'justify-content-center mt-4'}>
            <h3 className={'mb-3'}>Список всех сближений</h3>
            <div className={'d-flex align-items-center  w-100 mb-3'}>
                <input
                    type="checkbox"
                    id={'showTable'}
                    onChange={() => setTableShow(!tableShow)}
                />
                <label htmlFor="showTable" className={'m-0 ml-2'}>Смотреть в {tableShow ? "списке" : 'таблице'}</label>
            </div>
            {
                !tableShow &&
                <Accordion className={'w-100'}>
                    {
                        asteroid.close_approach_data.map(e => {
                            return (
                                <Card key={e.epoch_date_close_approach} className={'mb-2 border-bottom'}>
                                    <Card.Header className={'p-0 bg-transparent'}>
                                        <Accordion.Toggle variant="link"
                                                          eventKey={e.epoch_date_close_approach}
                                                          className={style.accordionBtn}>
                                                <span
                                                    className={style.caption}>ГОД - {dateFormat(e.close_approach_date)}</span>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={e.epoch_date_close_approach}>
                                        <Card.Body>
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
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })
                    }
                </Accordion>
            }
            {
                tableShow &&
                <Table striped bordered hover variant="dark">
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
                </Table>}
        </Row>
    );
};

export default AsteroidDetails;

import React, {useContext} from 'react';
import Distance from "../distance/Distance";
import {distanceContext} from "../../../stores/cometStore";
import {observer} from "mobx-react-lite";

const OnlyDangers = observer(() => {

    const {changeDangerFilter} = useContext(distanceContext)

    return (
        <Row className={'filters'}>
            <Col className={'mr-auto p-0'} lg>
                <input
                    type="checkbox"
                    id={'onlyDanger'}
                    onChange={changeDangerFilter}
                />
                <label htmlFor={'onlyDanger'} className={'m-0'}>Показать только опасные</label>
            </Col>
            <Distance />
        </Row>
    );
});

export default OnlyDangers;

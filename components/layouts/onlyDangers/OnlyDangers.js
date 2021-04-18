import React, {useContext} from 'react';
import Distance from "../distance/Distance";
import {distanceContext} from "../../../stores/cometStore";
import {observer} from "mobx-react-lite";

const OnlyDangers = observer(() => {

    const {changeDangerFilter} = useContext(distanceContext)

    return (
        <div className={'filters row'}>
            <div className={'mr-auto p-0 col-lg'}>
                <input
                    type="checkbox"
                    id={'onlyDanger'}
                    onChange={changeDangerFilter}
                />
                <label htmlFor={'onlyDanger'} className={'m-0'}>Показать только опасные</label>
            </div>
            <Distance />
        </div>
    );
});

export default OnlyDangers;

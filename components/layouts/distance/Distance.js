import React, {useContext} from "react";
import {distanceContext} from "../../../stores/cometStore";
import {observer} from "mobx-react-lite";
import {action} from "mobx";

const Distance = observer(() => {

    const distance = useContext(distanceContext);

    return (
        <div className={'ml-auto p-0 mt-lg-0 mt-3 col-lg'}>
            <div className={'d-flex align-items-center justify-content-end flex-wrap filterDistance'}>
                <div className={'singleFilterContainer'}>
                    <span>Расстояние</span>
                    <input
                        type="radio"
                        name={'distance'}
                        id={'kmDistance'}
                        className={'distanceRadio d-none'}
                        onChange={action(distance.changeDistance)}
                        checked={distance.distance}
                    />
                    <label htmlFor="kmDistance" className={'distanceLabel m-0 mx-1'}>
                        в километрах,
                    </label>
                </div>
                <div className={'singleFilterContainer'}>
                    <input
                        type="radio"
                        name={'distance'}
                        id={'luneDistance'}
                        className={'distanceRadio d-none'}
                        onChange={action(distance.changeDistance)}
                        checked={!distance.distance}
                    />
                    <label htmlFor="luneDistance" className={'distanceLabel m-0'}>
                        в дистанциях до луны
                    </label>
                </div>

            </div>
        </div>

    )
})

export default Distance

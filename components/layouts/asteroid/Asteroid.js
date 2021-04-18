import React, {useState} from "react";
import {dateFormat} from "../../../helpers/utils";
import AsteroidRow from '../asteroidRow/AsteroidRow';
import OnlyDangers from "../onlyDangers/OnlyDangers";

const Asteroid = ({asteroids, cometNum}) => {

    let content = [], date;
    for (const key in asteroids) {
        date = dateFormat(key)
        asteroids[key].map(single => content.push(single))
    }
    console.log(cometNum)
    return (
        <>
            <OnlyDangers/>
            { content.slice(0, cometNum).map(e => <AsteroidRow key={e.id} asteroid={e} date={date}/>) }
        </>
    );
}

export default Asteroid;

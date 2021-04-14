import React from "react";
import {dateFormat} from "../../../helpers/utils";
import AsteroidRow from '../asteroidRow/AsteroidRow';
import OnlyDangers from "../onlyDangers/OnlyDangers";

const Asteroid = ({asteroids}) => {
    let content = [];

    for (const key in asteroids) {
        const date = dateFormat(key)
        const singleAsteroid = asteroids[key].map(single => <AsteroidRow key={single.id} asteroid={single} date={date}/>)
        content.push(singleAsteroid)
    }


    return (
        <>
            <OnlyDangers/>
            {content}
        </>
    );
}

export default Asteroid;

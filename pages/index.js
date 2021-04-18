import MainContainer from "../components/MainContainer";
import Asteroid from "../components/layouts/asteroid/Asteroid";
import React, {useContext, useEffect, useState} from "react";
import {request} from "../helpers/request";
import {observer} from "mobx-react-lite";
import {distanceContext} from "../stores/cometStore";

const Index = observer(({serverComets}) => {
    const [asteroids, setAsteroids] = useState(serverComets ? {...serverComets.near_earth_objects} : null);
    const {cometNum, setCometNum} = useContext(distanceContext);

    useEffect(() => {
        const load = async () => {
            setAsteroids(null)
            const asteroids = await request(new Date())
            setAsteroids({...asteroids.near_earth_objects})
        }
        !asteroids && load()
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    const handleScroll = () => {
        const lastComet = document.querySelector(
            ".load-after-scroll:last-child"
        )
        if (lastComet) {
            const lastUserLoadedOffset = lastComet.offsetTop + lastComet.clientHeight,
                pageOffset = window.pageYOffset + window.innerHeight;

            if (pageOffset > lastUserLoadedOffset) {
                setCometNum(cometNum + 10)
            }
        }
    }

    return (
        <MainContainer title={'Астероиды'} description={"Страница показа всех астероидов"}>
            {!asteroids ? "Loading..." : <Asteroid asteroids={asteroids} cometNum={cometNum}/>}
        </MainContainer>
    );
});


Index.getInitialProps = async ({req}) => {
    if (!req) {
        return {serverComets: null}
    }
    const serverComets = await request(new Date())
    return {serverComets};
}


export default Index;

import MainContainer from "../components/MainContainer";
import Asteroid from "../components/layouts/asteroid/Asteroid";
import { useEffect, useState} from "react";
import { request } from "../helpers/request";
import {observer} from "mobx-react-lite";

const Index = observer(({serverComets}) => {
    const [asteroids, setAsteroids] = useState(serverComets ? {...serverComets.near_earth_objects} : null);

    useEffect(() => {
        const load = async () => {
            const asteroids = await request(new Date())
            setAsteroids({...asteroids.near_earth_objects})
        }
        !asteroids && load()

    }, [])


    return (
        <MainContainer title={'Астероиды'} description={"Страница показа всех астероидов"}>
            {!asteroids ?  "Loading..." : <Asteroid asteroids={asteroids}/>}
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

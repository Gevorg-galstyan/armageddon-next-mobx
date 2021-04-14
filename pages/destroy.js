import MainContainer from "../components/MainContainer";
import Link from "next/link";
import AsteroidRow from "../components/layouts/asteroidRow/AsteroidRow";
import OnlyDangers from "../components/layouts/onlyDangers/OnlyDangers";
import {distanceContext} from "../stores/cometStore";
import {Button, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {request} from "../helpers/request";
import {observer} from "mobx-react-lite";
import styles from '../assets/css/asteroid.module.css';

const Destroy = observer(({serverComets}) => {
    const video = "/video/bruce.mp4";
    const {filteredAsteroids, filterAsteroids, destroyAll} = useContext(distanceContext);
    const [playVideo, setPlayVideo] = useState('')

    useEffect(() => {
        serverComets && filterAsteroids(serverComets.near_earth_objects);

        const load = async () => {
            const allAsteroids = await request(new Date());
            filterAsteroids(allAsteroids.near_earth_objects)
        }

        !serverComets && load()
    }, [])

    const handleDeleteAll = ()=>{
        setPlayVideo(video)
        destroyAll()
    }

    return (
        <MainContainer title={"Destroy Asteroids"}>
            <OnlyDangers/>
            {!filteredAsteroids ? "Loading..." : filteredAsteroids.map(e => <AsteroidRow key={e.id} asteroid={e}
                                                                                         date={e.date} destroy/>)}
            {filteredAsteroids.length > 0 &&
            <Row>
                <Button
                    className={`${styles.toDestroyAll} btn btn-primary`}
                    onClick={()=>handleDeleteAll()}
                >
                    заказать бригаду Брюса
                </Button>
            </Row>
            }

            {
                playVideo &&
                <>
                    <div className={'backLink'}><span className={'color-white'}>
                        Видео автоматически закроется после завершения, или можете нажать</span>
                        <Link href={'/'}><a>На главную</a></Link>
                    </div>
                    <video id={'videoPlayer'} controls autoPlay onEnded={() => setPlayVideo('')}>
                        <source src={playVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </>
            }
        </MainContainer>
    );
});


Destroy.getInitialProps = async ({req}) => {
    if (!req) {
        return {serverComets: null}
    }
    const serverComets = await request(new Date())
    return {serverComets};
}

export default Destroy;


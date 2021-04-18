import MainContainer from "../../components/MainContainer";
import AsteroidRow from "../../components/layouts/asteroidRow/AsteroidRow";
import {request} from "../../helpers/request";
import {useEffect, useState} from "react";
import {useRouter}  from "next/router";
import OnlyDangers from "../../components/layouts/onlyDangers/OnlyDangers";
import AsteroidDetails from "../../components/layouts/asteroidDetails/AsteroidDetails";

const AsteroidSingle = ({serverComet}) => {

    const [asteroid, setAsteroid] = useState(serverComet ? {...serverComet} : null);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const singleAsteroid = await request(null, router.query.id)
            setAsteroid({...singleAsteroid})
        }
        !asteroid && load()
    }, [])
    return (
        <MainContainer title={asteroid && asteroid.name}>
            <OnlyDangers/>
            {!asteroid ? "Loading..." :
                (
                    <>
                        <AsteroidRow asteroid={asteroid}  />
                        <AsteroidDetails asteroid={asteroid} />
                    </>
                )
            }

        </MainContainer>
    );
};


AsteroidSingle.getInitialProps = async ({req, query}) => {
    if (!req) {
        return {serverComet: null}
    }
    const serverComet = await request(null, query.id)
    return {serverComet};
}


export default AsteroidSingle;

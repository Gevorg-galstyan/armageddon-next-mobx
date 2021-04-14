import '../assets/css/global.css';
import {distanceContext, cometParams} from '../stores/cometStore';

function MyApp({ Component, pageProps }) {
    return (
        <distanceContext.Provider value={cometParams}>
            <Component {...pageProps} />
        </distanceContext.Provider>
        )

}

export default MyApp

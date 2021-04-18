import React from "react";
import Head from "next/head";
import Navigation from "./layouts/header/Header";
import {Container} from "react-bootstrap";
import Footer from "./layouts/footer/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';

const MainContainer = ({children, description,keywords, title}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={'description'} content={description} />
                <meta name={'keywords'} content={keywords} />
                <link rel="icon" href="/img/asteroid.svg" />
            </Head>

            <Navigation />

            <Container>
                { children }
            </Container>

            <Footer/>
        </>
    );
};

export default MainContainer;

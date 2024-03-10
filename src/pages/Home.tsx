import Hero from "../components/Hero";
import Onas from "../components/Onas";
import Faq from "../components/FAQ";
import Kontakt from "../components/Kontakt";
import Nav from "../components/Nav";
import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        const storageAnswersString = localStorage.getItem('answers');
        if (storageAnswersString) {
            localStorage.removeItem('answers');
        }
    }, []);
    return (
        <>
            <Nav />
            <Hero />
            <Onas />
            <Faq />
            <Kontakt />
        </>
    )
}

export default Home;

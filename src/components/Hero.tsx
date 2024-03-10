import "../styles/hero.scss";
import { Link } from "react-router-dom";


const Hero = () => {
    return (
        <section className="section hero" id="Hero">
            <div className="hero__info">
                <h1><span>Sprawdź <br/></span>Swoje Poglądy</h1>

                <h3> Odpowiedz na kilka pytań i przekonaj się,
                    do kogo jest Ci najbliżej w wyborach
                    parlamentarnych 2023 roku.
                </h3>
                <Link to="/Form"><button className="hero_button">Rozpocznij test</button></Link>
            </div>
        </section>
    )
}

export default Hero;
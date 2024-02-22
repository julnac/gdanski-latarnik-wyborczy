import "../styles/hero.scss";

const Hero = () => {
    return (
        <section className="section hero" id="Home">
            <div className="hero__info">
                <h1><span>Sprawdź </span>swoje poglądy</h1>

                <h3> Odpowiedz na kilka pytań i przekonaj się,
                    do kogo jest Ci najbliżej w wyborach
                    parlamentarnych 2023 roku.
                </h3>

                <a href="#Test"><button className="button">Rozpocznij test</button></a>
            </div>
        </section>
    )
}

export default Hero;
import { Link } from "react-router-dom";
import "../styles/wynik.scss";

const Wynik = () => {
    return (
        <section className="section wynik" id="Wynik">
            <div className="nawigacja">
                <div className="logo">
                    <a href="#Hero">Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/"><button className="button">Wróć do strony</button></Link>
            </div>
            <div className="ankieta__karuzela"></div>
        </section>
    )
}

export default Wynik;
import "../styles/ankieta.scss";
import { Link } from "react-router-dom";


const Ankieta = () => {
    
    return (
        <section className="section ankieta" id="Ankieta">
            <div className="nawigacja">
                <div className="logo">
                    <a href="#Hero">Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/"><button className="button">Wróć do strony</button></Link>
            </div>
            <div className="ankieta__karuzela">
                <div className="slajd">
                    <div className="noglowek">
                        <div className="tytul"><h3>Stwierdzenie:xx</h3></div>
                        <div className="wyjasnienie">
                            <button>Wyjaśnienie stwierdzenia</button>
                        </div>
                    </div>
                    <div className="slajd__stwierdzenie">
                        <h3>Należy zwiększyć transfery społeczne, by ograniczyć skutki inflacji dla obywateli.</h3>
                    </div>
                    <div className="slajd__odpowiedzi">
                        <button className="button__secondary">Zgadzam się</button>
                        <button className="button__secondary">nie zgadzam się</button>
                        <button className="button__secondary">nie mam zdania</button>
                    </div>
                    <div className="slajd__waga">
                        <div className="slajd__waga-pytanie">
                            Czy ta kwestia jest dla Ciebie bardzo ważna?
                        </div>
                        <div className="slajd__waga-odpowiedzi">
                            <button className="button__secondary">tak</button>
                            <button className="button__secondary">nie</button>
                        </div>
                    </div>
                </div>
                <div className="stronicowanie">
                    <button className="button__secondary">1</button>
                    <button className="button__secondary">2</button>
                    <button className="button__secondary">3</button>
                    <button className="button__secondary">4</button>
                    <button className="button__secondary">5</button>
                    <button className="button__secondary">6</button>
                    <button className="button__secondary">7</button>
                    <button className="button__secondary">8</button>
                    <button className="button__secondary">9</button>
                    <button className="button__secondary">10</button>
                </div>
            </div>
        </section>
    )
}

export default Ankieta;
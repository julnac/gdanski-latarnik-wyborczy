import "../styles/kontakt.scss";
import { Link } from "react-router-dom";
import mewa from "../assets/mewa1.png";


const Kontakt = () => {
    return (
        <section className="section kontakt" id="Kontakt">
            <div className="kontakt__info">
                <h2>KONTAKT</h2>
                <h1>Kontakt</h1>
                <Link to="/Form"><button className="button">Rozpocznij test</button></Link>
            </div>
            <img className="mewa" src={mewa} alt="mewa"/>
            <footer>
                <p>Info</p>
                <p>Info prawne</p>
                <p>Sociale</p>
            </footer>
            
        </section>
    )
}

export default Kontakt;
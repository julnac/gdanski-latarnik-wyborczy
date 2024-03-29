import "../styles/kontakt.scss";
// import { Link } from "react-router-dom";
import mewa from "../assets/mewa1.png";


const Kontakt = () => {
    return (
        <section className="section kontakt" id="Kontakt">
            <div className="kontakt__info">
                <h2>KONTAKT</h2>
                <p>Gdańskie Forum Samorządowe</p>
                <p>tel. xxx xxx xxx</p>
                <p>e-mail: xxx@xxx</p>
                
                {/* <Link to="/Form"><button className="button">Rozpocznij test</button></Link> */}
            </div>
            <img className="mewa" src={mewa} alt="mewa"/>
            <footer>
                <p>Info</p>
                <p>Info prawne</p>
                <a href="https://www.facebook.com/stronagfs?locale=pl_PL"><p>Facebook</p></a>
            </footer>
            
        </section>
    )
}

export default Kontakt;
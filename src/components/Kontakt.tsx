import "../styles/kontakt.scss";
// import { Link } from "react-router-dom";
import mewa from "../assets/mewa1.png";
import logo from "../assets/logo-gfs.png"


const Kontakt = () => {
    return (
        <section className="section kontakt" id="Kontakt">
            <div className="kontakt__info">
                <h2>KONTAKT</h2>
                <p>Gdańskie Forum Samorządowe</p>
                <p>e-mail: gdanskieforumsamorzadowe@gmail.com</p>
                <a href="https://www.facebook.com/stronagfs?locale=pl_PL"><p>Facebook</p></a>
                
                {/* <Link to="/Form"><button className="button">Rozpocznij test</button></Link> */}
            </div>
            <div className="kontakt__logo">
                <img className="logo" src={logo} alt="logo"/>
            </div>
            <img className="mewa" src={mewa} alt="mewa"/>
            <footer>
                <p>Info prawne</p>
            </footer>
            
        </section>
    )
}

export default Kontakt;
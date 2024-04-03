import "../styles/kontakt.scss";
// import { Link } from "react-router-dom";
import mewa from "../assets/mewa1.png";
import logo from "../assets/logo-gfs.png"
import faceb from "../assets/fb-blue.png"


const Kontakt = () => {
    return (
        <section className="section kontakt" id="Kontakt">
            <div className="kontakt__info">
                <h2>KONTAKT</h2>
                <p>Gdańskie Forum Samorządowe</p>
                <p>e-mail: gdanskieforumsamorzadowe@gmail.com</p>
                <div className="fb">
                    <img src={faceb} alt="fb"/>  
                    <a href="https://www.facebook.com/stronagfs?locale=pl_PL" target="_blank"><p>Facebook</p></a>
                </div>
            </div>
            <div className="kontakt__logo">
                <img className="logo" src={logo} alt="logo"/>
            </div>
            <img className="mewa" src={mewa} alt="mewa"/>
            <footer>
                <p>Administratorem danych jest GFS</p>
            </footer>
            
        </section>
    )
}

export default Kontakt;
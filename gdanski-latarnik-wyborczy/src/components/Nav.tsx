import { Link } from "react-router-dom";
import "../styles/nav.scss";

const Nav = () => {
    return (
        <nav id="nav">
            <div className="logo">
                <a href="#Hero">Gdański Latarnik Wyborczy</a>
            </div>
            <ul>
                <li><a href="#Onas">O latarniku</a></li>
                <li><a href="#Faq">FAQ</a></li>
                <li><a href="#Twórcy">Twórcy</a></li>
                <li><a href="#Kontakt">Kontakt</a></li>
            </ul>
            <Link to="/Ankieta"><button className="button">Rozpocznij test</button></Link>
        </nav>
    )
}

export default Nav;
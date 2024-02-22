import { Link } from "react-router-dom";
import "../styles/nav.scss";

const Nav = () => {
    return (
        <nav id="nav">
            <div className="logo">
                <a href="#Home">Gdański Latarnik Wyborczy</a>
            </div>
            <ul>
                <li><Link to="/"><a href="#Onas">O latarniku</a></Link></li>
                <li><a href="#Faq">FAQ</a></li>
                <li><a href="#Twórcy">Twórcy</a></li>
                <li><a href="#Kontakt">Kontakt</a></li>
            </ul>
            <Link to="/Ankieta"><button className="button">Rozpocznij test</button></Link>
        </nav>
    )
}

export default Nav;
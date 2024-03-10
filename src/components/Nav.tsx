import { Link } from "react-router-dom";
import "../styles/nav.scss";
import logo from "../assets/vote.png";

const Nav = () => {
    return (
        <nav id="nav">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <a href="#Hero">Gdański Latarnik Wyborczy</a>
            </div>
            <div className="options">
                <ul>
                    <li><a href="#Onas">O latarniku</a></li>
                    <li><a href="#Faq">FAQ</a></li>
                    <li><a href="#Twórcy">Twórcy</a></li>
                    <li><a href="#Kontakt">Kontakt</a></li>
                </ul>
                <Link to="/Form"><button className="button">Rozpocznij test</button></Link>
            </div>
        </nav>
    )
}

export default Nav;
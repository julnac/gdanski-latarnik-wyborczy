import { Link } from "react-router-dom";
import "../styles/nav.scss";
import logo from "../assets/vote.png";
import {handleScrollToSection} from "../scripts/utils.tsx";

const Nav = () => {

    return (
        <nav id="nav">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <a onClick={() => handleScrollToSection("Hero")}>Gdański Latarnik Wyborczy</a>
            </div>
            <div className="options">
            <ul>
                <li><a onClick={() => handleScrollToSection("Onas")}>O latarniku</a></li>
                <li><a onClick={() => handleScrollToSection("Faq")}>FAQ</a></li>
                <li><a onClick={() => handleScrollToSection("Twórcy")}>Twórcy</a></li>
                <li><a onClick={() => handleScrollToSection("Kontakt")}>Kontakt</a></li>
            </ul>

                <Link to="/Form"><button className="button">Rozpocznij test</button></Link>
            </div>
        </nav>
    )
}

export default Nav;
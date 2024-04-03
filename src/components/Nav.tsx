import { Link } from "react-router-dom";
import "../styles/nav.scss";
// import logo from "../assets/vote.png";
import { useState } from "react";

const Nav = () => {

    const[menuOpen, setMenuOpen] = useState<boolean>(false)

    const handleScrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        if(menuOpen) {
            setMenuOpen(!menuOpen)
        }
    };

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav id="nav">
            <div className="logo">
                {/* <img src={logo} alt="logo"/> */}
                <a onClick={() => handleScrollToSection("Hero")}>Gdański Latarnik Wyborczy</a>
            </div>
            <button className="burger" onClick={handleMenuOpen}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            {menuOpen ?
                <div className="menu_phone">
                <ul>
                    <li><a onClick={() => handleScrollToSection("Onas")}>O latarniku</a></li>
                    <li><a onClick={() => handleScrollToSection("Faq")}>FAQ</a></li>
                    <li><a onClick={() => handleScrollToSection("Kontakt")}>Kontakt</a></li>
                </ul>
                <Link to="/Form"><button className="button">Rozpocznij test</button></Link>
            </div>
                : <></>
            }
            <div className="menu_web">
                <ul>
                    <li><a onClick={() => handleScrollToSection("Onas")}>O latarniku</a></li>
                    <li><a onClick={() => handleScrollToSection("Faq")}>FAQ</a></li>
                    <li><a onClick={() => handleScrollToSection("Kontakt")}>Kontakt</a></li>
                </ul>
                <Link to="/Form"><button className="button">Rozpocznij test</button></Link>
            </div> 
        </nav>
    )
}

export default Nav;
import "../styles/nav.scss";

const Nav = () => {
    return (
        <nav id="nav">
            <div className="logo">
                <a href="#Home">Gdański Latarnik Wyborczy</a>
            </div>
            <ul>
                <li><a href="#Onas">O latarniku</a></li>
                <li><a href="#Faq">FAQ</a></li>
                <li><a href="#Twórcy">Twórcy</a></li>
                <li><a href="#Kontakt">Kontakt</a></li>
            </ul>
            <a href="#Test"><button className="button">Rozpocznij test</button></a>
        </nav>
    )
}

export default Nav;
import "../styles/onas.scss";
// import mewa from "../assets/mewa2.png";

const Onas = () => {
    return (
        <section className="section onas" id="Onas">
            <div className="onas__tytul">
                <h2>O latarniku</h2>
            </div>
            <div className="onas__info">
                <h3>
                Gdański Latarnik Wyborczy to platforma internetowa, 
                na której znajdują się pytania dotyczące miasta Gdańska. 
                Z jej pomocą wyborcy, mieszkańcy Gdańska mogą sprawdzić, do 
                którego komitetu wyborczego (i jego programu) jest im najbliżej. 
                Po wypełnieniu testu na stronie Latarnika każdemu użytkownikowi 
                zostanie wyświetlone podsumowanie, zawierające poziom zgodności 
                wybranych odpowiedzi z odpowiedziami komitetów wyborczych. 
                Mamy nadzieję, że pozwoli to na bardziej świadomy wybór swojego 
                kandydata do Rady Miasta Gdańska oraz kandydata na Prezydenta 
                Miasta Gdańska.
                </h3>
            </div>
            {/* <div className="onas__tytul">
                <h2>Twórcy</h2>
            </div> */}
            <div className="onas__info">
                <h3>
                {/* <span>TWÓRCY</span><br/> */}
                Gdański Latarnik Wyborczy stworzyło niezależne medium Gdańskie Forum 
                Samorządowe wraz z zespołem technicznym.<br/>

                Autorzy pytań:
                Anna Maria Czarzasta,
                Filip Górski,
                Paweł Zarzycki<br/>

                Zespół techniczny:
                Julia Naczke,
                Grzegorz Pozorski
                </h3>
            </div>
            {/* <img className="mewa" src={mewa} alt="mewa"/> */}
        </section>
    )
}

export default Onas;
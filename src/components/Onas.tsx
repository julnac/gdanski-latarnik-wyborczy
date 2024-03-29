import "../styles/onas.scss";
import mewa from "../assets/mewa2.png";

const Onas = () => {
    return (
        <section className="section onas" id="Onas">
            <div className="onas__tytul">
                <h2>O latarniku</h2>
            </div>
            <div className="onas__info">
                <h3>
                    Latarnik Wyborczy umożliwia łatwe porównanie swoich 
                    poglądów z odpowiedziami udzielonymi przez komitety wyborcze.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Illum modi cumque minima, eveniet molestiae voluptatum quisquam harum repellat! Iusto, voluptate?
                </h3>
            </div>
            <img className="mewa" src={mewa} alt="mewa"/>
        </section>
    )
}

export default Onas;
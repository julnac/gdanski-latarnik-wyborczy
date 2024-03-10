import "../styles/faq.scss";

const Faq = () => {

    // const [open, setOpen] = useState;
    // const questions = []
    // function handleClick(){

    // }
    return (
        <section className="section faq" id="Faq">
            <div className="faq__tytul">
                <h2>FAQ</h2>
                <h3>Pytania i odpowiedzi</h3>
            </div>
            <div className="faq__pytania">
                <div className="faq__pytania-pytanie">
                    <div className="pytanie">
                        <h3>Czym jest gdański latarnik wyborczy?</h3>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="odpowiedz">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                        Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                        Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                        </p>
                    </div>
                </div>
                <div className="faq__pytania-pytanie">
                    <div className="pytanie">
                        <h3>Czym jest gdański latarnik wyborczy?</h3>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="odpowiedz">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                        Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                        Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq;
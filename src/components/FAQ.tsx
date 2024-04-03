import "../styles/faq.scss";
import { useState } from "react";

const Faq = () => {

    const [isVisible, setIsVisible] = useState<boolean[]>(Array(5).fill(false));

    const handleClick = (index: number) => {
        const updatedDivs = [...isVisible];
        updatedDivs[index] = !updatedDivs[index];
        setIsVisible(updatedDivs);
    }
    return (
        <section className="section faq" id="Faq">
            <div className="faq__title">
                <h2>FAQ</h2>
                {/* <h3>Pytania i odpowiedzi</h3> */}
            </div>
            <div className="faq__questions">
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(2)}>
                            <h3>Jak powstały pytania?</h3>
                            {isVisible[2] ? 
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> :
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            }
                        </div>
                        <div className={isVisible[2] ? "answer" : "hidden"}>
                            <p>Pytania zostały sformułowane na podstawie analizy programów wyborczych komitetów, 
                                które wystawiły swoich kandydatów w najbliższych wyborach samorządowych oraz 
                                kwestionariusza pytań przesłanego tym komitetom. Ułożone zostały w ten sposób, 
                                aby w jak największym stopniu odzwierciedlać zróżnicowanie poglądów i pomysłów 
                                na miasto.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(3)}>
                            <h3>W jaki sposób działa Latarnik?</h3>
                            {isVisible[3] ? 
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> :
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            }
                        </div>
                        <div className={isVisible[3] ? "answer" : "hidden"}>
                            <p>Latarnik działa na podstawie algorytmu, który oblicza zgodność odpowiedzi użytkownika z 
                                odpowiedziami komitetów wyborczych. Na przykład jeżeli użytkownik w pierwszym pytaniu 
                                odpowiedział twierdząco na jedno z pytań, w drugim nie zgadza się z zawartym w nim stwierdzeniem, 
                                a komitet odpowiedział w obu przypadkach "tak", to użytkownik ma 50% zgodności z komitetem.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(4)}>
                            <h3>Czy w Latarniku zostały uwzględnione wszystkie komitety wyborcze?</h3>
                            {isVisible[4] ? 
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> :
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            }
                        </div>
                        <div className={isVisible[4] ? "answer" : "hidden"}>
                            <p>Tak, w Latarniku uwzględniono wszystkie komitety wyborcze, które wystawiły swoich kandydatów 
                                w wyborach samorządowych w Gdańsku. Wyjątkiem jest KW Związku Słowiańskiego, który nie odesłał 
                                uzupełnionego kwestionariusza. Nasza przedstawicielka kontaktowała się z prezesem partii 
                                dwukrotnie drogą telefoniczną, a następnie wysłała maila z kwestionariuszem do osoby wskazanej 
                                przez prezesa. Do dnia 3 kwietnia niestety nie doczekaliśmy się odpowiedzi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq;
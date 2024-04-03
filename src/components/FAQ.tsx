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
                            <p>Latarnik działa na podstawie algorytmu, który oblicza zgodność odpowiedzi 
                                użytkownika z odpowiedziami komitetów wyborczych. Np. jeżeli użytkownik w pierszym
                                pytaniu wybrał że się zgadza, a w drugim że się nie zgadza, a z kolei komitet 
                                odpowiedział dwa razy że się nie zgadza, to użytkownik ma 50% zgodność z komitetem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq;
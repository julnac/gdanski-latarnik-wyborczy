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
                <h3>Pytania i odpowiedzi</h3>
            </div>
            <div className="faq__questions">
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(1)}>
                            <h3>Czym jest gdański latarnik wyborczy?</h3>
                            {isVisible[1] ? 
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> :
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            }
                        </div>
                        <div className={isVisible[1] ? "answer" : "hidden"} >
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                            Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                            Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(2)}>
                            <h3>Czym jest gdański latarnik wyborczy?</h3>
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                            Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                            Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(3)}>
                            <h3>Czym jest gdański latarnik wyborczy?</h3>
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                            Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                            Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="question">
                        <div onClick={() => handleClick(4)}>
                            <h3>Czym jest gdański latarnik wyborczy?</h3>
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae aliquid est architecto sed ullam iusto quod atque alias rem quaerat nam mollitia fuga ipsa ipsam, cumque voluptates molestias illo quas.
                            Repellat expedita quidem porro, natus amet magni! Odit nulla distinctio cum alias, necessitatibus, ratione, adipisci aliquam error quaerat ducimus dolores? Vel alias id omnis saepe quaerat nulla! Doloremque, labore minima?
                            Debitis sit veritatis ullam reiciendis. Consequuntur similique quos et vel dolor odit mollitia, ducimus amet maiores quo. Vero reiciendis itaque ea eveniet pariatur, quas repellat, delectus amet odit reprehenderit hic.
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Faq;
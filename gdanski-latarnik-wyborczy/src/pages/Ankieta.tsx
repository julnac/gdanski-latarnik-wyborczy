import "../styles/ankieta.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { Statement } from '../models/Statement';


const Ankieta = () => {

    const [statements, setStatements] = useState<Statement[]>([]);
    const [currentStatement, setCurrentStatement] = useState<Statement | null>(null);
    const handleStatementChange = () => {
        console.log(currentStatement?.index)
        if (currentStatement && currentStatement.index < statements.length - 1) {
            const newIndex = currentStatement.index + 1;
            console.log(newIndex)
            setCurrentStatement(statements[newIndex]);
        } else {
            console.log('Koniec testu');
        }
    }

    //WYJAŚNIENIE//
    const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);

    const handleExplanationOpen = () => {
        setIsExplanationVisible(!isExplanationVisible);
    };

    //SIGNIFICANCE//
    const [isSignificanceVisible, setIsSignificanceVisible] = useState<boolean>(false);

    const handleSignificanceVisibility = () => {
        setIsSignificanceVisible(!isSignificanceVisible);

    }

    //SELECTED BUTTON COLOR//
    // const btn = document.getElementsByTagName('button');

    // for (let i = 0; i < buttons.length; i++) {
    //     buttons[i].addEventListener('click', function onClick() {
    //         buttons[i].focus()
    //     })
    // }

    const agreeButton = useRef<HTMLButtonElement>(null);
    const disagreeButton = useRef<HTMLButtonElement>(null);
    const doNotKnowButton = useRef<HTMLButtonElement>(null);
    

    
 
    useEffect(() => {
        // Fetch CSV file
        fetch('/stwierdzenia.csv')
            .then(response => response.text())
            .then(csv => {
                const lines = csv.split('\n');
                const data = lines.map(line => line.split(';'));

                const dataLength = data.length;
                const statements: Statement[] = new Array(dataLength);

                for (let index = 0; index < dataLength; index++) {
                    statements[index] = {
                        index: index,
                        statementText: data[index][0],
                        explanation: data[index][1],
                    }
                }
                setStatements(statements);
                setCurrentStatement(statements[1])
            })
            .catch(error => console.error('Error fetching CSV file:', error));
        }, []);

    return (
        <section className="section ankieta" id="Ankieta">
            <div className="nawigacja">
                <div className="logo">
                    <a href="#Hero">Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/"><button className="button">Wróć do strony</button></Link>
            </div>
            <div className="ankieta__karuzela">
                <div className="slajd">
                    <div className="noglowek">
                        <div className="tytul"><h3>Stwierdzenie: {currentStatement ? currentStatement.index : 'Loading...'}</h3></div>
                        <div className="wyjasnienie">
                            <button onClick={handleExplanationOpen}>Wyjaśnienie stwierdzenia</button>
                            

                            {isExplanationVisible ? 
                                <div className="dark">
                                    <div className="pop-out">
                                        <button className="close" onClick={handleExplanationOpen}>
                                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <p> {currentStatement ? currentStatement.explanation : 'Loading...'}</p>
                                    </div>
                                </div>
                                : <></>}
                            <div>
                                
                            </div>

                            
                        </div>
                    </div>
                    <div className="slajd__stwierdzenie">
                        <h3>{currentStatement ? currentStatement.statementText : 'Loading...'}</h3>
                    </div>
                    <div className="slajd__odpowiedzi">
                        <button className="button__secondary" ref={agreeButton} onClick={() => handleSignificanceVisibility()}>Zgadzam się</button>
                        <button className="button__secondary" ref={disagreeButton} onClick={handleSignificanceVisibility}>nie zgadzam się</button>
                        <button className="button__secondary" ref={doNotKnowButton} onClick={handleStatementChange}>nie mam zdania</button>
                    </div>
                    {isSignificanceVisible ? 
                    <div className="slajd__waga">
                        <div className="slajd__waga-pytanie">
                            Czy ta kwestia jest dla Ciebie bardzo ważna?
                        </div>
                        <div className="slajd__waga-odpowiedzi">
                            <button className="button__secondary" onClick={handleStatementChange}>tak</button>
                            <button className="button__secondary" onClick={handleStatementChange}>nie</button>
                        </div>
                    </div>
                    : <></>}
                </div>
                <div className="stronicowanie">
                    <button className="button__secondary">1</button>
                    <button className="button__secondary">2</button>
                    <button className="button__secondary">3</button>
                    <button className="button__secondary">4</button>
                    <button className="button__secondary">5</button>
                    <button className="button__secondary">6</button>
                    <button className="button__secondary">7</button>
                    <button className="button__secondary">8</button>
                    <button className="button__secondary">9</button>
                    <button className="button__secondary">10</button>
                </div>
            </div>
        </section>
    )
}

export default Ankieta
import "../styles/ankieta.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Statement } from '../models/Statement';
import { Answer } from "../models/Answer";


const Ankieta = () => {
    const [statementsAnswers, setStatementsAnswers] = useState<Answer[]>([]);
    const [statements, setStatements] = useState<Statement[]>([]);
    const [currentStatement, setCurrentStatement] = useState<Statement | null>(null);
    const handleStatementChange = (argument: number | null) => {
        if (argument !== null){
            setCurrentStatement(statements[argument]);
            setIsSignificanceVisible(false)
        } else {
            // console.log(currentStatement?.index)
            if (currentStatement && currentStatement.index < statements.length - 1) {
                const newIndex = currentStatement.index + 1;
                // console.log(newIndex)
                setCurrentStatement(statements[newIndex]);
                setIsSignificanceVisible(false)
            } else {
                console.log('Koniec testu');
            }
        }
    };

    //WYJAŚNIENIE//
    const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);

    const handleExplanationOpen = () => {
        setIsExplanationVisible(!isExplanationVisible);
    };

    //CHOICE//
    const [isSignificanceVisible, setIsSignificanceVisible] = useState<boolean>(false);
    const [clickedButtonId, setClickedButtonId] = useState<string | null>(null);

    const handleClick = (buttonId: string) => {
        console.log(buttonId);
        setClickedButtonId(buttonId);
        if (buttonId === 'agreeButton' || buttonId === 'disagreeButton'){
            setIsSignificanceVisible(true);
        }else{
            handleStatementChange(null);
            console.log(statementsAnswers);
            // TODO - fix it
        }
    };

    //SELECTED BUTTON COLOR//
    // const [coloredButton, setColoredButton] = useState<boolean>(false);
    // const btn = document.getElementsByTagName('button');

    // for (let i = 0; i < buttons.length; i++) {
    //     buttons[i].addEventListener('click', function onClick() {
    //         buttons[i].focus()
    //     })
    // }

    useEffect(() => {
        // Fetch CSV file
        fetch('/stwierdzenia.csv')
            .then(response => response.text())
            .then(csv => {
                const lines = csv.split('\n');
                const data = lines.map(line => line.split(';'));

                const dataWithoutHeader = data.slice(1);
                const dataLength = dataWithoutHeader.length;
                const statements: Statement[] = new Array(dataLength);

                
                for (let index = 0; index < dataLength; index++) {
                    statements[index] = {
                        index: index,
                        statementText: dataWithoutHeader[index][0],
                        explanation: dataWithoutHeader[index][1],
                    }
                }
                setStatements(statements);
                setCurrentStatement(statements[0])
                setStatementsAnswers(Array(dataLength).fill(new Answer()));
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
                        <div className="tytul"><h3>Stwierdzenie: {currentStatement ? currentStatement.index + 1 : 'Loading...'}</h3></div>
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
                        <button  id="agreeButton" className={`button__secondary ${clickedButtonId === 'agreeButton' ? 'button__secondary_active' : ''}`} onClick={() => handleClick('agreeButton')}>Zgadzam się</button>
                        <button id="disagreeButton" className={`button__secondary ${clickedButtonId === 'disagreeButton' ? 'button__secondary_active' : ''}`} onClick={() => handleClick('disagreeButton')}>nie zgadzam się</button>
                        <button id="doNotKnowButton" className="button__secondary" onClick={() => handleClick('doNotKnowButton')}>nie mam zdania</button>
                    </div>
                    {isSignificanceVisible ? 
                    <div className="slajd__waga">
                        <div className="slajd__waga-pytanie">
                            Czy ta kwestia jest dla Ciebie bardzo ważna?
                        </div>
                        <div className="slajd__waga-odpowiedzi">
                            <button id="tak" className="button__secondary" onClick={() => handleClick('tak')}>tak</button>
                            <button id="nie" className="button__secondary" onClick={() => handleClick('nie')}>nie</button>
                        </div>
                    </div>
                    : <></>}
                </div>
                <div className="stronicowanie">
                    {statements.map((_, i) => (
                        <button className={`button__secondary ${currentStatement?.index == i ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(i)}>{i+1}</button>
                    ))}
                    {/* <button className={`button__secondary ${currentStatement?.index == 1 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(1)}>1</button>
                    <button className={`button__secondary ${currentStatement?.index == 2 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(2)}>2</button>
                    <button className={`button__secondary ${currentStatement?.index == 3 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(3)}>3</button>
                    <button className={`button__secondary ${currentStatement?.index == 4 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(4)}>4</button>
                    <button className={`button__secondary ${currentStatement?.index == 5 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(5)}>5</button>
                    <button className={`button__secondary ${currentStatement?.index == 6 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(6)}>6</button>
                    <button className={`button__secondary ${currentStatement?.index == 7 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(7)}>7</button>
                    <button className={`button__secondary ${currentStatement?.index == 8 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(8)}>8</button>
                    <button className={`button__secondary ${currentStatement?.index == 9 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(9)}>9</button>
                    <button className={`button__secondary ${currentStatement?.index == 10 ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(10)}>10</button> */}
                </div>
            </div>
        </section>
    )
}

export default Ankieta
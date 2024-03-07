import "../styles/form.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import {Statement} from '../models/Statement';
import {Answer} from "../models/Answer";
import {StatementAnswer} from "../enums/StatementAnswer.tsx";
import {SignificanceAnswer} from "../enums/SignificanceAnswer.tsx";

const Form = () => {
    const [statements, setStatements] = useState<Statement[]>([]);
    const [currentStatement, setCurrentStatement] = useState<Statement>();
    const [statementsAnswers, setStatementsAnswers] = useState<Answer[]>([]);

    const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);
    const [isSignificanceVisible, setIsSignificanceVisible] = useState<boolean>(false);
    const [statementAnswer, setStatementAnswer] = useState<StatementAnswer>(StatementAnswer.Unselected);
    const [significanceAnswer, setSignificanceAnswer] = useState<SignificanceAnswer>(SignificanceAnswer.Unselected);

    // clear vars after new question??

    useEffect(() => {
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

    const handleStatementChange = (newIndex: number) => {
        setStatementAnswer(StatementAnswer.Unselected);
        setSignificanceAnswer(SignificanceAnswer.Unselected);

        if (statementsAnswers[newIndex].isAnswered()){
            const answer = statementsAnswers[newIndex];
            if (answer.statementAnswer === StatementAnswer.Neutral){
                setIsSignificanceVisible(false);
            }
            else {
                setIsSignificanceVisible(true);
                setSignificanceAnswer(answer.significanceAnswer);
            }

            setStatementAnswer(answer.statementAnswer);
        }
        else {
            if (currentStatement && currentStatement.index < statements.length - 1) {
                setIsSignificanceVisible(false)
            } else {
                console.log('Koniec testu');
            }
        }

        setCurrentStatement(statements[newIndex]);
    };

    const handleExplanationOpen = () => {
        setIsExplanationVisible(!isExplanationVisible);
    };

    const setAnswer = (index: number, answer: Answer) => {
        const updatedAnswers = [...statementsAnswers];
        updatedAnswers[index] = answer;
        setStatementsAnswers(updatedAnswers);
    }

    const handleStatementButtonClick = (statementAnswer: StatementAnswer) => {
        console.log(statementAnswer);
        setStatementAnswer(statementAnswer);
        if (statementAnswer === StatementAnswer.Agree || statementAnswer === StatementAnswer.Disagree){

            setIsSignificanceVisible(true);

            const answer = new Answer(statementAnswer);
            setAnswer(currentStatement!.index, answer);
        }
        else if (statementAnswer === StatementAnswer.Neutral){
            const answer = new Answer(StatementAnswer.Neutral);
            setAnswer(currentStatement!.index, answer);

            handleStatementChange(currentStatement!.index + 1);
        }
    };

    const handleSignificanceButtonClick = (significanceAnswer: SignificanceAnswer) => {
        console.log(significanceAnswer);

        const answer = statementsAnswers[currentStatement!.index];
        answer.significanceAnswer = significanceAnswer;
        setAnswer(currentStatement!.index, answer);

        handleStatementChange(currentStatement!.index + 1);
    };

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
                                                <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <p> {currentStatement ? currentStatement.explanation : 'Loading...'}</p>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                    <div className="slajd__stwierdzenie">
                        <h3>{currentStatement ? currentStatement.statementText : 'Loading...'}</h3>
                    </div>
                    <div className="slajd__odpowiedzi">
                        <button
                            id="agreeButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Agree ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Agree)}>
                            Zgadzam się
                        </button>
                        <button
                            id="disagreeButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Disagree ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Disagree)}>
                            nie zgadzam się
                        </button>
                        <button
                            id="doNotKnowButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Neutral ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Neutral)}>
                            nie mam zdania
                        </button>
                    </div>
                    {isSignificanceVisible ? 
                    <div className="slajd__waga">
                        <div className="slajd__waga-pytanie">
                            Czy ta kwestia jest dla Ciebie bardzo ważna?
                        </div>
                        <div className="slajd__waga-odpowiedzi">
                            <button
                                id="tak"
                                className={`button__secondary ${significanceAnswer === SignificanceAnswer.Yes ? 'button__secondary_active' : ''}`}
                                onClick={() => handleSignificanceButtonClick(SignificanceAnswer.Yes)}>
                                tak
                            </button>
                            <button
                                id="nie"
                                className={`button__secondary ${significanceAnswer === SignificanceAnswer.No ? 'button__secondary_active' : ''}`}
                                onClick={() => handleSignificanceButtonClick(SignificanceAnswer.No)}>
                                nie
                            </button>
                        </div>
                    </div>
                    : <></>}
                </div>
                <div className="stronicowanie">
                    {statements.map((_, i) => (
                        <button className={`button__secondary ${currentStatement?.index == i ? 'button__secondary_active' : ''}`} onClick={() => handleStatementChange(i)}>{i+1}</button>
                    ))}
                    <Link to="/Wynik"><button className="button__secondary">Wynik</button></Link>
                </div>
            </div>
        </section>
    )
};

export default Form;
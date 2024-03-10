import "../styles/form.scss";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import {Statement} from '../models/Statement';
import {Answer} from "../models/Answer";
import {StatementAnswer} from "../enums/StatementAnswer.tsx";
import {SignificanceAnswer} from "../enums/SignificanceAnswer.tsx";
import ResultModal from "../components/ResultModal.tsx";

const Form = () => {
    const [statements, setStatements] = useState<Statement[]>([]);
    const [currentStatement, setCurrentStatement] = useState<Statement>(new Statement());
    const [answers, setAnswers] = useState<Answer[]>([]);

    const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);
    const [isSignificanceVisible, setIsSignificanceVisible] = useState<boolean>(false);
    const [statementAnswer, setStatementAnswer] = useState<StatementAnswer>(StatementAnswer.Unselected);
    const [significanceAnswer, setSignificanceAnswer] = useState<SignificanceAnswer>(SignificanceAnswer.Unselected);

    const [farthestAnsweredStatementIndex, setFarthestAnsweredStatementIndex] = useState<number>(0);

    const [isResultModalVisible, setIsResultModalVisible] = useState<boolean>(false);

    const navigate = useNavigate();
    // clear vars after new question??

    useEffect(() => {
        const uri = (import.meta.env.MODE === undefined ? 'https://julnac.github.io/gdanski-latarnik-wyborczy/' : '') + 
        'odpowiedzi-komitetow-przyklad-semicolon-separated.csv';

        console.log(`uri: ${uri}`);

        fetch(uri)
            .then(response => response.text())
            .then(csv => {
                const lines = csv.split('\n');
                const data = lines.map(line => line.split(';'));

                const dataWithoutHeader = data.slice(1);
                const dataLength = dataWithoutHeader.length;
                const statements: Statement[] = new Array(dataLength);

                for (let index = 0; index < dataLength; index++) {
                    statements[index] = {
                        Index: index,
                        StatementText: dataWithoutHeader[index][0],
                        Explanation: dataWithoutHeader[index][1],
                    }
                }
                console.log(statements);

                setStatements(statements);
                setCurrentStatement(statements[0])

                const storageAnswersString = localStorage.getItem('answers');
                if (storageAnswersString) {
                    const parsedAnswers: Answer[] = JSON.parse(storageAnswersString);
                    if (parsedAnswers.length !== dataLength) {
                        localStorage.removeItem('answers');
                        setAnswers(Array(dataLength).fill(new Answer()));
                        return;
                    }
                    const storageAnswers = parsedAnswers.map((answer) => new Answer(answer.statementAnswer, answer.significanceAnswer));
                    setAnswers(storageAnswers);
                    setFarthestAnsweredStatementIndex(storageAnswers.length - 1);
                    setCurrentStatement(statements[0]);
                    setUserAnswer(storageAnswers[0]);
                }
                else {
                    localStorage.removeItem('answers');
                    setAnswers(Array(dataLength).fill(new Answer()));
                }
            })
            .catch(error => console.error('Error fetching CSV file:', error));
    }, []);

    function setUserAnswer(answer: Answer) {
        if (answer.statementAnswer === StatementAnswer.Neutral){
            setIsSignificanceVisible(false);
            setSignificanceAnswer(SignificanceAnswer.Unselected);
        }
        else {
            setIsSignificanceVisible(true);
            setSignificanceAnswer(answer.significanceAnswer);
        }

        setStatementAnswer(answer.statementAnswer);
    }

    const handleStatementChange = (newIndex: number) => {
        if (newIndex >= statements.length) {
            console.log('Koniec testu');
            setIsResultModalVisible(true);
            // TODO disable rest of screen
        }
        else {
            setCurrentStatement(statements[newIndex]);

            if (newIndex > farthestAnsweredStatementIndex) {
                setFarthestAnsweredStatementIndex(newIndex);
            }

            if (answers[newIndex].isAnswered()){
                setUserAnswer(answers[newIndex]);
            }
            else {
                setStatementAnswer(StatementAnswer.Unselected);
                setIsSignificanceVisible(false);
                setSignificanceAnswer(SignificanceAnswer.Unselected);
            }
        }
    };

    const handleExplanationOpen = () => {
        setIsExplanationVisible(!isExplanationVisible);
    };

    const setAnswer = (index: number, answer: Answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    }

    const handleStatementButtonClick = (statementAnswer: StatementAnswer) => {
        setStatementAnswer(statementAnswer);
        if (statementAnswer === StatementAnswer.Agree || statementAnswer === StatementAnswer.Disagree){

            if (answers[currentStatement.Index].isAnswered()){
                if (statementAnswer !== answers[currentStatement.Index].statementAnswer){
                    setSignificanceAnswer(SignificanceAnswer.Unselected);
                }
            }

            setIsSignificanceVisible(true);

            const answer = new Answer(statementAnswer);
            setAnswer(currentStatement.Index, answer);
        }
        else if (statementAnswer === StatementAnswer.Neutral){
            const answer = new Answer(StatementAnswer.Neutral);
            setAnswer(currentStatement.Index, answer);

            handleStatementChange(currentStatement.Index + 1);
        }
    };

    const handleSignificanceButtonClick = (significanceAnswer: SignificanceAnswer) => {
        const answer = answers[currentStatement.Index];
        answer.significanceAnswer = significanceAnswer;
        setAnswer(currentStatement.Index, answer);

        handleStatementChange(currentStatement.Index + 1);
    };

    const handleOpenModal = () => {
        setIsResultModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsResultModalVisible(false);
    };

    const hasUserAnsweredAllQuestions = () => {
        return answers.every(answer => answer.isAnswered());
    }

    function handleShowResult() {
        const answersString = JSON.stringify(answers);

        const storageAnswers = localStorage.getItem('answers');
        if (storageAnswers) {
            localStorage.removeItem('answers');
        }

        localStorage.setItem('answers', answersString);
        navigate('/Wynik');
    }

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
                        <div className="tytul"><h3>Stwierdzenie: {currentStatement ? currentStatement.Index + 1 : 'Loading...'}</h3></div>
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
                                        <p> {currentStatement ? currentStatement.Explanation : 'Loading...'}</p>
                                    </div>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                    <div className="slajd__stwierdzenie">
                        <h3>{currentStatement ? currentStatement.StatementText : 'Loading...'}</h3>
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
                        <button
                            disabled={i > farthestAnsweredStatementIndex}
                            className={
                                `button__secondary${currentStatement.Index == i ? 'button__secondary_active' : ''} 
                            ${(i > farthestAnsweredStatementIndex) ? 'button__disabled' : ''}`}
                            onClick={() => handleStatementChange(i)}>
                            {i + 1}
                        </button>
                    ))}
                    <div>
                        <button
                            disabled={!hasUserAnsweredAllQuestions()}
                            className={`button__secondary ${!hasUserAnsweredAllQuestions() ? 'button__disabled' : ''}`}
                            onClick={handleOpenModal}>
                            Wynik
                        </button>
                        {/*<ResultModal isOpen={isResultModalVisible} onClose={handleCloseModal}>*/}
                        {/*    <Link to="/Wynik">*/}
                        {/*        <button className="button__secondary">Zobacz swój wynik</button>*/}
                        {/*    </Link>*/}
                        {/*</ResultModal>*/}
                        <ResultModal isOpen={isResultModalVisible} onClose={handleCloseModal}>
                            <button className="button__secondary" onClick={() => handleShowResult()}>Zobacz swój wynik</button>
                        </ResultModal>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Form;
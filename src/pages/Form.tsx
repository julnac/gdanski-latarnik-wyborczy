import "../styles/form.scss";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import {Statement} from '../models/Statement';
import {Answer} from "../models/Answer";
import {StatementAnswer} from "../enums/StatementAnswer.tsx";
import ResultModal from "../components/ResultModal.tsx";
// import logo from "../assets/vote.png";

const Form = () => {
    const [statements, setStatements] = useState<Statement[]>([]);
    const [currentStatement, setCurrentStatement] = useState<Statement>(new Statement());
    const [answers, setAnswers] = useState<Answer[]>([]);

    // const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);
    const [statementAnswer, setStatementAnswer] = useState<StatementAnswer>(StatementAnswer.Unselected);

    const [farthestAnsweredStatementIndex, setFarthestAnsweredStatementIndex] = useState<number>(0);

    const [isResultModalVisible, setIsResultModalVisible] = useState<boolean>(false);

    const navigate = useNavigate();
    // clear vars after new question??

    useEffect(() => {
        const uri = (import.meta.env.MODE === undefined ? 'https://gdanskilatarnik.pl/' : '') + 
        'odpowiedzi-komitetow-semicolon-separated.csv';

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
                    const storageAnswers = parsedAnswers.map((answer) => new Answer(answer.statementAnswer));
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
            }
        }
    };

    // const handleExplanationOpen = () => {
    //     setIsExplanationVisible(!isExplanationVisible);
    // };

    const setAnswer = (index: number, answer: Answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    }

    const handleStatementButtonClick = (statementAnswer: StatementAnswer) => {
        setStatementAnswer(statementAnswer);

        const answer = new Answer(statementAnswer);
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
                    {/* <img src={logo} alt="logo"/> */}
                    <Link to="/"><a>Gdański Latarnik Wyborczy</a></Link>
                </div>
                <Link to="/">
                    <button className="button">Wróć</button></Link>
            </div>
            <div className="ankieta__karuzela">
                <div className="slajd">
                    <div className="noglowek">
                        <div className="tytul"><h3>Pytanie: {currentStatement ? currentStatement.Index + 1 : 'Loading...'}</h3></div>
                        {/* <div className="wyjasnienie">
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
                        </div> */}
                    </div>
                    <div className="slajd__stwierdzenie">
                        <h3>{currentStatement ? currentStatement.StatementText : 'Loading...'}</h3>
                    </div>
                    <div className="slajd__odpowiedzi">
                        <button
                            id="agreeButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Agree ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Agree)}>
                            Tak
                        </button>
                        <button
                            id="disagreeButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Disagree ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Disagree)}>
                            Nie
                        </button>
                        <button
                            id="doNotKnowButton"
                            className={`button__secondary ${statementAnswer === StatementAnswer.Neutral ? 'button__secondary_active' : ''}`}
                            onClick={() => handleStatementButtonClick(StatementAnswer.Neutral)}>
                            nie mam zdania
                        </button>
                    </div>
                </div>
                <div className="statement_legend">
                    {statements.map((_, i) => (
                        <button
                            key={0}
                            disabled={i > farthestAnsweredStatementIndex}
                            className={
                                `${currentStatement.Index == i ? 'statement_legend_current' : ''}
                                ${(i > farthestAnsweredStatementIndex) ? 'statement_legend_unvisited' : 'statement_legend_visited'}`}
                            onClick={() => handleStatementChange(i)}>
                            {i + 1}
                        </button>
                    ))}
                    <div>
                        <button
                            disabled={!hasUserAnsweredAllQuestions()}
                            className={`statement_legend_unvisited ${hasUserAnsweredAllQuestions() ? 'statement_legend_visited' : ''}`}
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
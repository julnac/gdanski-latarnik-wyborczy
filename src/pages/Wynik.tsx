import {Link, useNavigate} from "react-router-dom";
import "../styles/wynik.scss";
import {Answer} from "../models/Answer.tsx";
import {useEffect, useState} from "react";
import {StatementAnswer} from "../enums/StatementAnswer.tsx";
import {SignificanceAnswer} from "../enums/SignificanceAnswer.tsx";
import ResultChart from "../components/ResultChart.tsx";
import {handleScrollToSection} from "../scripts/utils.tsx";

const Wynik = () => {
    const [committees, setCommittees] = useState<string[]>([]);
    const [userSimilarityPerCommittee, setUserSimilarityPerCommittee] = useState<number[]>([]);

    const navigate = useNavigate();

    function mapUserAnswersToValues(parsedAnswers: Answer[]) {
        const answersValues: number[] = parsedAnswers.map((answer) => {
            if (answer.statementAnswer === StatementAnswer.Agree) {
                if (answer.significanceAnswer === SignificanceAnswer.Yes) {
                    return 1;
                }
                else if (answer.significanceAnswer === SignificanceAnswer.No) {
                    return 2;
                }
                else {
                    return 0;
                }
            }
            else if (answer.statementAnswer === StatementAnswer.Disagree) {
                if (answer.significanceAnswer === SignificanceAnswer.Yes) {
                    return 3;
                }
                else if (answer.significanceAnswer === SignificanceAnswer.No) {
                    return 4;
                }
                else {
                    return 0;
                }
            }
            else if (answer.statementAnswer === StatementAnswer.Neutral) {
                return 5;
            }
            else {
                return 0;
            }
        });

        // setAnswersValues(answersValues);
        console.log(`answersValues: ${answersValues}`);
        return answersValues;
    }

    useEffect(() => {

        const numberOfColumnsToSkip = 2;
        let committeesCount: number = 0;
        let committeesAnswers: number[][] = [];
        let dataLength = 0;

        const uri = (import.meta.env.MODE === undefined ? 'https://julnac.github.io/gdanski-latarnik-wyborczy/' : '') + 
        'odpowiedzi-komitetow-przyklad-semicolon-separated.csv';

        console.log(`uri: ${uri}`);

        fetch(uri)
            .then(response => response.text())
            .then(csv => {
                const lines = csv.split('\n');
                const completeData = lines.map(line => line.split(';'));

                const committees = completeData[0].slice(numberOfColumnsToSkip);
                committeesCount = committees.length;

                const data = completeData.slice(1);
                dataLength = data.length;

                committeesAnswers = new Array(committeesCount);
                for (let i = 0; i < committeesCount; i++) {
                    committeesAnswers[i] = new Array(dataLength);
                }

                for (let i = 0; i < dataLength; i++) {
                    const row = data[i].slice(numberOfColumnsToSkip).map(Number);
                    for (let j = 0; j < committeesCount; j++) {
                        committeesAnswers[j][i] = row[j];
                    }
                }

                console.log(`committeesAnswers: ${committeesAnswers}`);

                setCommittees(committees);
            })
            .then(() => {

                let userAnswers: number[] = [];

                const storageAnswersString = localStorage.getItem('answers');
                if (storageAnswersString) {
                    const parsedAnswers: Answer[] = JSON.parse(storageAnswersString);
                    if (parsedAnswers.length !== dataLength) {
                        navigate('/');
                        // TODO: add popup
                        return;
                    }

                    userAnswers = mapUserAnswersToValues(parsedAnswers);
                }
                else {
                    // TODO: add popup
                    navigate('/');
                }

                // calculate user and committees answers similarity
                const userSimilarityPerCommittee: number[] = new Array(committeesCount).fill(0);

                for (let i = 0; i < committeesCount; i++) {
                    for (let j = 0; j < userAnswers.length; j++) {
                        if (userAnswers[j] !== 0) {
                            if (userAnswers[j] === committeesAnswers[i][j]) {
                                userSimilarityPerCommittee[i] += 1;
                            }
                            else if (userAnswers[j] === 1 && committeesAnswers[i][j] === 2) {
                                userSimilarityPerCommittee[i] += 0.5;
                            }
                            else if (userAnswers[j] === 2 && committeesAnswers[i][j] === 1) {
                                userSimilarityPerCommittee[i] += 0.5;
                            }
                            else if (userAnswers[j] === 3 && committeesAnswers[i][j] === 4) {
                                userSimilarityPerCommittee[i] += 0.5;
                            }
                            else if (userAnswers[j] === 4 && committeesAnswers[i][j] === 3) {
                                userSimilarityPerCommittee[i] += 0.5;
                            }
                        }
                    }
                    userSimilarityPerCommittee[i] = Number((userSimilarityPerCommittee[i] / userAnswers.length).toFixed(2));
                }
                setUserSimilarityPerCommittee(userSimilarityPerCommittee);
                console.log(`userSimilarityPerCommittee: ${userSimilarityPerCommittee}`);
            })
            .catch(error => console.error('Error fetching CSV file:', error));

    }, [navigate]);

    return (
        <section className="section wynik" id="Wynik">
            <div className="nawigacja">
                <div className="logo">
                    <a onClick={() => handleScrollToSection("Hero")}>Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/">
                    <button className="button">Wróć do strony</button></Link>
            </div>
            <div style={{marginTop: '100px'}}>
                <ResultChart
                    values={userSimilarityPerCommittee}
                    labels={committees} />
            </div>
            <div className="ankieta__karuzela"></div>
        </section>
    )
}

export default Wynik;
import {Link, useNavigate} from "react-router-dom";
import "../styles/wynik.scss";
import {Answer} from "../models/Answer.tsx";
import {useEffect, useState} from "react";
import {StatementAnswer} from "../enums/StatementAnswer.tsx";
import {SignificanceAnswer} from "../enums/SignificanceAnswer.tsx";
import ResultChart from "../components/ResultChart.tsx";

const Wynik = () => {
    //
    // const [answersValues, setAnswersValues] = useState<number[]>([]);
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

        return answersValues;
    }

    useEffect(() => {

        const numberOfColumnsToSkip = 2;
        let committeesCount: number = 0;
        let committeesAnswers: number[][] = [];
        let dataLength = 0;

        fetch('/odpowiedzi-komitetow-przyklad-semicolon-separated.csv')
            .then(response => response.text())
            .then(csv => {
                const data = csv
                    .split('\n')
                    .map(line => line.split(';'));

                const committees = data[0].slice(numberOfColumnsToSkip);

                const dataWithoutHeader = data.slice(1);
                dataLength = dataWithoutHeader.length;
                committeesAnswers = new Array(dataLength);

                for (let i = 0; i < dataLength; i++) {
                    committeesAnswers[i] = dataWithoutHeader[i].slice(numberOfColumnsToSkip).map(Number);
                }

                committeesCount = committees.length;
                setCommittees(committees);

                console.log(committeesAnswers);
            })
            .catch(error => console.error('Error fetching CSV file:', error));

        let answersValues: number[] = [];

        const storageAnswersString = localStorage.getItem('answers');
        if (storageAnswersString) {
            const parsedAnswers: Answer[] = JSON.parse(storageAnswersString);
            if (parsedAnswers.length !== dataLength) {
                navigate('/');
                // TODO: add popup
                return;
            }

            answersValues = mapUserAnswersToValues(parsedAnswers);
        }

        // calculate user and committees answers similarity
        const userSimilarityPerCommittee: number[] = new Array(committeesCount).fill(0);

        for (let i = 0; i < committeesCount; i++) {
            for (let j = 0; j < answersValues.length; j++) {
                if (answersValues[j] !== 0) {
                    if (answersValues[j] === committeesAnswers[j][i]) {
                        userSimilarityPerCommittee[i]++;
                    }
                    else if (answersValues[j] === 1 && committeesAnswers[j][i] === 2) {
                        userSimilarityPerCommittee[i] += 0.5;
                    }
                    else if (answersValues[j] === 2 && committeesAnswers[j][i] === 1) {
                        userSimilarityPerCommittee[i] += 0.5;
                    }
                    else if (answersValues[j] === 3 && committeesAnswers[j][i] === 4) {
                        userSimilarityPerCommittee[i] += 0.5;
                    }
                    else if (answersValues[j] === 4 && committeesAnswers[j][i] === 3) {
                        userSimilarityPerCommittee[i] += 0.5;
                    }
                }
            }
            userSimilarityPerCommittee[i] = userSimilarityPerCommittee[i] / answersValues.length;
        }
        setUserSimilarityPerCommittee(userSimilarityPerCommittee);

    }, [navigate]);

    return (
        <section className="section wynik" id="Wynik">
            <div className="nawigacja">
                <div className="logo">
                    <a href="#Hero">Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/"><button className="button">Wróć do strony</button></Link>
            </div>
            <div>
                <ResultChart
                    values={userSimilarityPerCommittee}
                    labels={committees} />
            </div>
            <div className="ankieta__karuzela"></div>
        </section>
    )
}

export default Wynik;
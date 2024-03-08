import { Link } from "react-router-dom";
import "../styles/wynik.scss";
import {Answer} from "../models/Answer.tsx";
import {useState} from "react";

const Wynik = () => {

    const [answers, setAnswers] = useState<Answer[]>([]);

    const storageAnswersString = localStorage.getItem('answers');
    if (storageAnswersString) {
        const dataLength = 12;
        const parsedAnswers: Answer[] = JSON.parse(storageAnswersString);
        if (parsedAnswers.length !== dataLength) {
            localStorage.removeItem('answers');
            setAnswers(Array(dataLength).fill(new Answer()));
            return;
        }
        const storageAnswers = parsedAnswers.map((answer) => new Answer(answer.statementAnswer, answer.significanceAnswer));
        setAnswers(storageAnswers);
    }

    return (
        <section className="section wynik" id="Wynik">
            <div className="nawigacja">
                <div className="logo">
                    <a href="#Hero">Gdański Latarnik Wyborczy</a>
                </div>
                <Link to="/"><button className="button">Wróć do strony</button></Link>
            </div>
            <div className="ankieta__karuzela"></div>
        </section>
    )
}

export default Wynik;
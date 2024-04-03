import {Link, useNavigate} from "react-router-dom";
import "../styles/wynik.scss";
import {Answer} from "../models/Answer.tsx";
import {useEffect, useState} from "react";
import ResultChart from "../components/ResultChart.tsx";
// import logo from "../assets/vote.png";
import x from "../assets/x.png"
import li from "../assets/li.png"
import faceb from "../assets/fb.png"
import Kontakt from "../components/Kontakt";

const baseUrl: { [platform: string]: string } = {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=",
    twitter: "https://twitter.com/intent/tweet?url=",
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
};

const Wynik = () => {
    const [committees, setCommittees] = useState<string[]>([]);
    const [userSimilarityPerCommittee, setUserSimilarityPerCommittee] = useState<number[]>([]);

    const navigate = useNavigate();

    function mapUserAnswersToValues(parsedAnswers: Answer[]) {
        const answersValues: number[] = parsedAnswers.map((answer) => answer.statementAnswer);

        console.log(`answersValues: ${answersValues}`);
        return answersValues;
    }

    useEffect(() => {

        const numberOfColumnsToSkip = 2;
        let committeesCount: number = 0;
        let committeesAnswers: number[][] = [];
        let dataLength = 0;

        const uri = (import.meta.env.MODE === undefined ? 'https://gdanskilatarnik.pl/' : '') + 
        'odpowiedzi-komitetow-semicolon-separated.csv';

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
                        if (userAnswers[j] !== 0 && committeesAnswers[i][j] !== 0) {
                            if (userAnswers[j] === committeesAnswers[i][j]) {
                                userSimilarityPerCommittee[i] += 1;
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

    function handleShare(platform: string) {
        const url = "https://gdanskilatarnik.pl/"; 

        const shareUrl = `${baseUrl[platform]}${encodeURIComponent(url)}`;

        console.log(shareUrl);

        // small screens
        window.open(shareUrl,"_blank",'width=500, height=500, scrollbars=yes, resizable=no');
    }

    return (
        <>
        <section className="section wynik" id="Wynik">
            <div className="nawigacja">
                <div className="logo">
                    {/* <img src={logo} alt="logo"/> */}
                    <Link to="/"><a>Gdański Latarnik Wyborczy</a></Link>
                </div>
                <Link to="/">
                    <button className="button">Wróć</button></Link>
            </div>
            <div className="content">
                <div className="header">
                    <h3>Wynik</h3>
                    <div className="share">
                        <p>Podaj dalej </p>
                        <button onClick={() => handleShare("twitter")}>
                            <img src={x} alt="x"/>
                        </button>
                        <button onClick={() => handleShare("linkedin")}>
                            <img src={li} alt="li"/>
                        </button>
                        <button onClick={() => handleShare("facebook")}>
                            <img src={faceb} alt="fb"/>
                        </button>
                    </div>
                </div>
                <p>Wykres przedstawia zgodność Twoich poglądów z deklaracjami poszczególnych komitetów wyborczych.</p>
                <div className="chart">
                    <ResultChart
                        values={userSimilarityPerCommittee}
                        labels={committees} />
                </div>
                <div className="mobile-share">
                    <p>Podaj dalej </p>
                    <button onClick={() => handleShare("twitter")}>
                        <img src={x} alt="x"/>
                    </button>
                    <button onClick={() => handleShare("linkedin")}>
                        <img src={li} alt="li"/>
                    </button>
                    <button onClick={() => handleShare("facebook")}>
                        <img src={faceb} alt="fb"/>
                    </button>
                </div>
                <div className="legend">
                    <p>Legenda:</p>
                    <ul>
                        <li><span>KO</span>: Koalicja Obywatelska</li>
                        <li><span>PiS</span>: Prawo i Sprawiedliwość</li>
                        <li><span>WGD 2050</span>: Wspólna Gdańska Droga 2050</li>
                        <li><span>Konf-Bezp-PJJ</span>: Konfederacja - Bezpartyni - Polska Jest Jedna</li>
                        <li><span>KG</span>: Kocham Gdańsk - kandydaci niezależni</li>
                        <li><span>KwwMA</span>: Komitet wyborczy wyborców Mariusza Andrzejczaka</li>
                        <li><span>SG</span>: Społeczny Gdańsk</li>
                    </ul>

                </div>
            </div>
        </section>
        <Kontakt />
        </>
    )
}

export default Wynik;
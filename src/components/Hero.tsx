import "../styles/hero.scss";
import { Link } from "react-router-dom";
// import lighthouse from "../assets/lighthouse.png"
import { useState } from "react";
import * as images from '../assets/lights_img';
// import imgs from '../assets/lights';

// const importAll = (r: any) => r.keys().map(r);
// const images = importAll(require.context('../assets/lights', false, /\.(png|jpe?g|svg)$/));

function sortById(stringList: string[]) {
    return stringList.sort((a, b) => {
      const idA = parseInt(a?.split("/")?.pop()?.split(".")[0] || '0', 10);
      const idB = parseInt(b?.split("/")?.pop()?.split(".")[0] || '0', 10);
      return idA - idB;
    });
  }

const Hero = () => {
    const imageArray: string[] = sortById(Object.values(images));

    const [currentImage, setcurrentImage] = useState<string>(imageArray[0]);

    window.onscroll = function() {changeImage()}

    console.log(imageArray);

    const pixelsCountWithAnimation = 600;
    const step = pixelsCountWithAnimation / imageArray.length;

    function changeImage(){
        const scroll = window.scrollY;
        console.log(window.scrollY);

        for(let i = 0; i < imageArray.length; i++){
            if (scroll < step * (i+1)) {
                setcurrentImage(imageArray[i]);
                console.log(currentImage);
                break;
            }
        }
    }

    return (
        <section className="section hero" id="Hero">
            <div className="hero__info">
                <h1>Wybierz świadomie </h1>
                <h4> Odpowiedz na pytania i przekonaj się, 
                    do kogo jest Ci najbliżej w gdańskich wyborach 
                    samorządowych w 2024 roku.
                </h4>
                <Link to="/Form"><button className="button__secondary">Rozpocznij test</button></Link>
            </div>
            {/* <div className="hero__image">
                <img src={lighthouse} alt="lighthouse"></img>
            </div> */}
            <img className="light" src={currentImage} alt="light" />

            {/* <img className="light" key={index} src={image} alt="light"></img> */}
        </section>
    )
}

export default Hero;
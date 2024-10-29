// Functions
import {useNavigate} from "react-router-dom";
import {useState} from "react";

// Components
import MoodContainer from "../../components/moodcontainer/MoodContainer.jsx";
import Button from "../../components/button/Button.jsx";

// Assets
import comedy from "../../assets/images/mood-laugh.jpg"
import adventure from "../../assets/images/mood-adventurous.jpg"
import fantasy from "../../assets/images/mood-otherworldly.jpg"
import horror from "../../assets/images/mood-scary.jpg"
import drama from "../../assets/images/mood-sad.jpg"

// Styles
import "./Suggestion.css"

function Suggestion() {
    const navigate = useNavigate();

    // State om te bepalen of er op films of series geselecteerd gaat worden
    const [isMovie, setIsMovie] = useState(true);

    const moods = [
        {mood: "Van de bank te rollen van het lachen", genre: "komische", image: comedy},
        {mood: "Op het puntje van je stoel te zitten", genre: "spannende", image: adventure},
        {mood: "De stuipen op het lijf gejaagd te worden", genre: "enge", image: horror},
        {mood: "In een andere wereld te belanden", genre: "fantasierijke", image: fantasy},
        {mood: "Met een doos tissues op de bank te zitten", genre: "dramatische", image: drama},
    ];

    function clickHandler(genre) {
        const type = isMovie ? "films" : "series";
        const url = `/suggestie/${genre}-${type}/1`
        navigate(url);
    }

    return (
        <div className="page-outer-container">
            <h1 className="suggestion-title">Heb jij zin om: </h1>
            <div className="suggestion-page-button-container">
                <Button
                    type="button"
                    clickHandler={() => setIsMovie(true)}
                    disabled={isMovie}
                    name={isMovie ? "active-suggestion-button" : "inactive-suggestion-button"}
                >
                    Films
                </Button>
                <Button
                    type="button"
                    clickHandler={() => setIsMovie(false)}
                    disabled={!isMovie}
                    name={!isMovie ? "active-suggestion-button" : "inactive-suggestion-button"}
                >
                    Series
                </Button>
            </div>
            <div className="suggestion-page-mood-container">
                {moods && moods.map(({mood, genre, image}) => (
                    <MoodContainer
                        key={genre}
                        mood={mood}
                        image={image}
                        imageDescription={`Mood image for ${isMovie ? "movies" : "series"}`}
                        onClick={() => clickHandler(genre)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Suggestion;
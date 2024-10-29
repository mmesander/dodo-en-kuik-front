// Functions
import {useNavigate} from "react-router-dom";

// Components
import MoodContainer from "../../components/moodcontainer/MoodContainer.jsx";

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

    function clickHandler(mood) {
        const url = `/suggestie/${mood}/1`;
        navigate(url);
    }



    return(
        <div className="page-outer-container">
            <h1 className="suggestion-title">Heb jij zin om: </h1>
            <div className="suggestion-page-mood-container">
                <MoodContainer
                    mood="van de bank te rollen van het lachen"
                    image={comedy}
                    imageDescription={"mood image for comedy movies"}
                    // onClick={() => clickHandler()}
                />
            </div>
        </div>


    );
}

export default Suggestion;
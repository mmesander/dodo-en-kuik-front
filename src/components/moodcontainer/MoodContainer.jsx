// Functions
import PropTypes from "prop-types";

// Styles
import "./MoodContainer.css";

MoodContainer.propTypes = {
    mood: PropTypes.string,
    image: PropTypes.any,
    imageDescription: PropTypes.string,
    onClick: PropTypes.func,
}

function MoodContainer({mood, image, imageDescription, onClick}) {
    return(
        <>
            <button
                type="button"
                className="mood-button"
                onClick={onClick}
            >
                <div className="mood-inner-container">
                    <img src={image} alt={imageDescription}/>
                    <h4>{mood}</h4>
                </div>
            </button>
        </>
    );
}

export default MoodContainer;
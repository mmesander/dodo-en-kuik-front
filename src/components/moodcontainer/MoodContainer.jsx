// Functions
import PropTypes from "prop-types";

// Styles
import "./MoodContainer.css";

MoodContainer.propTypes = {
    mood: PropTypes.string,
    image: PropTypes.any,
    imageDescription: PropTypes.string,
    clickHandler: PropTypes.func,
}

function MoodContainer({mood, image, imageDescription, clickHandler}) {
    return(
        <>
            <button
                type="button"
                className="mood-button"
                onClick={clickHandler}
            >
                <div className="mood-inner-conainter">
                    <img src={image} alt={imageDescription}/>
                    <h4>{mood}</h4>
                </div>
            </button>
        </>
    );
}

export default MoodContainer;
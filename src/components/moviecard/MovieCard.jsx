// Functions
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

// Helpers
import roundRating from "../../helpers/roundRating.jsx";

// Assets
import favoriteIcon from '../../assets/icons/heart-straight-fill.svg';
import watchlistIcon from '../../assets/icons/eye-fill.svg';
import watchedIcon from '../../assets/icons/check-fat-fill.svg';
import noImage from '../../assets/images/no-image.png';

// Styles
import "./MovieCard.css";

MovieCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.any,
    rating: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    isMovie: PropTypes.bool,
}

function MovieCard({title, image, rating, id, name, isMovie}) {
    const navigate = useNavigate();
    const roundedRating = roundRating(rating);

    function clickHandler() {
        if (id && isMovie) {
            navigate(`/film-details/${id}`);
        }
        if (id && !isMovie) {
            navigate(`/serie-details/${id}`);
        }
    }

    return (
        <button
            type="button"
            className="movie-card-container-button"
            onClick={clickHandler}
        >
            <div className="movie-card-container">
                <section className="movie-card-header-section">
                    {title && !name && <div>
                        {image && <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title}/>}
                        {!image && <img src={noImage} alt="geen foto beschikbaar"/>}
                        {title.length < 40 && <h3>{title}</h3>}
                        {title.length > 40 && title.length < 60 && <h4>{title}</h4>}
                        {title.length > 60 && <h3>{title.slice(0, 40)}...</h3>}
                    </div>}
                    {name && !title && <div>
                        {image && <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={name}/>}
                        {!image && <img src={noImage} alt="geen foto beschikbaar"/>}
                        {name.length < 40 && <h3>{name}</h3>}
                        {name.length > 40 && !name.length < 40 && <h4>{name}</h4>}
                        {name.length > 60 && <h3>{name.slice(0, 40)}...</h3>}
                    </div>}
                    <div className="movie-card-rating">
                        <h4>Rating: <span>{roundedRating}</span></h4>
                    </div>
                </section>
                <section className="icons-container">
                    <div
                        // className={(favoriteMovieActive || favoriteSeriesActive) ? "active-favorite-icon" : "default-icon"}
                        className="default-icon"
                    >
                        <img src={favoriteIcon} alt="favorite-icon"/>
                    </div>
                    <div
                        // className={(watchlistMovieActive || watchlistSeriesActive) ? "active-watchlist-icon" : "default-icon"}
                        className="default-icon"
                    >
                        <img src={watchlistIcon} alt="watchlist-icon"/>
                    </div>
                    <div
                        // className={(watchedMovieActive || watchedSeriesActive) ? "active-watched-icon" : "default-icon"}
                        className="default-icon"
                    >
                        <img src={watchedIcon} alt="watched-icon"/>
                    </div>
                </section>
            </div>
        </button>
    );
}

export default MovieCard;
// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import {ListsContext} from "../../context/ListsContext.jsx";

// Components
import Button from "../../components/button/Button.jsx";

// Helpers
import formatDate from "../../helpers/formatDate.jsx";
import roundRating from "../../helpers/roundRating.jsx";

// Assets
import favoriteIcon from "../../assets/icons/heart-straight-fill.svg"
import watchlistIcon from "../../assets/icons/eye-fill.svg";
import watchedIcon from "../../assets/icons/check-fat-fill.svg";
import noImage from "../../assets/images/no-image.png"

// Styles
import "./Details.css"

function MovieDetails() {
    const navigate = useNavigate();
    const {movieId} = useParams();
    const {listItem, setListItem} = useContext(ListsContext);

    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const favoriteActive = listItem.favoriteMovies.includes(movieId);
    const watchlistActive = listItem.watchlistMovies.includes(movieId);
    const watchedActive = listItem.watchedMovies.includes(movieId);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EzZjI4Y2ZkYjYxOTlhODNhNjllMjM3ZTI1Njk2ZCIsInN1YiI6IjY0NjNkODg0ODgwYzkyMDBlMjE0YmE0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hbsC279ba_99HnoNH-ATPa1rw1BasC-GoesxYDDBXZc`
        }
    };

    useEffect(() => {
        async function fetchMovieDetails(id) {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
                if (response.data) {
                    setError(false);
                }
                console.log(response.data);
                setDetails(response.data);
                setGenres(response.data.genres);
            } catch (error) {
                setError(true);
                console.error(error);
            }
            setLoading(false);
        }

        void fetchMovieDetails(movieId);
    }, []);

    function setFavorite() {
    }

    function setWatchlist() {
    }

    function setWatched() {
    }

    return (
        <>
            <div className="page-outer-container">
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                <div className="details-inner-container">
                    <section className="details-image-section">
                        {details.poster_path && <img
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            alt={details.title}
                        />}
                        {!details.poster_path && <img
                            src={noImage}
                            alt="Geen foto beschikbaar"
                        />}
                    </section>
                    <article className="details-content">
                        <section>
                            <h1>{details.title}</h1>
                            {details.release_date && <p className="details-release-date">
                                {formatDate(details.release_date)}
                            </p>}
                            {!details.release_date && <p className="details-release-date">
                                (No date available)
                            </p>}
                            <h4 className="details-tagline">{details.tagline}</h4>
                            <div className="details-icons-container">
                                <Button
                                    type="button"
                                    name={favoriteActive ? "active-favorite-button" : "inactive-favorite-button"}
                                    clickHandler={() => setFavorite(movieId)}
                                >
                                    <img src={favoriteIcon} alt="favorites-icon"/>
                                </Button>
                                <Button
                                    type="button"
                                    name={watchlistActive ? "active-favorite-button" : "inactive-favorite-button"}
                                    clickHandler={() => setWatchlist(movieId)}
                                >
                                    <img src={watchlistIcon} alt="watchlist-icon"/>
                                </Button>
                                <Button
                                    type="button"
                                    name={watchedActive ? "active-favorite-button" : "inactive-favorite-button"}
                                    clickHandler={() => setWatched(movieId)}
                                >
                                    <img src={watchedIcon} alt="watched-icon"/>
                                </Button>
                            </div>
                            <h2>Rating: <span>{details.vote_average}</span></h2>
                            {genres.length > 0 && <ul>
                                {genres.map((genre) => {
                                    return <li key={genre.id}>{genre.name}</li>
                                })}
                            </ul>}
                            <h3>Omschrijving:</h3>
                            <p>{details.overview}</p>
                        </section>
                        <Button
                            type="button"
                            name="back-to-previous-page"
                            clickHandler={() => navigate(-1)}
                        >
                            Terug naar vorige pagina
                        </Button>
                    </article>
                </div>
            </div>
        </>
    )


}

export default MovieDetails;
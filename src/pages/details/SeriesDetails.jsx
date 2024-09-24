// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import {AuthContext} from "../../context/AuthContext.jsx";

// Components
import Button from "../../components/button/Button.jsx"

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

function SeriesDetails() {
    const navigate = useNavigate();
    const {seriesId} = useParams();
    const {user} = useContext(AuthContext);

    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);
    const [providerMessage, setProviderMessage] = useState("This series is not available for streaming yet");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const id = parseInt(seriesId);

    const favoriteInitialState = user && user.favoriteSeries ? user.favoriteSeries.includes(id) : false;
    const watchlistInitialState = user && user.watchlistSeries ? user.watchlistSeries.includes(id) : false;
    const watchedInitialState = user && user.watchedSeries ? user.watchedSeries.includes(id) : false;

    const [favoriteActive, setFavoriteActive] = useState(favoriteInitialState);
    const [watchlistActive, setWatchlistActive] = useState(watchlistInitialState);
    const [watchedActive, setWatchedActive] = useState(watchedInitialState);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    // Data ophalen bij mounten van de pagina
    useEffect(() => {
        async function fetchSeriesDetails(id) {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, options);
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

        async function fetchWatchProviders(id) {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers`, options);
                if (response.data) {
                    setError(false);
                }

                if (response.data.results.NL) {
                    if (response.data.results.NL.flatrate) {
                        setProviders(response.data.results.NL.flatrate);
                        setProviderMessage("Stream on:")
                    } else {
                        setProviderMessage("This series is not available for streaming yet");
                    }
                }

                console.log(response.data.results);
            } catch (error) {
                setError(true);
                console.error(error);
            }
            setLoading(false);
        }

        void fetchSeriesDetails(id);
        void fetchWatchProviders(id);
    }, [])

    // Clickhandlers voor de buttons/icons
    function setFavorite(id) {
        if (user.favoriteSeries.includes(parseInt(id))) {
            void removeSeriesFromList(parseInt(id), "favorites");
        }

        if (!user.favoriteSeries.includes(parseInt(id))) {
            void addSeriesToList(parseInt(id), "favorites");
        }
    }

    function setWatchlist(id) {
        if (user.watchlistSeries.includes(parseInt(id))) {
            void removeSeriesFromList(parseInt(id), "watchlist");
        }

        if (!user.watchlistSeries.includes(parseInt(id))) {
            void addSeriesToList(parseInt(id), "watchlist");
        }
    }

    function setWatched(id) {
        if (user.watchedSeries.includes(parseInt(id))) {
            void removeSeriesFromList(parseInt(id), "watched");
        }

        if (!user.watchedSeries.includes(parseInt(id))) {
            void addSeriesToList(parseInt(id), "watched");
        }
    }

    // Data toevoegen en verwijderen van de database en context voor styling
    async function addSeriesToList(id, list) {
        const storedToken = localStorage.getItem("token");
        try {
            const response = await axios.put(`http://localhost:8088/users/auth/${user.username.toLowerCase()}/series/${list}`, {
                    id: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                });
            if (response.data) {
                user.favoriteSeries = response.data.favoriteSeries;
                user.watchlistSeries = response.data.watchlistSeries;
                user.watchedSeries = response.data.watchedSeries;
            }

            if (list === "favorites") {
                setFavoriteActive(true);
            }

            if (list === "watchlist") {
                setWatchlistActive(true);
            }

            if (list === "watched") {
                setWatchedActive(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function removeSeriesFromList(id, list) {
        const storedToken = localStorage.getItem("token");
        try {
            const response = await axios.delete(`http://localhost:8088/users/auth/${user.username.toLowerCase()}/series/${list}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                },
                data: {
                    id: id
                }
            })
            if (response.data) {
                user.favoriteSeries = response.data.favoriteSeries;
                user.watchlistSeries = response.data.watchlistSeries;
                user.watchedSeries = response.data.watchedSeries;
            }

            if (list === "favorites") {
                setFavoriteActive(false);
            }

            if (list === "watchlist") {
                setWatchlistActive(false);
            }

            if (list === "watched") {
                setWatchedActive(false);
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="page-outer-container">
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                <div className="details-inner-container">
                    <section className="details-image-container">
                        {details.poster_path && <img
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                            alt={details.name}
                        />}
                        {!details.poster_path && <img
                            src={noImage}
                            alt="Geen foto beschikbaar"
                        />}
                    </section>
                    <article className="details-content-container">
                        <section>
                            <h1>{details.name}</h1>
                            {details.first_air_date && <p className="details-release-date">
                                {formatDate(details.first_air_date)}
                            </p>}
                            {!details.first_air_date && <p className="details-release-date">
                                (No date available)
                            </p>}
                            <h4 className="details-tagline">{details.tagline}</h4>
                            <div className="details-icons-container">
                                <Button
                                    type="button"
                                    name={favoriteActive ? "active-favorite-button" : "inactive-favorite-button"}
                                    clickHandler={() => setFavorite(seriesId)}
                                >
                                    <img src={favoriteIcon} alt="favorites-icon"/>
                                </Button>
                                <Button
                                    type="button"
                                    name={watchlistActive ? "active-watchlist-button" : "inactive-watchlist-button"}
                                    clickHandler={() => setWatchlist(seriesId)}
                                >
                                    <img src={watchlistIcon} alt="watchlist-icon"/>
                                </Button>
                                <Button
                                    type="button"
                                    name={watchedActive ? "active-watched-button" : "inactive-watched-button"}
                                    clickHandler={() => setWatched(seriesId)}
                                >
                                    <img src={watchedIcon} alt="watched-icon"/>
                                </Button>
                            </div>
                            <div className="vote-container">
                                <h2>Rating: <span>{roundRating(details.vote_average)}</span></h2>
                                <h3>User votes: <span>{details.vote_count}</span></h3>
                            </div>
                            <div className="seasons-container">
                                <h3>Seasons: <span>{details.number_of_seasons}</span></h3>
                                <h3>Episodes: <span>{details.number_of_episodes}</span></h3>
                            </div>
                            {genres.length > 0 && <ul className="genres-container">
                                {genres.map((genre) => {
                                    return <li key={genre.id}>{genre.name}</li>
                                })}
                            </ul>}
                            <div className="providers-container">
                                {<h4>{providerMessage}</h4>}
                                {providers && providers.length > 0 && <ul>
                                    {providers.map((provider) => {
                                        return <li key={provider.provider_id}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                                alt="Provider logo"/></li>
                                    })}
                                </ul>}
                            </div>
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

export default SeriesDetails;
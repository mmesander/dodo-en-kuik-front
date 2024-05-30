// Functions
import {useContext, useEffect, useState} from "react";

// Context
import {AuthContext} from "../../context/AuthContext.jsx";

// Components
import MovieCard from "../../components/moviecard/MovieCard.jsx";

// Helpers
import fetchListsData from "../../helpers/fetchListsData.jsx";

// Styles
import "./Lists.css"
import {Link} from "react-router-dom";

function ListsWatched() {
    const {user} = useContext(AuthContext);

    const [watchedMoviesArray, setWatchedMoviesArray] = useState([]);
    const [watchedSeriesArray, setWatchedSeriesArray] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EzZjI4Y2ZkYjYxOTlhODNhNjllMjM3ZTI1Njk2ZCIsInN1YiI6IjY0NjNkODg0ODgwYzkyMDBlMjE0YmE0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hbsC279ba_99HnoNH-ATPa1rw1BasC-GoesxYDDBXZc`,
        }
    };

    useEffect(() => {
        if (user && user.watchedMovies) {
            user.watchedMovies.map((watched) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/movie/${watched}`,
                    options,
                    setLoading,
                    setError,
                    setWatchedMoviesArray
                );
            });
        }

        if (user && user.watchedSeries) {
            user.watchedSeries.map((watched) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/tv/${watched}`,
                    options,
                    setLoading,
                    setError,
                    setWatchedSeriesArray
                );
            });
        }

    }, [user]);

    return (
        <>
            <div className="page-outer-container">
                <h1 className="lists-titles"><Link to="/lijsten">Terug naar overzicht</Link></h1>
                <div className="list-container">
                    {watchedMoviesArray.length > 0 && watchedMoviesArray.map((watched) => {
                        return <MovieCard
                            key={watched.id}
                            title={watched.title}
                            image={watched.poster_path}
                            rating={watched.vote_average}
                            id={watched.id}
                            isMovie={true}
                        />
                    })}

                    {watchedSeriesArray.length > 0 && watchedSeriesArray.map((watched) => {
                        return <MovieCard
                            key={watched.id}
                            name={watched.name}
                            image={watched.poster_path}
                            rating={watched.vote_average}
                            id={watched.id}
                            isMovie={false}
                        />
                    })}

                    {!loading && !error && watchedMoviesArray.length === 0 && watchedSeriesArray.length === 0 &&
                        <h3 className="no-items-message">Je hebt nog geen items aan al gezien toegevoegd!</h3>}
                    {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
                </div>
            </div>
        </>
    );
}

export default ListsWatched;
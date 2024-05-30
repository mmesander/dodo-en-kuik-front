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

function ListsWatchlist() {
    const {user} = useContext(AuthContext);

    const [watchlistMoviesArray, setWatchlistMoviesArray] = useState([]);
    const [watchlistSeriesArray, setWatchlistSeriesArray] = useState([]);

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
        if (user && user.watchlistMovies) {
            user.watchlistMovies.map((watchlist) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/movie/${watchlist}`,
                    options,
                    setLoading,
                    setError,
                    setWatchlistMoviesArray
                );
            });
        }

        if (user && user.watchlistSeries) {
            user.watchlistSeries.map((watchlist) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/tv/${watchlist}`,
                    options,
                    setLoading,
                    setError,
                    setWatchlistSeriesArray
                );
            });
        }

    }, [user]);

    return (
        <>
            <div className="page-outer-container">
                <h1 className="lists-titles"><Link to="/lijsten">Terug naar overzicht</Link></h1>
                <div className="list-container">
                    {watchlistMoviesArray.length > 0 && watchlistMoviesArray.map((watchlist) => {
                        return <MovieCard
                            key={watchlist.id}
                            title={watchlist.title}
                            image={watchlist.poster_path}
                            rating={watchlist.vote_average}
                            id={watchlist.id}
                            isMovie={true}
                        />
                    })}

                    {watchlistSeriesArray.length > 0 && watchlistSeriesArray.map((watchlist) => {
                        return <MovieCard
                            key={watchlist.id}
                            name={watchlist.name}
                            image={watchlist.poster_path}
                            rating={watchlist.vote_average}
                            id={watchlist.id}
                            isMovie={false}
                        />
                    })}

                    {!loading && !error && watchlistMoviesArray.length === 0 && watchlistSeriesArray.length === 0 &&
                        <h3 className="no-items-message">Je hebt nog geen items aan je watchlist toegevoegd</h3>}
                    {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
                </div>
            </div>
        </>
    );
}

export default ListsWatchlist;
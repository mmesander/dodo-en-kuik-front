// Functions
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import fetchListsData from "../../helpers/fetchListsData.jsx";
import MovieCard from "../../components/moviecard/MovieCard.jsx";

function Lists() {
    const {user} = useContext(AuthContext);

    const [favoriteMoviesArray, setFavoriteMoviesArray] = useState([]);
    const [watchlistMoviesArray, setWatchlistMoviesArray] = useState([]);
    const [watchedMoviesArray, setWatchedMoviesArray] = useState([]);

    const [favoriteSeriesArray, setFavoriteSeriesArray] = useState([]);
    const [watchlistSeriesArray, setWatchlistSeriesArray] = useState([]);
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
        if (user && user.favoriteMovies) {
            user.favoriteMovies.map((favorite) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/movie/${favorite}`,
                    options,
                    setLoading,
                    setError,
                    setFavoriteMoviesArray
                );
            });
        }

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

        if (user && user.favoriteSeries) {
            user.favoriteSeries.map((favorite) => {
                void fetchListsData(
                    `https://api.themoviedb.org/3/tv/${favorite}`,
                    options,
                    setLoading,
                    setError,
                    setFavoriteSeriesArray
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
                <h1 className="lists-titles">Favorieten</h1>
                <div className="list-container">
                    {favoriteMoviesArray.length > 0 && favoriteMoviesArray.map((favorite) => {
                        return <MovieCard
                            key={favorite.id}
                            title={favorite.title}
                            image={favorite.poster_path}
                            rating={favorite.vote_average}
                            id={favorite.id}
                            isMovie={true}
                        />
                    })}
                </div>
            </div>
        </>
    );
}

export default Lists;
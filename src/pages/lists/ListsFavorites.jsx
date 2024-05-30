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

function ListsFavorites() {
    const {user} = useContext(AuthContext);

    const [favoriteMoviesArray, setFavoriteMoviesArray] = useState([]);
    const [favoriteSeriesArray, setFavoriteSeriesArray] = useState([]);

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

    }, [user]);

    return (
        <>
            <div className="page-outer-container">
                <h1 className="lists-titles"><Link to="/lijsten">Terug naar overzicht</Link></h1>
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

                    {favoriteSeriesArray.length > 0 && favoriteSeriesArray.map((favorite) => {
                        return <MovieCard
                            key={favorite.id}
                            name={favorite.name}
                            image={favorite.poster_path}
                            rating={favorite.vote_average}
                            id={favorite.id}
                            isMovie={false}
                        />
                    })}

                    {!loading && !error && favoriteMoviesArray.length === 0 && favoriteSeriesArray.length === 0 &&
                        <h3 className="no-items-message">Je hebt nog geen items aan je favorieten toegevoegd!</h3>}
                    {loading && <h3 className="loading-message">Je lijst wordt opgehaald... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden</h3>}
                </div>
            </div>
        </>
    );
}

export default ListsFavorites;
// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// Components
import Button from "../../components/button/Button.jsx";
import MovieCard from "../../components/moviecard/MovieCard.jsx"

// Styles
import "../home/Home.css"

function TrendingMovies() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const pageNumber = useParams().pageId;
    const [page, setPage ] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState({});

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }
    };

    useEffect(() => {
        if (page >= 1) {
            void fetchMovies()
            void fetchSeries()
        }
        updateUrl();
    }, [page]);

    function updateUrl() {
        const newUrl = `/trending-films/${page}`;
        navigate(newUrl, {replace: true});
    }

    async function fetchMovies() {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?page=${page}`, options);
            if (response.data) {
                setError(false);
            }
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    async function fetchSeries() {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?page=1`, options);
            if (response.data) {
                setError(false);
            }
            setSeries(response.data.results);

        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="page-outer-container">
                <h1 className="home-titles">
                    Trending Movies
                </h1>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                <div className="button-set-page-section">
                    <Button
                        type="button"
                        clickHandler={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Vorige
                    </Button>
                    <Button
                        type="button"
                        clickHandler={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Volgende
                    </Button>
                </div>
                <div className="home-inner-container">
                    {movies && Object.keys(movies).length > 0 && movies.map((movie) => {
                        return <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={movie.poster_path}
                            rating={movie.vote_average}
                            id={movie.id}
                            isMovie={true}
                        />
                    })}
                </div>
                <Button
                    type="button"
                    name="active-home-results-button"
                    clickHandler={() => navigate("/")}
                >
                    Laat minder films zien
                </Button>
                <h1 className="home-titles">Trending Series</h1>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
                <div className="home-inner-container">
                    {series && Object.keys(series).length > 0 && series.slice(0, 5).map((tv) => {
                        return <MovieCard
                            key={tv.id}
                            name={tv.name}
                            image={tv.poster_path}
                            rating={tv.vote_average}
                            id={tv.id}
                            isMovie={false}
                        />
                    })}
                    <Button
                        type="button"
                        name="inactive-home-results-button"
                        clickHandler={() => navigate("/trending-series/1")}
                    >
                        Laat meer series zien
                    </Button>
                </div>
            </div>
        </>
    );
}

export default TrendingMovies;
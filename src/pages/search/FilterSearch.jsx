// Functions
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// Components
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import "./Search.css";

function FilterSearch() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const pageNumber = useParams().filterId;
    const isMovie = searchParams.get('is_movie');
    const sortOrder = searchParams.get('sort');
    const endpoint = searchParams.get('endpoint');
    const rating = searchParams.get('rating');
    const minRatingUrl = searchParams.get('min_rating');
    const maxRatingUrl = searchParams.get('max_rating');
    const genres = searchParams.get('genres');
    //endpoint, page, order, ratingString,genreString

    const [searchResults, setSearchResults] = useState({});
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }
    };

    useEffect(() => {
        if (page >= 1) {
            void fetchFilterSearch(endpoint, page, sortOrder, rating, genres);
            updateUrl();
        }
    }, [page]);

    function updateUrl() {
        const newUrl = `/zoeken/filter/${page}/?is_movie=${encodeURIComponent(isMovie)}&genres=${encodeURIComponent(genres)}&rating=${encodeURIComponent(rating)}&sort=${encodeURIComponent(sortOrder)}&endpoint=${encodeURIComponent(endpoint)}&min_rating=${encodeURIComponent(minRatingUrl)}&max_rating=${encodeURIComponent(maxRatingUrl)}`
        navigate(newUrl, {replace: true})
    }

    async function fetchFilterSearch(endpoint, page, sortOrder, rating, genres) {
        setLoading(true);
        try {
            const response = await axios.get(`${endpoint}+${page}${sortOrder}${rating}${genres}`, options);
            if (response.data) {
                setError(false);
            }
            setSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div className="page-outer-container">
            <button
                className="button-to-overview"
                type="button"
                onClick={() => navigate(-1)}
            >
                Terug naar de zoekpagina
            </button>
            {Object.keys(searchResults).length > 0 &&
                <h2 className="specific-search-title">{`Dit zijn de resultaten voor de toegepaste filters:`}</h2>}
            {Object.keys(searchResults).length === 0 &&
                <h2 className="specific-search-title">{`Er zijn geen resultaten gevonden met de toegepaste filters`}</h2>}
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
            <div className="search-specific-inner-container">
                {Object.keys(searchResults).length > 0 && searchResults.map((search) => {
                    if (search.name) {
                        return <MovieCard
                            key={search.id}
                            name={search.name}
                            image={search.poster_path}
                            rating={search.vote_average}
                            id={search.id}
                            isMovie={false}
                        />
                    } else if (search.title) {
                        return <MovieCard
                            key={search.id}
                            title={search.title}
                            image={search.poster_path}
                            rating={search.vote_average}
                            id={search.id}
                            isMovie={true}
                        />
                    }
                })}
            </div>
        </div>
    )
}

export default FilterSearch;
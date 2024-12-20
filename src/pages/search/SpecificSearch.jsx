// Functions
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

// Components
import Button from "../../components/button/Button";
import MovieCard from "../../components/moviecard/MovieCard";

// Styles
import "./Search.css";

function SpecificSearch() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('zoekopdracht');
    const pageNumber = useParams().searchId;

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
            void fetchSpecificSearch(search);
            updateUrl();
        }
    }, [page]);

    function updateUrl() {
        const newUrl = `/zoeken/specifiek/${page}/?zoekopdracht=${search}`
        navigate(newUrl, {replace: true})
    }

    async function fetchSpecificSearch(search) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
            if (response.data) {
                setError(false);
            }
            setSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (e) {
            setError(true);
            console.error(e);
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
                <h2 className="specific-search-title">{`Dit zijn de resultaten voor '${search}'`}</h2>}
            {Object.keys(searchResults).length === 0 &&
                <h2 className="specific-search-title">{`Er zijn geen resultaten gevonden voor '${search}'`}</h2>}
            <div className="loading-error-section">
                {loading && <h3 className="loading-message">Laden... </h3>}
                {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
            </div>
            <div className="button-set-page-section">
                <Button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Vorige
                </Button>
                <Button
                    type="button"
                    onClick={() => setPage(page + 1)}
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

export default SpecificSearch;
// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// Components
import MovieCard from "../../components/moviecard/MovieCard";

// Helpers
import createEndpointStrings from "../../helpers/createEndpointStrings.jsx";

// Styles
import "./Suggestion.css"
import Button from "../../components/button/Button.jsx";

function SpecificSuggestion() {
    const navigate = useNavigate();

    const pageNumber = useParams().pageId;
    const chosenSuggestion = useParams().moodId.toString();
    const [genre, type] = chosenSuggestion.split('-');

    const [genreString, typeString] = createEndpointStrings(genre, type);

    const [results, setResults] = useState({});
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
            void fetchResults(genreString, typeString);
            console.log(results)
            console.log(type)
            updateUrl();
        }
    }, [page]);

    function updateUrl() {
        const newUrl = `/suggestie/${chosenSuggestion}/${page}`;
        navigate(newUrl, {replace: true});
    }

    async function fetchResults(genre, type) {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`, options);
            if (response.data) {
                setError(false);
            }
            setResults(response.data.results);
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
            <h2 className="suggestion-title">Je hebt gekozen voor <span>{genre} {type}</span></h2>
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
            <div className="specific-suggestion-inner-container">
                {Object.keys(results).length > 0 && results.map((result) => {
                    if (type === "films") {
                        return <MovieCard
                            key={result.id}
                            title={result.title}
                            image={result.poster_path}
                            rating={result.vote_average}
                            id={result.id}
                            isMovie={true}
                        />
                    } else if (type === "series") {
                        return <MovieCard
                            key={result.id}
                            name={result.name}
                            image={result.poster_path}
                            rating={result.vote_average}
                            id={result.id}
                            isMovie={false}
                        />
                    }
                })}
            </div>
        </div>
    );

}

export default SpecificSuggestion;
// Functions
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// Components

// Helpers
import createEndpointStrings from "../../helpers/createEndpointStrings.jsx";

// Styles
import "./Suggestion.css"

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
        </div>
    );

}

export default SpecificSuggestion;
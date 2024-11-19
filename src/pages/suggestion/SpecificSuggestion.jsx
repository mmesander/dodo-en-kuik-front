// Functions

// Components

// Styles

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function SpecificSuggestion() {
    const navigate = useNavigate();
    const location = useLocation();

    const pageNumber = useParams().pageId;
    const chosenSuggestion = useParams().moodId.toString();
    const [genre, type] = chosenSuggestion.split('-');

    const [results, setResults] = useState({});
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        console.log(genre)
        console.log(type)
    }, []);



}

export default SpecificSuggestion;
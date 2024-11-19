// Functions
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// Components

// Styles


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



    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }
    };

    useEffect(() => {
        console.log(genre)
        console.log(type)
    }, []);

    // async function fetchResults(genre, type) {
    //     setLoading(true);
    //
    //
    //
    // }

}

export default SpecificSuggestion;
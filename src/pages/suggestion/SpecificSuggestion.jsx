// Functions

// Components

// Styles

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function SpecificSuggestion() {
    const navigate = useNavigate();
    const location = useLocation();

    const pageNumber = useParams().pageId;
    const chosenSuggestion = useParams().moodId.toString();

    const [genre, type] = chosenSuggestion.split('-');

    useEffect(() => {
        console.log(genre)
        console.log(type)
    }, []);



}

export default SpecificSuggestion;
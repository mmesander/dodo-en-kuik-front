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

function ListsFavorites() {
    return (
        <h1>favorieten</h1>
    )
}

export default ListsFavorites;
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function Search() {
    // General
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const pageNumber = useParams().filterId;
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    // Specific Search
    const [specificSearch, setSpecificSearch] = useState("");

    // Filter Search
    const [filtersActive, setFiltersActive] = useState(false);
    const [filterSearchResults, setFilterSearchResults] = useState({});
    const [isMovie, setIsMovie] = useState(true);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [sortBy, setSortBy] = useState("&sort_by=popularity.desc");
    const [genresList, setGenresList] = useState({
        movieGenres: [],
        seriesGenres: [],
    });

    const movieGenresIds = [
        {name: "Actie", id: 28},
        {name: "Animatie", id: 16},
        {name: "Avontuur", id: 12},
        {name: "Documentaire", id: 99},
        {name: "Drama", id: 18},
        {name: "Familie", id: 10751},
        {name: "Fantasie", id: 14},
        {name: "Historisch", id: 36},
        {name: "Horror", id: 27},
        {name: "Komedie", id: 35},
        {name: "Misdaad", id: 80},
        {name: "Muziek", id: 10402},
        {name: "Mysterie", id: 9648},
        {name: "Oorlog", id: 10752},
        {name: "Romantiek", id: 10749},
        {name: "Sciencefiction", id: 878},
        {name: "TV Film", id: 10770},
        {name: "Thriller", id: 53},
        {name: "Western", id: 37}
    ];

    const seriesGenresIds = [
        {name: "Actie & Avontuur", id: 10759},
        {name: "Animatie", id: 16},
        {name: "Documentaire", id: 99},
        {name: "Drama", id: 18},
        {name: "Familie", id: 10751},
        {name: "Kids", id: 10762},
        {name: "Komedie", id: 35},
        {name: "Misdaad", id: 80},
        {name: "Mysterie", id: 9648},
        {name: "News", id: 10763},
        {name: "Reality", id: 10764},
        {name: "Sci-Fi & Fantasy", id: 10765},
        {name: "Soap", id: 10766},
        {name: "Talk", id: 10767},
        {name: "War & Politics", id: 10768},
        {name: "Western", id: 37}
    ];

    const sortByMovies = [
        {name: "Populariteit - Aflopend", string: "&sort_by=popularity.desc"},
        {name: "Populariteit - Oplopend", string: "&sort_by=popularity.asc"},
        {name: "Beoordeling - Aflopend", string: "&sort_by=vote_average.desc"},
        {name: "Beoordeling - Oplopend", string: "&sort_by=vote_average.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=primary_release_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=primary_release_date.asc"},
    ];

    const sortBySeries = [
        {name: "Populariteit - Aflopend", string: "&sort_by=popularity.desc"},
        {name: "Populariteit - Oplopend", string: "&sort_by=popularity.asc"},
        {name: "Beoordeling - Aflopend", string: "&sort_by=vote_average.desc"},
        {name: "Beoordeling - Oplopend", string: "&sort_by=vote_average.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=first_air_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=first_air_date.asc"},
    ];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EzZjI4Y2ZkYjYxOTlhODNhNjllMjM3ZTI1Njk2ZCIsInN1YiI6IjY0NjNkODg0ODgwYzkyMDBlMjE0YmE0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hbsC279ba_99HnoNH-ATPa1rw1BasC-GoesxYDDBXZc`,
        }
    };

    // General
    // Hier komt de useEffect

    // Specific Search
    function updateUrl() {}


    // Filter Search
    function handleSortButton() {}
    function handleMovieButton() {}
    function handleSeriesButton() {}
    function handleFilterReset() {}
    function setMovieGenres() {}
    function setSeriesGenres() {}
    async function fetchFilterSearch() {}
    function handleFilterSearch() {}
}

export default Search;
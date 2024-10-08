// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

// Components
import Input from "../../components/inputelements/Input.jsx";
import Button from "../../components/button/Button.jsx";
import InputSlider from "react-input-slider";
import MovieCard from "../../components/moviecard/MovieCard.jsx";

// Helpers
import createGenreArray from "../../helpers/createGenreArray.jsx";
import createFilterStrings from "../../helpers/createFilterString.jsx";
import extractIDs from "../../helpers/extractIDs.jsx";

// Styles
import "./Search.css"

function Search() {
    // General
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const pageNumber = useParams().filterId;
    const [page, setPage] = useState(parseInt(pageNumber) || 1);
    const [totalPages, setTotalPages] = useState(0);

    // Specific Search
    const [specificSearch, setSpecificSearch] = useState("");

    // Filter Search
    const paramIsMovie = searchParams.get("is_movie");
    const paramSortOrder = searchParams.get("sort");
    const paramEndpoint = searchParams.get("endpoint");
    const paramMinRating = searchParams.get("min_rating");
    const paramMaxRating = searchParams.get("max_rating");
    const paramRatingString = searchParams.get("rating");
    const paramGenreString = searchParams.get("genres");

    // Indien er een genrestring in de URL staat wordt deze geinjecteerd in deze arrays, zodat deze als state toegevoegd
    // kan worden aan de genresList state, omdat de genrestring zowel in de movie als series id's worden toegevoegd,
    // wordt bij de useEffect een check gedaan of het een film of serie is en dan wordt de andere array leeg gemaakt.
    const presentMoviesIds = extractIDs(paramGenreString);
    const presentSeriesIds = extractIDs(paramGenreString);

    const [filtersActive, setFiltersActive] = useState(false);
    const [filterSearchResults, setFilterSearchResults] = useState({});
    const [isMovie, setIsMovie] = useState(paramIsMovie === 'true' || true);
    const [endpoint, setEndpoint] = useState('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [sortOrder, setSortOrder] = useState(paramSortOrder || "&sort_by=popularity.desc");
    const [genresList, setGenresList] = useState({
        movieGenres: presentMoviesIds || [],
        seriesGenres: presentSeriesIds || [],
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
        {name: "Aantal stemmen - Aflopend", string: "&sort_by=vote_count.desc"},
        {name: "Aantal stemmen - Oplopend", string: "&sort_by=vote_count.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=primary_release_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=primary_release_date.asc"},
    ];

    const sortBySeries = [
        {name: "Populariteit - Aflopend", string: "&sort_by=popularity.desc"},
        {name: "Populariteit - Oplopend", string: "&sort_by=popularity.asc"},
        {name: "Beoordeling - Aflopend", string: "&sort_by=vote_average.desc"},
        {name: "Beoordeling - Oplopend", string: "&sort_by=vote_average.asc"},
        {name: "Aantal stemmen - Aflopend", string: "&sort_by=vote_count.desc"},
        {name: "Aantal stemmen - Oplopend", string: "&sort_by=vote_count.asc"},
        {name: "Verschijningsdatum - Aflopend", string: "&sort_by=first_air_date.desc"},
        {name: "Verschijningsdatum - Oplopend", string: "&sort_by=first_air_date.asc"},
    ];

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        }
    };

    // General
    useEffect(() => {
        if (page >= 1) {
            if (paramIsMovie && paramSortOrder && paramEndpoint && paramMinRating &&
                paramMaxRating && paramRatingString && paramGenreString
            ) {
                // Om ervoor te zorgen dat deze ID's alleen in de juiste waarde geladen worden, staat deze handeling erin.
                if (paramIsMovie === 'true') {
                    setGenresList({
                        ...genresList,
                        seriesGenres: [],
                    });
                }

                if (paramIsMovie === 'false') {
                    setGenresList({
                        ...genresList,
                        movieGenres: [],
                    });
                }

                // De state wordt weer ingeladen via de parameters die zijn opgeslagen door de handleFilterSearch method
                setIsMovie(paramIsMovie === 'true');
                setMinRating(parseInt(paramMinRating));
                setMaxRating(parseInt(paramMaxRating));

                void fetchFilterSearch(paramEndpoint, page, paramSortOrder, paramGenreString, paramRatingString);

                setFiltersActive(true);

                updateUrl(paramIsMovie, paramGenreString, paramRatingString, paramSortOrder, paramMinRating, paramMaxRating, paramEndpoint);
            } else {
                // Deze is voor het basic overzicht!
                void fetchFilterSearch(endpoint, page, sortOrder);

                setFiltersActive(true);

                updateUrl();
            }
        }
    }, [page]);

    function updateUrl(isMovie, genreString, ratingString, sortOrder, minRating, maxRating, endpoint) {
        if (isMovie && genreString && ratingString && sortOrder && minRating && maxRating && endpoint) {
            const newUrl = `/zoeken/overzicht/${page}/?is_movie=${encodeURIComponent(isMovie)}&genres=${encodeURIComponent(genreString)}&rating=${encodeURIComponent(ratingString)}&sort=${encodeURIComponent(sortOrder)}&min_rating=${encodeURIComponent(minRating)}&max_rating=${encodeURIComponent(maxRating)}&endpoint=${encodeURIComponent(endpoint)}`;
            navigate(newUrl, {replace: true});
        } else {
            const newUrl = `/zoeken/overzicht/${page}`;
            navigate(newUrl, {replace: true});
        }
    }

    // Specific Search
    function handleSpecificSearch(e) {
        e.preventDefault();
        const url = `/zoeken/specifiek/1?zoekopdracht=${encodeURIComponent(specificSearch)}`;
        navigate(`${url}`)
    }

    // Filter Search
    function handleSortOrder(sortString) {
        setSortOrder(sortString);
    }

    function handleSetMovie() {
        setEndpoint('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=');
        setIsMovie(true);
        setFiltersActive(false);
        setMinRating(0);
        setMaxRating(10);
        setGenresList({
            ...genresList,
            seriesGenres: [],
        });
    }

    function handleSetSeries() {
        setEndpoint('https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=');
        setIsMovie(false);
        setFiltersActive(false);
        setMinRating(0);
        setMaxRating(10);
        setGenresList({
            ...genresList,
            movieGenres: [],
        });
    }

    function setMovieGenres(id) {
        const movieGenresArray = createGenreArray(id, genresList.movieGenres);

        setGenresList({
            ...genresList,
            movieGenres: movieGenresArray,
        });
    }

    function setSeriesGenres(id) {
        const seriesGenresArray = createGenreArray(id, genresList.seriesGenres);

        setGenresList({
            ...genresList,
            seriesGenres: seriesGenresArray,
        });
    }

    async function fetchFilterSearch(endpoint, page, sortOrder, genreString, ratingString) {
        setLoading(true);
        try {
            const response = await axios.get(`${endpoint}+${page}${sortOrder}${ratingString}${genreString}`, options);
            if (response.data) {
                setError(false);
            }
            setFilterSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
    }

    // Alternatieve functie die hetzelfde werkt als de specifieke search
    // function handleFilterSearch() {
    //
    //     const [genreString, ratingString] = createFilterStrings(isMovie, genresList, minRating, maxRating);
    //
    //     const url = `/zoeken/filter/1/?is_movie=${encodeURIComponent(isMovie)}&genres=${encodeURIComponent(genreString)}&rating=${encodeURIComponent(ratingString)}&sort=${encodeURIComponent(sortOrder)}&endpoint=${encodeURIComponent(endpoint)}&min_rating=${encodeURIComponent(minRating)}&max_rating=${encodeURIComponent(maxRating)}`;
    //     navigate(`${url}`)
    // }

    // In deze functie worden de zoekfilters opgeslagen in de URL zodat deze info beschikbaar blijft indien er van deze
    // pagina naar een andere pagina wordt genavigeerd en weer terug. Zoals wanneer er een aparte film of iets wordt
    // aangeklikt.
    function handleFilterSearch() {
        setFiltersActive(true);
        setPage(1);

        const [genreString, ratingString] = createFilterStrings(isMovie, genresList, minRating, maxRating);
        void fetchFilterSearch(endpoint, page, sortOrder, genreString, ratingString);

        const newUrl = `/zoeken/overzicht/${page}/?is_movie=${encodeURIComponent(isMovie)}&genres=${encodeURIComponent(genreString)}&rating=${encodeURIComponent(ratingString)}&sort=${encodeURIComponent(sortOrder)}&min_rating=${encodeURIComponent(minRating)}&max_rating=${encodeURIComponent(maxRating)}&endpoint=${encodeURIComponent(endpoint)}`;
        navigate(newUrl, {replace: true});

    }

    return (
        <>
            <div className="search-page-outer-container">
                <section className="filter-search-container">
                    <div className="search-menu-container">
                        <div className="search-menu specific-search">
                            <h2>Zoeken</h2>
                            <p>Zoek hier naar een specifieke film of serie</p>
                            <form onSubmit={handleSpecificSearch}>
                                <Input
                                    type="text"
                                    id="specific-search-input"
                                    name="specific-search"
                                    value={specificSearch}
                                    placeholder="Typ hier je zoekopdracht"
                                    onChange={(e) => setSpecificSearch(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    id="specific-search-button"
                                >
                                    Zoek
                                </Button>
                            </form>
                        </div>
                        <div className="search-menu">
                            <h2>Sorteren</h2>
                        </div>
                        <div className="search-menu search-filter-movies-and-series">
                            <p>Sorteer op:</p>
                            {isMovie && sortByMovies.map((sortBy) => {
                                return <Button
                                    key={sortBy.string}
                                    type="button"
                                    name={sortOrder.includes(sortBy.string) ? "active-filter-button" : "inactive-filter-button"}
                                    clickHandler={() => handleSortOrder(sortBy.string)}
                                >
                                    {sortBy.name}
                                </Button>
                            })}
                            {!isMovie && sortBySeries.map((sortBy) => {
                                return <Button
                                    key={sortBy.string}
                                    type="button"
                                    name={sortOrder.includes(sortBy.string) ? "active-filter-button" : "inactive-filter-button"}
                                    clickHandler={() => handleSortOrder(sortBy.string)}
                                >
                                    {sortBy.name}
                                </Button>
                            })}
                        </div>
                        <div className="search-menu">
                            <h2>Filters</h2>
                        </div>
                        <div className="search-menu search-filter-movies-and-series">
                            <Button
                                type="radio"
                                id="searchfilter-movies"
                                clickHandler={handleSetMovie}
                                name={isMovie ? "active-filter-button" : "inactive-filter-button"}
                            >
                                Ik zoek naar films
                            </Button>
                            <Button
                                type="radio"
                                id="searchfilter-series"
                                clickHandler={handleSetSeries}
                                name={!isMovie ? "active-filter-button" : "inactive-filter-button"}
                            >
                                Ik zoek naar series
                            </Button>
                        </div>
                        <div className="search-menu search-filter-rating-outer-container">
                            <p>Minimale rating:</p>
                            <div className="search-filter-rating-inner-container">
                                <InputSlider
                                    className="rating-slider"
                                    axis="x"
                                    x={minRating}
                                    xstep={1}
                                    xmax={10}
                                    onChange={(value) => setMinRating(value.x)}
                                    styles={{
                                        track: {
                                            backgroundColor: '#171517'
                                        },
                                        active: {
                                            backgroundColor: '#A7EABB'
                                        },
                                        thumb: {
                                            width: 20,
                                            height: 20,
                                            backgroundColor: '#A7EABB'
                                        },
                                        disabled: {
                                            opacity: 0.5
                                        }
                                    }}
                                />
                                <p>{minRating}</p>
                                <p>Maximale Rating:</p>
                                <div className="rating-inner-container">
                                    <InputSlider
                                        axis="x"
                                        x={maxRating}
                                        xstep={1}
                                        xmax={10}
                                        onChange={(value) => setMaxRating(value.x)}
                                        styles={{
                                            track: {
                                                backgroundColor: '#171517'
                                            },
                                            active: {
                                                backgroundColor: '#A7EABB'
                                            },
                                            thumb: {
                                                width: 20,
                                                height: 20,
                                                backgroundColor: '#A7EABB'
                                            },
                                            disabled: {
                                                opacity: 0.5
                                            }
                                        }}
                                    />
                                    <p>{maxRating}</p>
                                </div>
                                {minRating > maxRating &&
                                    <h4 className="rating-error">Maximale rating kan niet kleiner zijn dan minimale
                                        rating
                                        rating</h4>
                                }
                            </div>
                        </div>
                        <div className="search-menu search-filter-genres">
                            <p>Genres:</p>
                            {isMovie && <section>
                                {movieGenresIds && movieGenresIds.map((genre) => {
                                    return <Button
                                        key={genre.id}
                                        type="button"
                                        name={genresList.movieGenres.includes(genre.id) ? "active-genre-button" : "inactive-genre-button"}
                                        clickHandler={() => setMovieGenres(genre.id)}
                                    >
                                        {genre.name}
                                    </Button>
                                })}
                            </section>}
                            {!isMovie && <section>
                                {seriesGenresIds && seriesGenresIds.map((genre) => {
                                    return <Button
                                        key={genre.id}
                                        type="button"
                                        name={genresList.seriesGenres.includes(genre.id) ? "active-genre-button" : "inactive-genre-button"}
                                        clickHandler={() => setSeriesGenres(genre.id)}
                                    >
                                        {genre.name}
                                    </Button>
                                })}
                            </section>}
                        </div>
                        <div className="search-menu">
                            <Button
                                type="button"
                                name="filter-search-button"
                                clickHandler={handleFilterSearch}
                                disabled={minRating > maxRating}
                            >
                                Zoeken
                            </Button>
                        </div>
                    </div>
                    <div className="filter-search-results-outer-container">
                        <div className="loading-error-section">
                            {loading && <h3 className="loading-message">Laden... </h3>}
                            {filterSearchResults.length === 0 &&
                                <h3 className="no-results-filter">Er zijn geen resultaten gevonden!</h3>}
                            {error &&
                                <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                        </div>
                        {filtersActive && (filterSearchResults.length > 1) && <div className="button-set-page-section">
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
                        </div>}
                        <div className="filter-search-results-inner-container">
                            {Object.keys(filterSearchResults).length > 0 && filtersActive && filterSearchResults.map((search) => {
                                if (!isMovie && search.name) {
                                    return <MovieCard
                                        key={search.id}
                                        name={search.name}
                                        image={search.poster_path}
                                        rating={search.vote_average}
                                        id={search.id}
                                        isMovie={false}
                                    />
                                } else if (isMovie && search.title) {
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
                </section>
            </div>
        </>
    )
}

export default Search;
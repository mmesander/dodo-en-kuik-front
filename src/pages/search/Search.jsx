// Functions
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

// Components
import Input from "../../components/inputelements/Input.jsx";
import Button from "../../components/button/Button.jsx";
import InputSlider from "react-input-slider";

// Styles
import "./Search.css"

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
    const [sortOrder, setSortOrder] = useState("&sort_by=popularity.desc");
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

    function updateUrl() {
    }

    // Specific Search
    function handleSpecificSearch() {
    }


    // Filter Search
    function handleSortButton() {
    }

    function handleMovieButton() {
    }

    function handleSeriesButton() {
    }

    function handleFilterReset() {
    }

    function setMovieGenres() {
    }

    function setSeriesGenres() {
    }

    async function fetchFilterSearch() {
    }

    function handleFilterSearch() {
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
                                    clickHandler={() => handleSortButton(sortBy.string)}
                                >
                                    {sortBy.name}
                                </Button>
                            })}
                            {!isMovie && sortBySeries.map((sortBy) => {
                                return <Button
                                    key={sortBy.string}
                                    type="button"
                                    name={sortOrder.includes(sortBy.string) ? "active-filter-button" : "inactive-filter-button"}
                                    clickHandler={() => handleSortButton(sortBy.string)}
                                >
                                    {sortBy.name}
                                </Button>
                            })}
                        </div>
                        <div className="search-menu">
                            <h2>Filters</h2>
                        </div>
                        <div className="search-menu">
                            <Button
                                type="button"
                                name="filter-reset-button"
                                clickHandler={handleFilterReset}
                            >
                                Reset alle filters
                            </Button>
                        </div>
                        <div className="search-menu search-filter-movies-and-series">
                            <Button
                                type="radio"
                                id="searchfilter-movies"
                                clickHandler={handleMovieButton}
                                name={isMovie ? "active-filter-button" : "inactive-filter-button"}
                            >
                                Ik zoek naar films
                            </Button>
                            <Button
                                type="radio"
                                id="searchfilter-series"
                                clickHandler={handleSeriesButton}
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

                    </div>
                </section>
            </div>
        </>
    )
}

export default Search;
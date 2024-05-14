// Functions
import React, {useEffect, useState} from "react";
import axios from "axios";

// Components
import Button from "../../components/button/Button.jsx";

// Styles
import "./Home.css"

function Home() {
    const [movies, setMovies] = useState([]);
    const [moreMovies, setMoreMovies] = useState(false);
    const [moviePage, setMoviePage] = useState(1);
    const [totalMoviePages, setTotalMoviePages] = useState(0);

    const [series, setSeries] = useState({});
    const [moreSeries, setMoreSeries] = useState(false);
    const [seriesPage, setSeriesPage] = useState(1);
    const [totalSeriesPages, setTotalSeriesPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    //     }
    // };



    return (
        <>
            <div className="page-outer-container">
                <h1 className="home-titles">
                    Trending Movies
                </h1>
                <div className="loading-error-section">
                    {loading && <h3 className="loading-message">Laden... </h3>}
                    {error && <h3 className="error-message">Foutmelding: Er kan geen data opgehaald worden!</h3>}
                </div>
            </div>

        </>
    );
}

export default Home;
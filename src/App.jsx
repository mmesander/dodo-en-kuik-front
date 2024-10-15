// Functions
import {Route, Routes} from "react-router-dom";
import {useContext} from "react";

// Context
import {AuthContext} from "./context/AuthContext.jsx";

// Components
import NavBar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";

// Pages
import Home from "./pages/home/Home.jsx";
import TrendingMovies from "./pages/trending/TrendingMovies.jsx";
import TrendingSeries from "./pages/trending/TrendingSeries.jsx";

import Search from "./pages/search/Search.jsx";
import SpecificSearch from "./pages/search/SpecificSearch.jsx";

import Suggestion from "./pages/suggestion/Suggestion.jsx";

import Lists from "./pages/lists/Lists.jsx";
import ListsFavorites from "./pages/lists/ListsFavorites.jsx";
import ListsWatched from "./pages/lists/ListsWatched.jsx";
import ListsWatchlist from "./pages/lists/ListsWatchlist.jsx";

import Profile from "./pages/profile/Profile.jsx";

import SignUp from "./pages/signup/SignUp.jsx";
import SignIn from "./pages/signin/SignIn.jsx";

import MovieDetails from "./pages/details/MovieDetails.jsx";
import SeriesDetails from "./pages/details/SeriesDetails.jsx";

// Styles
import './App.css'

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            {isAuth && <NavBar/>}
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/trending-films/:pageId" element={<TrendingMovies/>}/>
                <Route path="/trending-series/:pageId" element={<TrendingSeries/>}/>
                <Route path="/zoeken/overzicht/:filterId" element={<Search/>}/>
                <Route path="/zoeken/specifiek/:searchId" element={<SpecificSearch/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/lijsten/favorieten" element={<ListsFavorites/>}/>
                <Route path="/lijsten/watchlist" element={<ListsWatchlist/>}/>
                <Route path="/lijsten/gezien" element={<ListsWatched/>}/>
                <Route path="/profiel" element={<Profile/>}/>
                <Route path="/registreren" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="film-details/:movieId/:movieTitle" element={<MovieDetails/>}/>
                <Route path="serie-details/:seriesId/:seriesName" element={<SeriesDetails/>}/>
            </Routes>
            {isAuth && <Footer/>}
        </>
    );
}

export default App

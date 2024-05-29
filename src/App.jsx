// Functions
import {Route, Routes} from "react-router-dom";

// Context
import {AuthContext} from "./context/AuthContext.jsx";

// Components
import NavBar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";

// Pages
import Home from "./pages/home/Home.jsx";
import Search from "./pages/search/Search.jsx";
import Suggestion from "./pages/suggestion/Suggestion.jsx";
import Lists from "./pages/lists/Lists.jsx";
import Profile from "./pages/profile/Profile.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import MovieDetails from "./pages/details/MovieDetails.jsx";
import SeriesDetails from "./pages/details/SeriesDetails.jsx";

// Styles
import './App.css'
import {useContext} from "react";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            {isAuth && <NavBar/>}
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/zoeken" element={<Search/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/profiel" element={<Profile/>}/>
                <Route path="/registreren" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="film-details/:movieId" element={<MovieDetails/>}/>
                <Route path="serie-details/:seriesId" element={<SeriesDetails/>}/>
            </Routes>
            {isAuth && <Footer/>}
        </>
    );
}

export default App

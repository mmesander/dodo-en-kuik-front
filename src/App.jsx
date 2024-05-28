// Functions
import {Route, Routes} from "react-router-dom";

// Components
import NavBar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";

// Pages
import Home from "./pages/home/Home.jsx";
import Search from "./pages/search/Search.jsx";
import Suggestion from "./pages/suggestion/Suggestion.jsx";
import Lists from "./pages/lists/Lists.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";

// Styles
import './App.css'

function App() {

    return (
        <>
            {/*<NavBar/>*/}
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/zoeken" element={<Search/>}/>
                <Route path="/suggestie" element={<Suggestion/>}/>
                <Route path="/lijsten" element={<Lists/>}/>
                <Route path="/profiel" element={<Profile/>}/>
                <Route path="/registreren" element={<Register/>}/>
            </Routes>
            {/*<Footer/>*/}
        </>
    );
}

export default App

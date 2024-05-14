// Functions
import {Route, Routes} from "react-router-dom";

// Components
import NavBar from "./components/NavBar.jsx";

// Pages
import Home from "./pages/home/Home.jsx";
import Search from "./pages/search/Search.jsx";
import Suggestion from "./pages/suggestion/Suggestion.jsx";
import Lists from "./pages/lists/Lists.jsx";
import Profile from "./pages/profile/Profile.jsx";

// Styles
import './App.css'

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/suggestion" element={<Suggestion/>}/>
                <Route path="/lists" element={<Lists/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </>
    );
}

export default App

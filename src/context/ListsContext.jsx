// Functions
import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "./AuthContext.jsx";

export const ListsContext = createContext(null);

ListsContextProvider.propTypes = {
    children: PropTypes.node,
}

function ListsContextProvider({children}) {
    const {user} = useContext(AuthContext);

    const [listItem, setListItem] = useState({
        favoriteMovies: [],
        watchlistMovies: [],
        watchedMovies: [],
        favoriteSeries: [],
        watchlistSeries: [],
        watchedSeries: [],
    });

    useEffect(() => {
        if (user) {
            void fetchUserLists(user)
        }
    }, [user]);

    function fetchUserLists(user) {
        setListItem(prevState => ({
            favoriteMovies: user.favoriteMovies || prevState.favoriteMovies,
            watchlistMovies: user.watchlistMovies || prevState.watchlistMovies,
            watchedMovies: user.watchedMovies || prevState.watchedMovies,
            favoriteSeries: user.favoriteSeries || prevState.favoriteSeries,
            watchlistSeries: user.watchlistSeries || prevState.watchlistSeries,
            watchedSeries: user.watchedSeries || prevState.watchedSeries,
        }));
    }

    const data = {
        listItem: listItem,
        setListItem: setListItem,
    }

    return (
        <ListsContext.Provider value={data}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsContextProvider;

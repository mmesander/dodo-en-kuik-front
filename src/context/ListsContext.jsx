// Functions
import {createContext, useContext, useState} from "react";
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

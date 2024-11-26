function createEndpointStrings(genre, type) {
    let genreString;
    let typeString;

    switch (genre) {
        case "komische":
            if (type === "films") {
                // + Komedie
                // -
                genreString = "35";
                typeString = "movie";
            } else {
                // + Komedie
                // -
                genreString = "35";
                typeString = "tv";
            }
            break;
        case "spannende":
            if (type === "films") {
                // + Misdaad, Actie, Thriller
                // - Komedie
                genreString = "80%7C28%7C53&without_genres=35";
                typeString = "movie";
            } else {
                // + Misdaad, Actie & Avontuur
                // - Komedie
                genreString = "80%7C10759&without_genres=35";
                typeString = "tv";
            }
            break;
        case "enge":
            if (type === "films") {
                // + Horror
                // - Komedie, Familie, Animatie
                genreString = "27&without_genres=35%7C10751%7C16";
                typeString = "movie";
            } else {
                // + Mysterie, Sci-Fi & Fantasy, Drama
                // - Animatie, Comedy, Kids, Familie
                genreString = "9648%7C10765%7C18&without_genres=16%7C35%7C10762%7C10751";
                typeString = "tv";
            }
            break;
        case "fantasierijke":
            if (type === "films") {
                // + Fantasie, Sciencefiction
                // - Horror
                genreString = "14%7C878&without_genres=27";
                typeString = "movie";
            } else {
                // + Sci-Fi & Fantasy
                // - Animatie, Kids
                genreString = "10765&without_genres=16%7C10762";
                typeString = "tv";
            }
            break;
        case "dramatische":
            if (type === "films") {
                // + Drama, Romantiek
                // - Horror
                genreString = "18%7C10749&without_genres=27";
                typeString = "movie";
            } else {
                // + Drama
                // -
                genreString = "18";
                typeString = "tv";
            }
            break;
    }

    return [genreString, typeString];
}

export default createEndpointStrings;
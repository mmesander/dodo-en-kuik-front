function createEndpointStrings(genre, type) {
    let genreString;
    let typeString;

    switch (genre) {
        case "komische":
            genreString = "Komische";
            break;
        case "spannende":
            genreString = "Spannende";
            break;
        case "enge":
            genreString = "Enge";
            break;
        case "fantasierijke":
            genreString = "Fantasierijke";
            break;
        case "dramatische":
            genreString = "Dramatische";
            break;
    }

    if (type === "films") {
        typeString = "movies";
    }

    if (type === "series") {
        typeString = "tv"
    }

    return [genreString, typeString];
}

export default createEndpointStrings;
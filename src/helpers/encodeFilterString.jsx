function encodeFilterString(isMovie, genreString, ratingString, sortOrder, minRating, maxRating, endpoint) {

    const filters = {
        isMovie: isMovie,
        genreString: genreString,
        ratingString: ratingString,
        sortOrder: sortOrder,
        minRating: minRating,
        maxRating: maxRating,
        endpoint: endpoint
    }

    // Convert to JSON
    const jsonString = JSON.stringify(filters);

    // Encode to Base64
    const base64String =  btoa(jsonString);

    return base64String;
}

export default encodeFilterString;
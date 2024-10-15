function createFilterStrings(isMovie, genresList, minRating, maxRating) {
    const genresString = "&with_genres=";
    const minRatingString = "&vote_average.gte=";
    const maxRatingString = "&vote_average.lte=";
    const type = isMovie ? 'movieGenres' : 'seriesGenres';

    let genresUrlString;
    let ratingUrlString;

    if (genresList[type].length === 0) {
        genresUrlString = "&with_genres=";
    } else if (genresList[type].length === 1) {
        genresUrlString = genresString + genresList[type][0];
    } else {
        const numbersToString = genresList[type].map((id) => id.toString());
        const joinedNumbers = numbersToString.join('%2C');
        genresUrlString = genresString + joinedNumbers;
    }

    ratingUrlString = minRatingString + minRating + maxRatingString + maxRating;

    return [genresUrlString, ratingUrlString];
}

export default createFilterStrings;
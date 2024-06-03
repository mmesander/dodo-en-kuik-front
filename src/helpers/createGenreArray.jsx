function createGenreArray(id, genresList) {
    const isPresent = genresList.find((genreId) => {
        return id === genreId;
    });

    const genresArray = [...genresList];

    if (isPresent) {
        const indexNumberOf = genresArray.indexOf(id);
        genresArray.splice(indexNumberOf, 1);
        return genresArray;
    } else {
        genresArray.push(id);
        return genresArray;
    }
}

export default createGenreArray;